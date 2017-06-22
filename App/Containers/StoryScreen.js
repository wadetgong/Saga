import React from 'react'
import { ListView } from 'react-native'
import API from '../Services/FixtureApi' 
import StoryListItem from '../Components/StoryListItem'

// import styles from './Styles/StoryScreen' // not there
export default class StoryScreen extends React.Component {
    
    render () {
        // data for all stories
        const stories = API.getStories().data;        
        let data = new ListView.DataSource({rowHasChanged : (r1, r2) => r1 != r2})
        data = data.cloneWithRows(stories)
        
        const { navigate } = this.props.navigation
        
        return (
            <ListView
                dataSource={data}
                renderRow={(item) => <
                    StoryListItem 
                    item={item} 
                    navigate={navigate}
                />}
            />
        )
    }
}