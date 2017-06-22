import React from 'react'
import { View } from 'react-native'
import MapView from 'react-native-maps'
import TreasureHuntCallout from './TreasureHuntCallout'
import Styles from './Styles/TreasureHuntStyles'

// Generate this MapHelpers file with `ignite generate map-utilities`
// You must have Ramda as a dev dependency to use this.
import { calculateRegion } from '../Lib/MapHelpers'

/* ***********************************************************
* IMPORTANT!!! Before you get started, if you are going to support Android,
* PLEASE generate your own API key and add it to android/app/src/main/AndroidManifest.xml
* https://console.developers.google.com/apis/credentials
* Also, you'll need to enable Google Maps Android API for your project:
* https://console.developers.google.com/apis/api/maps_android_backend/
*************************************************************/

class TreasureHunt extends React.Component {
  /* ***********************************************************
  * This generated code is only intended to get you started with the basics.
  * There are TONS of options available from traffic to buildings to indoors to compass and more!
  * For full documentation, see https://github.com/lelandrichardson/react-native-maps
  *************************************************************/

  constructor (props) {
    super(props)
    /* ***********************************************************
    * STEP 1
    * Set the array of locations to be displayed on your map. You'll need to define at least
    * a latitude and longitude as well as any additional information you wish to display.
    *************************************************************/

    /* ***********************************************************
    * STEP 2
    * Set your initial region either by dynamically calculating from a list of locations (as below)
    * or as a fixed point, eg: { latitude: 123, longitude: 123, latitudeDelta: 0.1, longitudeDelta: 0.1}
    * You can generate a handy `calculateRegion` function with
    * `ignite generate map-utilities`
    *************************************************************/

    this.state = {
      showUserLocation: true
    }
    this.renderMapMarkers = this.renderMapMarkers.bind(this)
  }

  componentWillReceiveProps (newProps) {
    /* ***********************************************************
    * STEP 3
    * If you wish to recenter the map on new locations any time the
    * props change, do something like this:
    *************************************************************/
    // this.setState({
    //   region: calculateRegion(newProps.locations, { latPadding: 0.1, longPadding: 0.1 })
    // })
  }

  onRegionChange (newRegion) {
    /* ***********************************************************
    * STEP 4
    * If you wish to fetch new locations when the user changes the
    * currently visible region, do something like this:
    *************************************************************/
    // const searchRegion = {
    //   ne_lat: newRegion.latitude + newRegion.latitudeDelta,
    //   ne_long: newRegion.longitude + newRegion.longitudeDelta,
    //   sw_lat: newRegion.latitude - newRegion.latitudeDelta,
    //   sw_long: newRegion.longitude - newRegion.longitudeDelta
    // }
    // Fetch new data...
  }

  calloutPress (location) {
    /* ***********************************************************
    * STEP 5
    * Configure what will happen (if anything) when the user
    * presses your callout.
    *************************************************************/

    // console.tron.log(location) // Reactotron
  }

  renderMapMarkers (location) {
    /* ***********************************************************
    * STEP 6
    * Customize the appearance and location of the map marker.
    * Customize the callout in ./TreasureHuntCallout.js
    *************************************************************/

    return (
      <MapView.Marker key={location.title} coordinate={{latitude: location.latitude, longitude: location.longitude}}>
        <TreasureHuntCallout location={location} onPress={this.calloutPress} />
      </MapView.Marker>
    )
  }

  render () {
    console.log('state in TreasureHunt', this.state);
    console.log('props in TreasureHunt', this.props);
    const newRegion = calculateRegion([{
          longitude: this.props.longitude,
          latitude: this.props.latitude
        }], { latPadding: 0.01, longPadding: 0.01 })

    return (
      <MapView
        style={Styles.map}
        region={newRegion}
        showsUserLocation={this.state.showUserLocation}
      >
      </MapView>
    )
  }
}

export default TreasureHunt

