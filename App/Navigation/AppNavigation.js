import { StackNavigator } from 'react-navigation'
import TextablesScreen from '../Containers/TextablesScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import MapScreen from '../Containers/MapScreen'
import PuzzleInfo from '../Containers/PuzzleInfo'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  TextablesScreen: { screen: TextablesScreen },
  LaunchScreen: { screen: LaunchScreen },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: { title: 'Login' }
  },
  MapScreen: {screen: MapScreen},
  PuzzleInfo: {screen: PuzzleInfo},
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'MapScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
