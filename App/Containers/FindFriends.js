import React from 'react'
import { View, Text, Image, ListView, ScrollView } from 'react-native'
import SearchBar from '../Components/SearchBar'
import FriendUserRow from '../Components/FriendUserRow'
import { connect } from 'react-redux'
import styles from './Styles/FindFriendsStyles'

/// search/checkMatch must deal with new user objects

class FindFriends extends React.Component {
  constructor() {
    super()
    this.state = {
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      text: '',
    }

    this.onSearch = this.onSearch.bind(this)
  }

  onSearch (searchTerm) { this.setState({ text: searchTerm }) }

  checkMatch(searchTerm, friend) {
    let searchVal = searchTerm.toLowerCase()
    if(friend.email.toLowerCase().indexOf(searchVal) !== -1) return true
    if(friend.name.toLowerCase().indexOf(searchVal) !== -1) return true
    if(friend.username.toLowerCase().indexOf(searchVal) !== -1) return true
    return false
  }

  render() {
    const { text, ds } = this.state
    const { users } = this.props
    const filteredFriends = text.length
      ? users.filter(friend => this.checkMatch(text, friend))
      : users;

    const friendList = ds.cloneWithRows(filteredFriends)
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchBar onSearch={this.onSearch} value={text}/>
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

const mapState = state => ({
  users : state.friends.users,
})

export default connect(mapState)(FindFriends)
