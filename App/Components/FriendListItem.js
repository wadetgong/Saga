import React from 'react'
import { View, Text, Image, TouchableOpacity} from 'react-native'
import { Images } from '../Themes'
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
        <TouchableOpacity
            onPress={() => navigate('Profile', { navigate, friend })}
        >
        <Image
            style={styles.rowImage}
            source={{uri: friend.profilePicture}}
        />
        </TouchableOpacity>
        <View style={styles.infoCard}>
          <Text>
            <Text style={{fontWeight: 'bold'}}>{friend.name} </Text>
            ({friend.username})
          </Text>
          {/*color={tintColor}*/}
          <Text><Icon name='notebook' size={20}/>{numJourneysCompleted}</Text>
          <TouchableOpacity 
            style={styles.inviteButton}
            onPress={() => addFriendToTeam(friend.uid)}
          ><Text style={styles.buttonText}>Invite to Team</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default FriendListItem
