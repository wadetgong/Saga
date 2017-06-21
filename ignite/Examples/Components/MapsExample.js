import React from 'react'
import { View } from 'react-native'
import ExamplesRegistry from '../../../App/Services/ExamplesRegistry'
import MapView from 'react-native-maps'

// Example
ExamplesRegistry.addPluginExample('Maps', () =>
  <View
    style={{
      alignItems: 'center'
    }}>
    <MapView
      style={{
        width: 320,
        height: 320
      }}
      initialRegion={{
        latitude: 41.888969,
        longitude: -87.6361147,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
    />
  </View>
)
