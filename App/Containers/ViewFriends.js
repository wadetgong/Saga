import React from 'react'
import { View, Text, Image } from 'react-native'

import styles from './Styles/UserProfileStyles'

export default class ViewFriends extends React.Component {

  render() {
    return (
      <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
        <Text>See friends list</Text>
      </View>
    )
  }
}
