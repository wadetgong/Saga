import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import RoundedButton from '../Components/Button/RoundedButton'
import { Images, Fonts } from '../Themes'
import TreasureHunt from '../Components/TreasureHunt'

import styles from './Styles/StoryPreviewStyles'

const StoryPreview = ({ navigation }) => {
  const { item, navigate } = navigation.state.params

  console.log('story preview item', item)
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.boldLabel}>{item.title}</Text>
      </View>
      <ScrollView>
        <View>
        <Image
            style={{ width: '100%', height: 200 }}
            source={Images.storyMain[item._key]}
        />
        </View>
        <View style={styles.detailSection}>
          <Text style={{fontFamily: Fonts.type.bold, alignSelf: 'center'}}>Story Details</Text>
          <View style={styles.descriptionView}>
            <Text>Story Description: {item.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dolor magna, blandit a est vel, rhoncus volutpat ex. Cras cursus blandit tortor, sit amet viverra augue facilisis vitae. Donec sit amet posuere nulla, vel scelerisque dui. Donec feugiat ipsum in eros maximus, a varius eros pharetra.</Text>
          </View>
          <View style={styles.descriptionView}>
            <Text style={{fontStyle: 'italic'}}>Est. Completion Time: {item.estimatedTime} hours</Text>
          </View>
        </View>
        <View style={styles.mapSection}>
          <Text style={styles.mapSectionHeader}>Starting Point</Text>
          <TreasureHunt
            longitude={item.startingLocation.long}
            latitude={item.startingLocation.lat}
            style={{height: 150}}
          />
        </View>
        <View style={styles.buttonSection}>
          <RoundedButton onPress={() => navigate('JourneyFriends', {story: item})}>Assemble Team</RoundedButton>
        </View>
      </ScrollView>
    </View>
  )
}

export default StoryPreview
