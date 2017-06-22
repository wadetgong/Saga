import React from 'react'
import { View, ListItem, Text } from 'react-native'
import API from '../Services/FixtureApi' 

// import styles from './Styles/StoryScreen' // not there
export default class StoryScreen extends React.Component {
    render () {
        const data = API.getStories().data;
        console.log('data in SToryScreen', data)
        return (
            <View>
            </View>
        )
    }
}