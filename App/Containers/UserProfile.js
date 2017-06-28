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
}, {
  initialRouteName: 'UserJourneys',
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
        <View style={{flexDirection: 'row', paddingHorizontal: 15, paddingBottom: 10}}>
          <View style={{borderBottomLeftRadius: 3, borderTopLeftRadius: 3, overflow: 'hidden'}}>
            <Image
              source={{uri: user.profilePicture}}
              style={{width: 120, height: 120}}
            />
          </View>
          <View style={{padding: 10, flexDirection: 'column', borderColor: Colors.border, borderWidth: 1, flex: 1, borderBottomRightRadius: 3, borderTopRightRadius: 3}}>
            <Text><Text style={{fontWeight: 'bold',}}>{user.name}</Text> ({user.username})</Text>
            <Text>Email: {user.email}</Text>
            <TouchableOpacity style={{
              borderRadius: 4,
              paddingHorizontal: 10,
              paddingVertical: 5,
              width: '75%',
              marginVertical: 5,
              backgroundColor: 'lightgray',
              justifyContent: 'center',
              alignItems: 'center'}}
            >
              <Text style={{
                color: Colors.text,
                textAlign: 'center',
              }}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <UserProfileStack />
      </View>
    )
  }
}
