import React from 'react'
import { Text, View, ListView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// import API from '../Services/FixtureApi'
import FriendListItem from '../Components/FriendListItem'
import SearchBar from '../Components/SearchBar'
import RoundedButton from '../Components/Button/RoundedButton'
import firebaseApp from '../Firebase'
import { Colors } from '../Themes'
import styles from './Styles/JourneyFriendsStyles'

class JourneyFriends extends React.Component {
  constructor() {
    super()
    this.state = {
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      text: '',
    }
    
    this.onSearch = this.onSearch.bind(this)
    this.addFriendToTeam = this.addFriendToTeam.bind(this)
  }

  onSearch (searchTerm) { this.setState({ text: searchTerm }) }

  checkMatch (searched, friend) {
    const check = text => (text.toLowerCase().indexOf(searched.toLowerCase()) !== -1)
    const { email, name, username } = friend
    return (check(email) || check(name) || check(username))
  }

  addFriendToTeam (fid) {
    // adding friend to team
    const { jid, name } = this.props,
          path1 = '/users/' + fid + '/journeys/pending/' + jid,
          path2 = '/journey/' + jid + '/team/pending/' + fid;
    firebaseApp.database().ref('/').update({
      [path1] : name, [path2] : true
    })
  }

  render() {
    const { text, ds } = this.state
    const { friends, team, navigation, name } = this.props

    // filter by search
    // filter by teammembers
    // filter by friends who do not have a journey/pending journey of this type
    const friendsFiltered = friends.filter(friend => {
      if (text.length && !this.checkMatch(text, friend)) return false;
      if (team[friend.uid]) return false;
      // console.log('friend', friend)
      if (friend.journeys) {
        for (let status in friend.journeys) {
          // false if in completed, failed, current
          // okay if in pending
          if (status == "pending") continue
          for (sid of Object.values(friend.journeys[status]))
            if (sid == name) return false
        }
      }
      return true 
    })
    const friendList = ds.cloneWithRows(friendsFiltered);

    return (
      <View style={styles.container}>
        <View style={[styles.sectionHeader, {flexDirection: 'row'}]}>
          <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text style={styles.boldLabel}>Add Friends to Story</Text>
          </View>
          <View style={{flex:0.5, flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity onPress={() => navigation.navigate('TeamScreen')}>
              <Text style={{color: Colors.active}}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchBarContainer}>
          <SearchBar
              onSearch={this.onSearch}
          />
        </View>
        <View style={styles.friendSearchContainer}>
          <ListView
            dataSource={friendList}
            removeClippedSubviews={false}
            enableEmptySections={true}
            renderRow={(friend) => <
                FriendListItem
                friend={friend}
                navigate={navigation.navigate}
                addFriendToTeam={this.addFriendToTeam}
            />}
          />
        </View>
      </View>
    )
  }
}

const mapState = state => ({
  friends : state.friends.list,
  team : state.stories.teamList,
  jid : state.stories.jid,
  name : state.stories.name,
})
export default connect(mapState)(JourneyFriends)