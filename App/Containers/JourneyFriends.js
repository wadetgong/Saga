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
    return check(email) || check(name) || check(username)
  }

  addFriendToTeam (fid) {
    const { jid, name } = this.props,
          path1 = '/users/' + fid + '/journeys/' + jid,
          path2 = '/journey/' + jid + '/team/' + fid;
    firebaseApp.database().ref('/').update({
      [path1] : name, [path2] : true
    })
  }

  render() {
    const { text, ds } = this.state
    const { friends, team, navigation } = this.props

    // filter by search
    // filter by teammembers
    const filteredFriends = text.length
      ? friends.filter(friend => this.checkMatch(text, friend))
      : friends;
    
    console.log('FRIENDS IN JOURNEYFRIENDS RENDER', filteredFriends, team)
    const friendsNotTeam = filteredFriends.filter(friend => !team[friend.uid])
    const friendList = ds.cloneWithRows(filteredFriends)
    console.log('FRIENDS LIST', friendsNotTeam)

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
  team : state.stories.team,
  jid : state.stories.jid,
  name : state.stories.name,
})
export default connect(mapState)(JourneyFriends)