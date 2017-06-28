import React from 'react'
import { Text, View, ListView, TouchableOpacity } from 'react-native'
import API from '../Services/FixtureApi'
import FriendListItem from '../Components/FriendListItem'
import SearchBar from '../Components/SearchBar'
import RoundedButton from '../Components/Button/RoundedButton'
import firebaseApp from '../Firebase'

import { Colors } from '../Themes'

// Styles
import styles from './Styles/JourneyFriendsStyles'

//there is a search bar at top but it's hard to see and also it doesn't work
// WARNING DATEPICKER is IOS only oh noes
// need logic for search
// need logic for not showing current user in this list
// need logic to disable switch if friend in different journey
// need logic for sending notifications to friends lol
//there is next button but not currently in scroller (ListView)

// import styles from './Styles/Friends' // not there
export default class JourneyFriends extends React.Component {
  constructor() {
    super()
    this.state = {
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      friends: [],
      text: '',
    }
    this.friendsRef = firebaseApp.database().ref('/users')
    this.onSearch = this.onSearch.bind(this)
    // this.addFriendToTeam = this.addFriendToTeam.bind(this)
  }

  onSearch (searchTerm) {
    console.log('searching in Friends Searchbar')
    this.setState({
      text: searchTerm
    })
  }

  checkMatch(searchTerm, friend) {
    let searchVal = searchTerm.toLowerCase()
    if(friend.email.toLowerCase().indexOf(searchVal) !== -1) return true
    if(friend.name.toLowerCase().indexOf(searchVal) !== -1) return true
    if(friend.username.toLowerCase().indexOf(searchVal) !== -1) return true
    return false
  }

  addFriendToTeam (id, value) {
    console.log('addfriendtoteam in Friends container', id, value, typeof id)
    this.setState({[id] : value})
    console.log(this.state)
  }

  componentDidMount () {
    this.listenForItems(this.friendsRef)
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  listenForItems(ref) {
    this.unsubscribe = ref.on('value', (snap) => {
      const items = []
      snap.forEach((child) => {
        items.push({ _key: child.key, ...child.val() })
        this.setState({ friends: items })
      })
    })
  }

  render() {
    const filteredFriends = this.state.text.length
      ? this.state.friends.filter(friend => this.checkMatch(this.state.text, friend))
      : this.state.friends;
    const friendList = this.state.ds.cloneWithRows(filteredFriends)

    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <View style={[styles.sectionHeader, {flexDirection: 'row'}]}>
          <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text style={styles.boldLabel}>Add Friends to Story</Text>
          </View>
          <View style={{flex:0.5, flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity onPress={() => navigate('TeamScreen')}>
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
                navigate={navigate}
                addFriendToTeam={this.addFriendToTeam.bind(this)}
            />}
          />
        </View>
      </View>
    )
  }
}

