import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'


const StoryListItem = ({ item, navigate }) => (
    <View>
        <TouchableOpacity 
            onPress={() => navigate('StoryPreview', { navigate, item })}
        >
        <Image 
            style={{width: 100, height: 100}}
            source={Images.storyMain[item.name]}
        />
        </TouchableOpacity>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text>Time: {item.estimatedTime}hrs</Text>
        <Text>Lat: {item.startingLocation.lat}</Text>
        <Text>Long: {item.startingLocation.long}</Text>
    </View>
)


export default StoryListItem