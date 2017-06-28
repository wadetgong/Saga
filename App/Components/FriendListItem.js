import React from 'react'
import { View, Text, Image, TouchableOpacity, Switch } from 'react-native'
import { Images } from '../Themes'
import styles from './Styles/FriendListItemStyles'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import { Fonts, Colors, Metrics } from '../Themes/'

// going to need to change up Image source
// can't navigate to Profile, not in the same stack navigation
// and also not written / not a real component
// Should Profile be a modal? should it be it's own stack?

class FriendListItem extends React.Component {
  constructor() {
    super()
    this.state = {
      clicked: false,
    }
    this.invite = this.invite.bind(this)
  }

  invite() {
    this.setState({
      clicked: true,
    })
  }


  render() {
    let { friend, navigate, addFriendToTeam } = this.props
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
            <Text><Text style={{fontWeight: 'bold'}}>{friend.name}</Text> ({friend.username})</Text>
            <Text>Stories played: 4</Text>
            {
              !this.state.clicked
              ? (
                <TouchableOpacity style={styles.inviteButton}
                onPress={this.invite}>
                  <Text style={styles.buttonText}>Invite to Team</Text>
                </TouchableOpacity>
              )
              : (
                <View style={styles.invitedButton}>
                  <Text style = {styles.buttonText}>Invitation Sent</Text>
                </View>
              )
            }
          </View>
      </View>
    )

  }
}

export default FriendListItem
