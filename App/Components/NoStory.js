import React from 'react'
import { View, Text, Button, Image, TouchableOpacity } from 'react-native'
import { Images, Colors} from '../Themes'
import RoundedButton from '../Components/Button/RoundedButton'

import styles from './Styles/NoStoryStyles'

const NoStory = ({ navigation }) => (
  <View style={styles.container}>
    <Image
      style={styles.bgImage}
      source={Images.emptyStory}
    />
    <View style={styles.cardContainer}>
      <View style={styles.cardHeaderContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>No Current Story</Text>
        </View>
    </View>
      <View style={{
        padding: 10,
        height: 200,
      }}>

        <Text style={styles.cardBody}>
          You are currently not participating in a live story. Find one via the button below, or join one when your friends invite you!
        </Text>

      </View>
    </View>
    <View style={styles.buttonContainer}>
    <RoundedButton
      text="Browse Stories"
      onPress={() => {navigation.navigate('Stories')}}
    />
    </View>
  </View>
)

export default NoStory
