import React from 'react'
import { View, Text, Image } from 'react-native'

import styles from './Styles/UserProfileStyles'
import {Colors, Metrics} from '../Themes/'

export default class ViewFriends extends React.Component {

  render() {
    return (
      <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
        <View style={{
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginHorizontal: '25%',
    justifyContent: 'center',
    marginBottom: 10
  }}>
          <Text style={{
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin,
    color: 'gray'
  }}>Your Friends</Text>
        </View>
      </View>
    )
  }
}
