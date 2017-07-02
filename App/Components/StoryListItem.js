import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Images, Fonts } from '../Themes'


const StoryListItem = ({ item, navigate, createJourney }) => (
<ScrollView>
  <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 10, paddingBottom: 5}}>
    <View style={{padding: 5}}>
      <TouchableOpacity
          onPress={() => navigate('StoryPreview', { item, createJourney })}
      >
      <Image
          style={{width: 100, height: 100}}
          source={Images.storyMain[item._key]}
      />
      </TouchableOpacity>
    </View>
    <View style={{padding: 5, flex: 1}}>
      <TouchableOpacity
          onPress={() => navigate('StoryPreview', { item, createJourney })}
      >
      <Text style={{fontFamily: Fonts.type.bold}}>Story: {item.title}</Text>
      <Text>Description: {item.description}</Text>
      <Text style={{fontStyle: 'italic'}}>Est. Time: {item.estimatedTime} hrs.</Text>
      {/*<Text>Lat: {item.startingLocation.lat}</Text>
      <Text>Long: {item.startingLocation.long}</Text>*/}
      </TouchableOpacity>

    </View>
  </View>
</ScrollView>
)


export default StoryListItem
