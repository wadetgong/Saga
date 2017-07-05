import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../Components/Button/RoundedButton'
import { Images, Fonts } from '../Themes'
import TreasureHunt from '../Components/TreasureHunt'

import styles from './Styles/StoryPreviewStyles'

const StoryPreview = ({ navigation, name }) => {
  const { item, createJourney, picUrl } = navigation.state.params
  const { navigate } = navigation

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Image
            style={styles.bgImage}
            source={{uri: picUrl}}>
            <View style={styles.sectionHeader}>
              <Text style={styles.boldLabel}>{item.title}</Text>
            </View>

          </Image>
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
          {(name && name == item._key)
          ? <RoundedButton onPress={() => navigate('JourneyFriends')}>Assemble again!</RoundedButton>
          : <RoundedButton onPress={() => createJourney(item)}>Assemble Team</RoundedButton>}
        </View>
      </ScrollView>
    </View>
  )
}

const mapState = state => ({
  name : state.stories.name
})
export default connect(mapState)(StoryPreview)
