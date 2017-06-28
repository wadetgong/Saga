import React from 'react'
import { ListView, View, Text } from 'react-native'
import firebaseApp from '../Firebase'
import StoryListItem from '../Components/StoryListItem'
import SearchBar from '../Components/SearchBar'

import styles from './Styles/StoryScreenStyles'

export default class StoryScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      stories: [],
      text: '',
    }
    this.storyRef = firebaseApp.database().ref('/story')
    this.onSearch = this.onSearch.bind(this)
  }


  componentDidMount () {
    this.listenForItems(this.storyRef)
  }

  onSearch (searchTerm) {
    console.log('searching in Friends Searchbar')
    this.setState({
      text: searchTerm
    })
  }

  listenForItems(ref) {
    // get stories
    this.unsubscribe = ref.on('value', (snap) => {
      const items = []
      snap.forEach((child) => {
        items.push({ _key: child.key, ...child.val() })
        this.setState({ stories: items})
      })
    })
  }

  checkMatch(searchTerm, story) {
    return story.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    const filteredStories = this.state.text.length
      ? this.state.stories.filter(story => this.checkMatch(this.state.text, story))
      : this.state.stories;

    const storyList = this.state.ds.cloneWithRows(filteredStories)
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
              onSearch={this.onSearch}
              /*onCancel={this.onCancelSearchBar}*/
          />
        </View>
        <ListView
          dataSource={storyList}
          removeClippedSubviews={false}
          enableEmptySections={true}
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
