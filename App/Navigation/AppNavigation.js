import { StackNavigator, TabNavigator } from 'react-navigation'
import TextablesScreen from '../Containers/TextablesScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import StoryScreen from '../Containers/StoryScreen'
import StoryPreview from '../Containers/StoryPreview'
import Friends from '../Containers/Friends'
import UserProfile from '../Containers/UserProfile'
import UserFriends from '../Containers/UserFriends'
import TeamScreen from '../Containers/TeamScreen'
import Chapter from '../Containers/Chapter'
import PuzzleInfo from '../Containers/PuzzleInfo'
import CameraScreen from '../Containers/CameraScreen'
import styles from './Styles/NavigationStyles'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import React from 'react'
import { Colors } from '../Themes'

const StoryStack = StackNavigator({
    StoryScreen: { screen: StoryScreen },
    StoryPreview: { screen: StoryPreview },
    Friends: { screen: Friends },
    TeamScreen: { screen: TeamScreen },
    Chapter: {screen: Chapter},
    PuzzleInfo: {screen: PuzzleInfo},
  }, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'StoryScreen',
    navigationOptions: {
      headerStyle: styles.header
    }
  });


const TabNav = TabNavigator({
  CurrentStory: {
    screen: Chapter,
    navigationOptions: {
      tabBarLabel: 'Current Story',
      tabBarIcon: ({ tintColor }) => (
      <Icon
        name='notebook'
        size={20}
        color={tintColor}
      />),
    },
  },
  Stories: {
    screen: StoryStack,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({ tintColor }) => (
      <Icon
        name='magnifier'
        size={20}
        color={tintColor}
      />),
    },
  },
  UserProfile: {
    screen: UserProfile,
    navigationOptions: {
      tabBarLabel: 'My Profile',
      tabBarIcon: ({ tintColor }) => (
      <Icon
        name='user'
        size={20}
        color={tintColor}
      />),
    },
  },
  UserFriends: {
    screen: UserFriends,
    navigationOptions: {
      tabBarLabel: 'My Friends',
      tabBarIcon: ({ tintColor }) => (
      <Icon
        name='people'
        size={20}
        color={tintColor}
      />),
    },
  },

}, {
  initialRouteName: 'UserProfile',
  tabBarOptions: {
    tintColor: Colors.tintColor,
    showLabel: false
  },
});

// Manifest of possible screens
// const PrimaryNav = StackNavigator({
//   TextablesScreen: { screen: TextablesScreen },

//   LaunchScreen: { screen: LaunchScreen },
//   LoginScreen: {
//     screen: LoginScreen,
//     navigationOptions: { title: 'Login' }
//   },
//   StoryScreen: { screen: StoryScreen },
//   StoryPreview: { screen: StoryPreview },
//   Friends: { screen: Friends },
//   UserProfile: { screen: UserProfile },
//   TeamScreen: { screen: TeamScreen },

//   Chapter: {screen: Chapter},
//   PuzzleInfo: {screen: PuzzleInfo},
//   CameraScreen: { screen: CameraScreen},
// }, {
//   // Default config for all screens
//   headerMode: 'none',
//   initialRouteName: 'StoryScreen',
//   navigationOptions: {
//     headerStyle: styles.header
//   }
// })

export default TabNav
