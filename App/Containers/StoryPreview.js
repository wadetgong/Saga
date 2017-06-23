import React from 'react'
import { View, Text, Image } from 'react-native'
import RoundedButton from '../Components/Button/RoundedButton'
import { Images } from '../Themes'

const StoryPreview = ({ navigation }) => {
    const { item, navigate } = navigation.state.params
    
    return (
        <View>
            <Image 
                style={{width: 100, height: 100}}
                source={Images.storyMain[item.name]}
            />
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Time: {item.estimatedTime}hrs</Text>
            <Text>Lat: {item.startingLocation.lat}</Text>
            <Text>Long: {item.startingLocation.long}</Text>
            <RoundedButton onPress={() => navigate('Friends')}>Assemble Avengers</RoundedButton>
        </View>
    )
}

export default StoryPreview