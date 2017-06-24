import React from 'react'
import { ListView, View, Text } from 'react-native'
import API from '../Services/FixtureApi'
import StoryListItem from '../Components/StoryListItem'
import SearchBar from '../Components/SearchBar'

import styles from './Styles/StoryScreenStyles'

// import styles from './Styles/StoryScreen' // not there
export default class StoryScreen extends React.Component {
  onSearchSearchBar () {
    console.log('searching in Friends Searchbar')
  }

  render () {
    // data for all stories
    const stories = API.getStories().data;
    let data = new ListView.DataSource({rowHasChanged : (r1, r2) => r1 != r2})
    data = data.cloneWithRows(stories)
    //Ignite boilerplate says not to do clonewithrows in render?

    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.boldLabel}>Stories</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
          <SearchBar
              onSearch={this.onSearchSearchBar}
              /*onCancel={this.onCancelSearchBar}*/
          />
        </View>
        <ListView
            dataSource={data}
            removeClippedSubviews={false}
            renderRow={(item) => <
                StoryListItem
                item={item}
                navigate={navigate}
            />}
        />
      </View>
    )
  }
}
