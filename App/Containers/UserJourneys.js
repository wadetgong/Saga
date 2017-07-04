import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Image } from 'react-native'

import styles from './Styles/UserProfileStyles'

const UserJourneys = ({ myJourneys, myStoriesList, jid, name, current }) => {
  // journeys are not saved here but the story is, which has the story image
  // I think it would be nice to have the list of stories like the 
  // square friend boxes :D but your choice, not a strong preference
  
  // also current journey is at (jid, name, journey)
  
  const journeyList = {pending: [], completed: [], failed: []}
  for (let status in myJourneys) {
    journeyList[status] = Object.values(myJourneys[status]).map(storyname => myStoriesList[storyname])
  }
  
  // EXAMPLE: use journeyList.pending as an array to send to Listview.DataSource(funct).clonewithRows(journeyList.pending)
  
  console.log('journeyList in UserJournesy', journeyList)
  
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, flexDirection: 'row', padding: 10, backgroundColor: 'pink'}}>
        <Text style={styles.boldLabel}>Pending Story Invites</Text>

      </View>
      <View style={{flex: 1, flexDirection: 'row', padding: 10, backgroundColor: 'green'}}>
        <Text style={styles.boldLabel}>Current Story</Text>

      </View>
      <View style={{flex: 1, flexDirection: 'row', padding: 10, backgroundColor: 'blue'}}>
        <Text style={styles.boldLabel}>My History</Text>
      </View>
    </View>
  )
}

const mapState = state => ({
  myJourneys: state.stories.myJourneys,
  myStories: state.stories.myStories,
  jid: state.stories.jid,
  name: state.stories.name,
  current: state.stories.current, 
  
})

export default connect(mapState)(UserJourneys)