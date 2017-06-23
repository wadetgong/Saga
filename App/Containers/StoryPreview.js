import React from 'react'
import { View, Text, Image } from 'react-native'
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
      <View>
      <Image
          style={{ width: '100%', height: 200 }}
          source={Images.storyMain[item.name]}
      />
      </View>
      <View style={{flex: .5,
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingTop: 10,}}>
        <Text style={{fontFamily: Fonts.type.bold, alignSelf: 'center'}}>Story Details</Text>
        <View style={{padding: 10}}>
          <Text>Story Description: {item.description}</Text>
          <Text style={{fontStyle: 'italic'}}>Est. Completion Time: {item.estimatedTime} hours</Text>
        </View>
      </View>
        <View style={{flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',}}>
          <Text style={{fontFamily: Fonts.type.bold, alignSelf: 'center', paddingBottom: 10}}>Starting Point</Text>
          <TreasureHunt
            longitude={item.startingLocation.long}
            latitude={item.startingLocation.lat}
            style={{height: 150}}
          />
        </View>
      <View style={{flex: .5,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            alignItems: 'center'}}>
        <RoundedButton onPress={() => navigate('LaunchScreen')}>Assemble Team</RoundedButton>
      </View>
    </View>
  )
}

export default StoryPreview
