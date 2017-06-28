import React from 'react'
import { View, Text, Image } from 'react-native'

import styles from './Styles/UserProfileStyles'

export default class UserJourneys extends React.Component {

  render() {
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
}
