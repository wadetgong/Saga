import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Image } from 'react-native'

import styles from './Styles/UserProfileStyles'

const UserJourneys = ({ myJourneys, myStories, jid, name, journey }) => {
  console.log(myJourneys, myStories, jid, name, journey)
  
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
  journey: state.stories.journey
})

export default connect(mapState)(UserJourneys)