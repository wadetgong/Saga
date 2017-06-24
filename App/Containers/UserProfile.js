import React from 'react'
import { View, Text, Image } from 'react-native'
import { Images } from '../Themes'
import API from '../Services/FixtureApi'


import styles from './Styles/UserProfileStyles'

export default class UserProfile extends React.Component {
  render() {
    const user = API.getSelf().data;

    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.boldLabel}>My Account</Text>
        </View>
        <Image
          source={{uri: user.profilePicture}}
          style={{width: 200, height: 200}}
        />
        <Text>Name: {user.username}</Text>
        <Text>Email: {user.email}</Text>
      </View>
    )
  }
}
