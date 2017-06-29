import React from 'react'
import { View, Text, Image, ListView, ScrollView } from 'react-native'
import SearchBar from '../Components/SearchBar'
import FriendUserRow from '../Components/FriendUserRow'
import firebaseApp from '../Firebase'
import { connect } from 'react-redux'
import styles from './Styles/FindFriendsStyles'

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
    const { users } = this.props
    const filteredFriends = this.state.text.length
      ? users.filter(friend => this.checkMatch(this.state.text, friend))
      : users;

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

const mapState = state => ({
  users : state.friends.users,
})
const mapDispatch = {}
export default connect(mapState, mapDispatch)(FindFriends)