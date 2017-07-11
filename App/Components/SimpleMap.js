import React from 'react'
import { View } from 'react-native'
import MapView from 'react-native-maps'
import Styles from './Styles/TreasureHuntStyles'
import { calculateRegion } from '../Utils/MapHelpers'

const SimpleMap = ({ longitude, latitude, style }) => {
  const newRegion = calculateRegion(
    [{ longitude: longitude, latitude: latitude }],
    { latPadding: 0.01, longPadding: 0.01 }
  )

  return (
    <View>
      <MapView
        style={style || Styles.map}
        region={newRegion}
      ></MapView>
    </View>
  )
}

export default SimpleMap
