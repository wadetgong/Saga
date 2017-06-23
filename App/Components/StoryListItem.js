import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Images, Fonts } from '../Themes'


const StoryListItem = ({ item, navigate }) => (
<View >
  <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 5, paddingBottom: 5}}>
    <View style={{padding: 5}}>
      <TouchableOpacity
          onPress={() => navigate('StoryPreview', { navigate, item })}
      >
      <Image
          style={{width: 100, height: 100}}
          source={Images.storyMain[item.name]}
      />
      </TouchableOpacity>
    </View>
    <View style={{padding: 5, flex: 1}}>
      <Text style={{fontFamily: Fonts.type.bold}}>Story: {item.title}</Text>
      <Text>Description: {item.description}</Text>
      <Text style={{fontStyle: 'italic'}}>Est. Time: {item.estimatedTime} hrs.</Text>
      {/*<Text>Lat: {item.startingLocation.lat}</Text>
      <Text>Long: {item.startingLocation.long}</Text>*/}
    </View>
  </View>
</View>
)


export default StoryListItem
