import React from 'react'
import { View, Text, Image } from 'react-native'
import { Images } from '../Themes'
import API from '../Services/FixtureApi'


import styles from './Styles/UserFriendsStyles'

export default class UserProfile extends React.Component {
  render() {
    const user = API.getFriends().data;

    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.boldLabel}>My Friends</Text>
        </View>
        <Text>Friend Stuff here</Text>

      </View>
    )
  }
}
