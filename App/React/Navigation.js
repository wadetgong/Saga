import { StackNavigator, TabNavigator } from 'react-navigation'
import React from 'react'

import LoginScreen from './LoginScreen'

import Stories from './Stories/Stories'
import UserProfile from './UserProfile/UserProfile'
import UserFriends from './UserFriends/UserFriends'

import Chapter from './CurrentStory/Chapter'
import ChapterDetails from './CurrentStory/ChapterDetails'
import PuzzleInfo from './CurrentStory/PuzzleInfo'
import Camera from './Camera'
import JourneySummary from './CurrentStory/JourneySummary'
import LeaderBoard from './CurrentStory/LeaderBoard'

import styles from './Styles/NavigationStyles'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { Colors } from '../Themes'

const StoryGameStack = StackNavigator({
  Chapter: { screen: Chapter },
  ChapterDetails: { screen: ChapterDetails },
  PuzzleInfo: { screen: PuzzleInfo },
  Camera: { screen: Camera },
  JourneySummary: { screen: JourneySummary },
  LeaderBoard: { screen: LeaderBoard }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Chapter',
  navigationOptions: { headerStyle: styles.header }
})

const TabNav = TabNavigator({
  CurrentStory: {
    screen: StoryGameStack,
    navigationOptions: {
      tabBarLabel: 'Current Story',
      tabBarIcon: ({ tintColor }) => (
      <Icon name='notebook' size={20} color={tintColor} />),
    }
  },
  Stories: {
    screen: ({ navigation }) => <Stories screenProps={{ rootNavigation: navigation }} />,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({ tintColor }) => <Icon name='magnifier' size={20} color={tintColor} />,
    }
  },
  UserProfile: {
    screen: ({ navigation }) => <UserProfile screenProps={{ rootNavigation: navigation }} />,
    navigationOptions: {
      tabBarLabel: 'My Profile',
      tabBarIcon: ({ tintColor }) => (
      <Icon name='user' size={20} color={tintColor} />),
    }
  },
  UserFriends: {
    screen: UserFriends,
    navigationOptions: {
      tabBarLabel: 'My Friends',
      tabBarIcon: ({ tintColor }) => (
      <Icon name='people' size={20} color={tintColor} />),
    }
  }
}, {
  initialRouteName: 'UserProfile',
  tabBarOptions: {
    tintColor: Colors.tintColor,
    showLabel: false
  }
})

const HomeStack = StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  TabNav: { screen: TabNav }
}, {
  headerMode: 'none',
  initialRouteName: 'Login'
})

export default HomeStack
