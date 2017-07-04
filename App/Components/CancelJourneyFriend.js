import React from 'react'
import { View, Text, Image, TouchableOpacity} from 'react-native'
import { Images } from '../Themes'
import styles from './Styles/CancelJourneyFriendStyles'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import { Fonts, Colors, Metrics } from '../Themes/'

// going to need to change up Image source
// can't navigate to Profile, not in the same stack navigation
// and also not written / not a real component
// Should Profile be a modal? should it be it's own stack?

const CancelJourneyFriend = ({ user, navigate }) => {
  // calculate number of journeys you have joined
  // in the future make it number of yourneys you have completed
  let numJourneysCompleted = 0
  if (user.journeys) {
    if (user.journeys.pending) numJourneysCompleted--;
    numJourneysCompleted += Object.keys(user.journeys).length
  }

  return (
    <View style={styles.rowContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Image
            style={styles.rowImage}
            source={{uri: user.profilePicture}}
          />
        </TouchableOpacity>
        <View style={styles.infoCard}>
          <Text style={{fontWeight: 'bold'}}><Icon name='user' style={styles.icon}/> {user.name}</Text>
          <Text style={{fontSize: 12}}>Stories played: {numJourneysCompleted}</Text>
        </View>
        <View style={styles.inviteSection}>
          <TouchableOpacity
            style={styles.invitedButton}
            onPress={() => {}}
          >
            <Text style={styles.buttonText}>Cancel Invite</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default CancelJourneyFriend
