import React from 'react'
import { View, Text, Image, ListView, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import ApproveFriendRow from '../Components/ApproveFriendRow'
import PendingFriendRow from '../Components/PendingFriendRow'
import styles from './Styles/PendingFriendsStyles'
import { Colors } from '../Themes'

const PendingFriends = ({ received, sent }) => {
  let pendingFriends = new ListView
    .DataSource({rowHasChanged : (r1, r2) => r1 != r2})
    .cloneWithRows(sent)

  let approveFriends = new ListView
    .DataSource({rowHasChanged : (r1, r2) => r1 != r2})
    .cloneWithRows(received)

  return (
    <View style={styles.containerSection}>
      <ScrollView style={{paddingHorizontal: 10}}>
        <View style={styles.sentLabel}>
          <Text style={styles.friendSectionLabel}>Your Requests</Text>
        </View>
        {
          sent.length
          ? (
            <ListView
              dataSource={pendingFriends}
              removeClippedSubviews={false}
              enableEmptySections={true}
              renderRow={(user) => <PendingFriendRow user={user} />}
            />
          )
          : noRequests()
        }
        <View style={styles.receivedLabel}>
          <Text style={styles.friendSectionLabel}>Pending Friend Requests</Text>
        </View>
        {
          received.length
          ? (
            <ListView
              dataSource={approveFriends}
              removeClippedSubviews={false}
              enableEmptySections={true}
              renderRow={(user) => <ApproveFriendRow user={user} />}
            />
          )
          : noRequests()
        }
      </ScrollView>
    </View>
  )
}

const noRequests = () => (
  <View style={{alignItems: 'center'}}>
    <Text style={{fontStyle: 'italic'}}>No requests at the moment.</Text>
  </View>
)

const mapState = state => ({
  received : state.friends.received,
  sent : state.friends.sent,
})
const mapDispatch = {}

export default connect(mapState, mapDispatch)(PendingFriends)
