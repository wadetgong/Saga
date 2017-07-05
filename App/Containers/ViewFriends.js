import React from 'react'
import { View, Text, Image, ListView, ScrollView } from 'react-native'
import FriendTile from '../Components/FriendTile'

import { connect } from 'react-redux'

import styles from './Styles/ViewFriendsStyles'
import {Colors, Metrics} from '../Themes/'

class ViewFriends extends React.Component {
  render() {
    const user = this.props.user
    const numFriends = user.friends && user.friends.list && ` (${Object.keys(user.friends.list).length})`
    const friendsList = this.props.friends
    let friendsSource = friendsList && new ListView
      .DataSource({rowHasChanged : (r1, r2) => r1 != r2})
      .cloneWithRows(friendsList)

    // console.log('props in ViewFriends', this.props)
    return (
      <View style={{paddingHorizontal: 10, paddingVertical: 10, flex: 1}}>
        <View style={styles.friendLabel}>
          <Text style={styles.friendLabelText}>
            <Text style={{fontWeight: 'bold'}}>Friends</Text>{numFriends}</Text>
        </View>
        {
          friendsList && friendsList.length
          ?
            <ListView
              contentContainerStyle={styles.list}
              dataSource={friendsSource}
              removeClippedSubviews={false}
              enableEmptySections={true}
              renderRow={(user) => <FriendTile user={user} />}
              />
          : (
            <View style={{alignItems: 'center'}}>
              <Text style={{fontStyle: 'italic'}}>No friends yet!</Text>
            </View>
          )
        }
      </View>
    )
  }
}
const mapState = state => ({
  user: state.friends.user,
  friends: state.friends.list
})
export default connect(mapState)(ViewFriends)
