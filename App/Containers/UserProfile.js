import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
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
        <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingBottom: 10}}>
          <Image
            source={{uri: user.profilePicture}}
            style={{width: 150, height: 150}}
          />

          <View style={{padding: 10, flexDirection: 'column', backgroundColor: 'pink', flex: 1}}>
            <Text>Name: {user.username}</Text>
            <Text>Email: {user.email}</Text>
            <TouchableOpacity>
              <Text>Edit Profile</Text>
            </TouchableOpacity>
          </View>
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
