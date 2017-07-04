import React from 'react'
import { View, Text, ScrollView, ListView } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../Components/Button/RoundedButton'
import { NavigationActions } from 'react-navigation'
import FriendTile from '../Components/FriendTile'
import CancelJourneyFriend from '../Components/CancelJourneyFriend'


import { Colors, Metrics } from '../Themes'

import styles from './Styles/TeamScreenStyles'

const TeamScreen = ({ teamList, friends, uid, navigation, user }) => {
  const pending = []
  const list = []
  for (let key in teamList) {
    switch (teamList[key]) {
      case 'pending':
        if(key === uid) pending.push(user)
        else pending.push(friends[key])
        break;
      case 'list':
        if(key === uid) list.push(user)
        else list.push(friends[key])
        break;
      default:
        console.error('TEAMSCREEN ERROR - teamList not cool. Possible error in StoriesRedux or in firebase')
    }
  }

  let joinedFriends = new ListView
    .DataSource({rowHasChanged : (r1, r2) => r1 != r2})
    .cloneWithRows(list)

  let pendingFriends = new ListView
    .DataSource({rowHasChanged : (r1, r2) => r1 != r2})
    .cloneWithRows(pending)

  console.log('TEAM SCREEN', list, pending, teamList)

  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'StoryScreen'})
    ]
  })

  return (
    <View style={styles.container}>
    <View style={styles.sectionHeader}>
      <Text style={styles.boldLabel}>Your Team:</Text>
    </View>
    <ScrollView style={{padding: 10}}>
      <View style={styles.joinedSection}>
        <Text style={styles.groupLabel}>
          <Text style={{fontWeight: 'bold',}}>Joined</Text> ({list.length})
        </Text>
      </View>
      <ListView
        contentContainerStyle={styles.list}
        dataSource={joinedFriends}
        removeClippedSubviews={false}
        enableEmptySections={true}
        renderRow={(user) => <FriendTile user={user} />}
      />

      <View style={styles.invitedSection}>
        <Text style={styles.groupLabel}>
          <Text style={{fontWeight: 'bold',}}>Invited</Text> ({pending.length})
        </Text>
      </View>
      <ListView
        dataSource={pendingFriends}
        removeClippedSubviews={false}
        enableEmptySections={true}
        renderRow={(user) => <CancelJourneyFriend user={user}/>}
      />


    </ScrollView>
    <RoundedButton onPress={() => {
      //navigation.dispatch(resetAction)
      navigation.navigate('CurrentStory')
    }}>
      begin journey
    </RoundedButton>
    </View>
  )
}

const mapState = state => ({
  user: state.friends.user,
  uid : state.friends.uid,
  teamList : state.stories.teamList,
  friends : state.friends.myFriendsList,
})
export default connect(mapState)(TeamScreen)
