import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import TreasureHunt from '../Components/TreasureHunt'
import Tracker from '../Components/Tracker'
import { ApplicationStyles } from '../Themes'
import geolib from 'geolib'
import BackgroundGeolocation from "react-native-background-geolocation";

// Styles
import styles from './Styles/MapScreenStyles'

class MapScreen extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      insideRange: false,
      longitude: null,
      latitude: null,
    }
    this.onLocation = this.onLocation.bind(this);
  }

  componentWillMount() {
    console.log('listener added for location changes')
    BackgroundGeolocation.on('location', this.onLocation)
  }

  onLocation(location) {
    //My location passing: 41.90, -87.67
    //My location failing 41.88, -87.67
    let polygon = [
      { latitude: 41.89, longitude: -87.66 },
      { latitude: 41.89, longitude: -87.68},
      { latitude: 41.92, longitude:  -87.68},
      { latitude: 41.92, longitude:  -87.66},
      { latitude: 41.89, longitude: -87.66 } // last point has to be same as first point
    ]

    let point = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }

    // console.log('- [js]location: ', JSON.stringify(location));
    this.setState({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
      insideRange: geolib.isPointInside(point, polygon),
    })
  }

  componentDidMount() {
    console.log('componentDidMount in MapScreen')
    let polygon = [
      { latitude: 41.89, longitude: -87.66 },
      { latitude: 41.89, longitude: -87.68},
      { latitude: 41.92, longitude:  -87.68},
      { latitude: 41.92, longitude:  -87.66},
      { latitude: 41.89, longitude: -87.66 } // last point has to be same as first point
    ]

    navigator.geolocation.getCurrentPosition((position) => {
      var crd = position.coords;
      let point = {
        latitude: crd.latitude,
        longitude: crd.longitude,
      }
      console.log('long lat being set: ', point)

      this.setState({
        latitude: crd.latitude,
        longitude: crd.longitude,
        insideRange: geolib.isPointInside(point, polygon),
      })
    })
  }
  // You must remove listeners when your component unmounts
  componentWillUnmount() {
    // Remove BackgroundGeolocation listeners
    console.log('Unmounting listeners in MapScreen')
    BackgroundGeolocation.un('location', this.onLocation);
  }


  render () {
    console.log('state in MapScreen', this.state)
    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.boldLabel}>MapScreen Section</Text>
          <Text style={styles.boldLabel}>Location is: {this.state.latitude}, {this.state.longitude}</Text>
          {
            this.state.insideRange
            ? <Text>Inside range? Yes</Text>
            : <Text>Inside range? No</Text>
          }
          <View style={ApplicationStyles.darkLabelContainer}>
            <TreasureHunt
              longitude={this.state.longitude}
              latitude={this.state.latitude}
            />
          </View>
          {/*<Tracker />*/}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
