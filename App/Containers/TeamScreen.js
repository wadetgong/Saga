import React from 'react'
import { View, Text, ScrollView, ListView } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../Components/Button/RoundedButton'
import { NavigationActions } from 'react-navigation'


const TeamScreen = ({ teamList, friends, uid, navigation }) => {  
  
  const pending = [], joined = []
  for (let key in teamList) {
    if (key == uid) continue;  // yourself, should you be on list?
    if (teamList[key] == 'pending') pending.push(friends[key]);
    else joined.push(friends[key])
  }
  
  let joinedFriends = new ListView
    .DataSource({rowHasChanged : (r1, r2) => r1 != r2})
    .cloneWithRows(joined)
  
  let pendingFriends = new ListView
    .DataSource({rowHasChanged : (r1, r2) => r1 != r2})
    .cloneWithRows(pending)
  
  console.log('TEAM SCREEN', joined, pending)
  
  return (
    <View>
    <ScrollView >
      <View >
        <Text>Your Team:</Text>
      </View>
      <ListView
        dataSource={joinedFriends}
        removeClippedSubviews={false}
        enableEmptySections={true}
        renderRow={(user) => <Text>user</Text>}
      />

      <View >
        <Text>pending!</Text>
      </View>
      <ListView
        dataSource={pendingFriends}
        removeClippedSubviews={false}
        enableEmptySections={true}
        renderRow={(user) => <Text>{user.uid}</Text>}
      />

      <RoundedButton onPress={() => navigation.navigate('CurrentStory')}>
        begin journey
      </RoundedButton>

    </ScrollView>
    </View>
  )
}

const mapState = state => ({
  uid : state.friends.uid,
  teamList : state.stories.teamList,
  friends : state.friends.myFriendsList,
})
export default connect(mapState)(TeamScreen)
