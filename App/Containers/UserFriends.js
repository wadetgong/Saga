import React from 'react'
import { TabNavigator } from 'react-navigation'
import { View, Text, Image } from 'react-native'
import { Images } from '../Themes'
import API from '../Services/FixtureApi'

import FindFriends from './FindFriends'
import ApproveFriends from './ApproveFriends'

import styles from './Styles/UserFriendsStyles'
import { Colors } from '../Themes'
import Icon from 'react-native-vector-icons/SimpleLineIcons'


const FriendStack = TabNavigator({
  FindFriends: {
    screen: FindFriends,
    navigationOptions: {
      tabBarLabel: 'Find Friends',
      tabBarIcon: ({ tintColor }) => (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
      <Icon name='magnifier-add' size={20} color={tintColor} style={{paddingHorizontal: 5}}/><Text style={{color: tintColor}}>Find Friends</Text>
      </View>),
    },
  },
  ApproveFriends: {
    screen: ApproveFriends,
    navigationOptions: {
      tabBarLabel: 'Pending Requests',
      tabBarIcon: ({ tintColor }) => (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Icon name='user-follow' size={20} color={tintColor} style={{paddingRight: 5}}/><Text style={{color: tintColor}}>Pending Requests</Text>
      </View>),
    },
  },
  // ViewFriends: {
  //   screen: ViewFriends,
  //   navigationOptions: {
  //     tabBarLabel: 'My Friends',
  //     tabBarIcon: ({ tintColor }) => (
  //     <Icon name='people' size={20} color={tintColor} />),
  //   },
  // },
}, {
  initialRouteName: 'ApproveFriends',
  tabBarPosition: 'top',
  tabBarOptions: {
    tintColor: Colors.tintColor,
    activeBackgroundColor: 'white',
    showLabel: false
  },
})

export default class UserProfile extends React.Component {
  render() {
    const user = API.getFriends().data;

    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.boldLabel}>Add Friends</Text>
        </View>
        <View style={{flex:1}}>
          <FriendStack/>
        </View>
      </View>
    )
  }
}
