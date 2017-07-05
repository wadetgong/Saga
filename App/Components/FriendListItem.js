import React from 'react'
import { View, Text, Image, TouchableOpacity} from 'react-native'
import styles from './Styles/FriendListItemStyles'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import { Fonts, Colors, Metrics } from '../Themes/'

// going to need to change up Image source
// can't navigate to Profile, not in the same stack navigation
// and also not written / not a real component
// Should Profile be a modal? should it be it's own stack?

const FriendListItem = ({ friend, navigate, addFriendToTeam }) => {
  // calculate number of journeys you have joined
  // in the future make it number of yourneys you have completed
  let numJourneysCompleted = 0
  if (friend.journeys) {
    if (friend.journeys.pending) numJourneysCompleted--;
    numJourneysCompleted += Object.keys(friend.journeys).length
  }

  return (
    <View style={styles.rowContainer}>
        <TouchableOpacity onPress={() => navigate('Profile', { navigate, friend })}>
          <Image
            style={styles.rowImage}
            source={{uri: friend.profilePicture}}
          />
        </TouchableOpacity>
        <View style={styles.infoCard}>
          <Text style={{fontWeight: 'bold'}}><Icon name='user' style={styles.icon}/> {friend.name}</Text>
          <Text style={{fontSize: 12}}>Stories played: {numJourneysCompleted}</Text>
        </View>
        <View style={styles.inviteSection}>
          <TouchableOpacity
            style={styles.invitedButton}
            onPress={() => addFriendToTeam(friend.uid)}
          >
            <Text style={styles.buttonText}>Invite to Team</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default FriendListItem
