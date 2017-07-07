import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import RoundedButton from '../Button/RoundedButton'
import { connect } from 'react-redux'
import geolib from 'geolib'
import { Fonts, Colors, Metrics } from '../../Themes/'

class EnterZone extends React.Component {
  constructor() {
    super()
  }

  getGeofence(locObj) {
    const delta = 0.0003;
    let polygon = [
      { longitude: locObj.longitude - delta, latitude: locObj.latitude - delta },
      { longitude: locObj.longitude - delta, latitude: locObj.latitude + delta },
      { longitude: locObj.longitude + delta, latitude: locObj.latitude + delta },
      { longitude: locObj.longitude + delta, latitude: locObj.latitude - delta },
      { longitude: locObj.longitude - delta, latitude: locObj.latitude - delta },
    ]
    console.log('geofence is', polygon)
    return polygon
  }

  render() {

    const locTarget = {
      longitude: this.props.puzzle.location.long,
      latitude: this.props.puzzle.location.lat
    }

    let insideGeofence = geolib.isPointInside(this.props.location, this.getGeofence(locTarget))

    console.log('fill in blank state is ', this.state)
    return (
      <View style={{padding: 5, margin: 5, /*backgroundColor: 'lightblue'*/}}>
        <View>
          {/*<Text>Puzzle Question: {this.props.puzzle.question}</Text>
          <Text>Target Zone is: long: {locTarget.longitude} lat: {locTarget.latitude}</Text>
          <Text>Your loc is: long: {this.props.location.longitude} lat: {this.props.location.latitude}</Text>*/}
        </View>
        {
          insideGeofence
          ? (
            <RoundedButton
              text="Confirm Location"
              disabled={this.props.disabled}
              onPress={() => {this.props.handleSubmit("Pass")}}
            />
            )
          : (

            <TouchableOpacity
              style={{
                height: 45,
                borderRadius: 5,
                paddingHorizontal: 30,
                marginHorizontal: Metrics.section,
                marginVertical: Metrics.baseMargin,
                backgroundColor: 'lightgray',
                justifyContent: 'center',
              }}
              onPress={() => {}}
              disabled={true}
            >
              <Text style={{
                color: 'gray',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: Fonts.size.medium,
                marginVertical: Metrics.baseMargin
              }}>NOT IN RANGE</Text>
            </TouchableOpacity>
          )

        }

      </View>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    location: state.geoLocation.location,
  }
}

export default connect(mapStateToProps, null)(EnterZone)
