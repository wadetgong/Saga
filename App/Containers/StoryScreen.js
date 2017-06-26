import React from 'react'
import { ListView, View, Text } from 'react-native'
import firebaseApp from '../Firebase'
import StoryListItem from '../Components/StoryListItem'
import SearchBar from '../Components/SearchBar'

import styles from './Styles/StoryScreenStyles'

// import styles from './Styles/StoryScreen' // not there
export default class StoryScreen extends React.Component {
  state = {
    stories: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }
  
  storyRef = firebaseApp.database().ref('/story');
  
  componentDidMount () {
    console.log('storyRef', this.storyRef)
    this.listenForItems(this.storyRef)
  }
  
  onSearchSearchBar () {
    console.log('searching in Friends Searchbar')
  }

  listenForItems(ref) {
    // get stories
    ref.on('value', (snap) => {
      const items = []
      snap.forEach((child) => {
        console.log('CHILD', child.val(), child.key)
        items.push({ _key: child.key, ...child.val() })
        this.setState({ stories: this.state.stories.cloneWithRows(items) })
      })
      console.log('HEY STORY ITEMS')
      console.log(items)
    })
  }

  render () {
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
            dataSource={this.state.stories}
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
