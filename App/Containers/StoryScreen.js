import React from 'react'
import { View, FlatList } from 'react-native'
import { getStories } from '../Services/FixtureApi' 

// import styles from './Styles/StoryScreen' // not there
export default class StoryScreen extends React.Component {
    render () {
        console.log(getStories().data)
        
        return (
            <FlatList 
                data={getStories().data}
                renderItem={({item}) => <ListItem title={item.title} />}
            />
        )
    }
}