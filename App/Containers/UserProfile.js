import React from 'react'
import { TabNavigator } from 'react-navigation'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import API from '../Services/FixtureApi'

import ViewFriends from './ViewFriends'
import UserJourneys from './UserJourneys'


import styles from './Styles/UserProfileStyles'
import { Colors } from '../Themes'
import Icon from 'react-native-vector-icons/SimpleLineIcons'


const UserProfileStack = TabNavigator({
  ViewFriends: {
    screen: ViewFriends,
    navigationOptions: {
      tabBarLabel: 'My Friends',
      tabBarIcon: ({ tintColor }) => (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Icon name='people' size={20} color={tintColor} style={{paddingHorizontal: 5}}/><Text style={{color: tintColor}}>Friends</Text>
      </View>),
    },
  },
  UserJourneys: {
    screen: UserJourneys,
    navigationOptions: {
      tabBarLabel: 'My Stories',
      tabBarIcon: ({ tintColor }) => (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Icon name='book-open' size={20} color={tintColor} style={{paddingHorizontal: 5}}/><Text style={{color: tintColor}}>Stories</Text>
      </View>),
    },
  },
}, {
  initialRouteName: 'ViewFriends',
  tabBarPosition: 'top',
  tabBarOptions: {
    tintColor: Colors.tintColor,
    activeBackgroundColor: 'white',
    showLabel: false
  },
})


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
            style={{width: 120, height: 120}}
          />

          <View style={{padding: 10, flexDirection: 'column', backgroundColor: 'pink', flex: 1}}>
            <Text>Name: {user.username}</Text>
            <Text>Email: {user.email}</Text>
            <TouchableOpacity>
              <Text>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <UserProfileStack />
      </View>
    )
  }
}
