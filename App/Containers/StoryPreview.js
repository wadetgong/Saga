import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../Components/Button/RoundedButton'
import { Images, Fonts } from '../Themes'
import TreasureHunt from '../Components/TreasureHunt'

import styles from './Styles/StoryPreviewStyles'

const StoryPreview = ({ navigation }) => {
  const { item, createJourney } = navigation.state.params

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
            <Text>{item.description}</Text>
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
          <RoundedButton onPress={() => createJourney(item)}>Assemble Team</RoundedButton>
        </View>
      </ScrollView>
    </View>
  )
}

const mapState = state => ({})
const mapDispatch = {}
export default connect(mapState, mapDispatch)(StoryPreview)
