import React from 'react'
import { View, Text, Image, ListView, ScrollView } from 'react-native'
import SearchBar from '../Components/SearchBar'
import FriendUserRow from '../Components/FriendUserRow'
import firebaseApp from '../Firebase'

import styles from './Styles/FindFriendsStyles'

export default class FindFriends extends React.Component {
  constructor() {
    super()
    this.state = {
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      friends: [],
      text: '',
    }
    this.friendsRef = firebaseApp.database().ref('/users')
    this.onSearch = this.onSearch.bind(this)
  }

  onSearch (searchTerm) {
      console.log('searching in Friends Searchbar', searchTerm)

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

  componentDidMount () {
    this.listenForItems(this.friendsRef)
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

  componentWillUnmount () {
    this.unsubscribe()
  }

  render() {
    const filteredFriends = this.state.text.length
      ? this.state.friends.filter(friend => this.checkMatch(this.state.text, friend))
      : this.state.friends;
    const friendList = this.state.ds.cloneWithRows(filteredFriends)
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchBar onSearch={this.onSearch} value={this.state.text}/>
        </View>
        <ScrollView style={{paddingHorizontal: 10}}>
          <ListView
            dataSource={friendList}
            removeClippedSubviews={false}
            enableEmptySections={true}
            renderRow={(user) => <
              FriendUserRow
              user={user}
            />}
          />
        </ScrollView>
      </View>
    )
  }
}
