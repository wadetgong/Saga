import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../Components/Button/RoundedButton'
import { Images, Fonts } from '../../Themes'
import SimpleMap from '../Components/SimpleMap'

import styles from './Styles/StoryPreviewStyles'

const StoryPreview = ({ navigation, name, current, screenProps }) => {
  const { item, createJourney, picUrl } = navigation.state.params
  const { navigate } = screenProps.rootNavigation

  const getButton = (name, item) => {
  {/*not sure what the ternary is for*/}
  return (name && name == item._key)
  ? <RoundedButton onPress={() => navigate('JourneyFriends')}>Assemble again!</RoundedButton>
  : <RoundedButton onPress={() => createJourney(item)}>Assemble Team</RoundedButton>
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {
          Object.keys(current).length
          ? (
            <View style={styles.alertSection}>
              <Text style={styles.alertText}>New stories can't be started when you have a current story.{' '}
                  <Text
                    style={{fontWeight: 'bold'}}
                    onPress={() => {navigate('CurrentStory')}}
                  >
                     Go to current story
                  </Text>
              </Text>
            </View>
          )
          : null
        }
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
          <SimpleMap
            longitude={item.startingLocation.long}
            latitude={item.startingLocation.lat}
            style={{height: 150}}
          />
        </View>
        {
          Object.keys(current).length
          ? null
          : (
            <View style={styles.buttonSection}>
              {getButton(name, item)}
            </View>
          )
        }
      </ScrollView>
    </View>
  )
}

const mapState = state => ({
  name : state.stories.name,
  current : state.stories.current
})
export default connect(mapState)(StoryPreview)
