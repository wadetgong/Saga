import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import Navigation from '../Navigation/AppNavigation'
import ReduxPersist from '../Config/ReduxPersist'
import { locationStart, locationStop } from '../Utils/GeoLocation'
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentWillMount() { locationStart() }
  componentWillUnmount() { locationStop() }
  
  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='dark-content' />
        <Navigation />
      </View>
    ) 
  }
}

export default RootContainer