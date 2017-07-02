import React from 'react'
import { ListView, View, Text } from 'react-native'
// import firebaseApp from '../Firebase'
import { connect } from 'react-redux'
import StoryListItem from '../Components/StoryListItem'
import SearchBar from '../Components/SearchBar'

import styles from './Styles/StoryScreenStyles'

class StoryScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      // stories: [],
      text: '',
    }
    // this.storyRef = firebaseApp.database().ref('/story')
    this.onSearch = this.onSearch.bind(this)
  }


  // componentDidMount () {
  //   this.listenForItems(this.storyRef)
  // }

  onSearch (searchTerm) { this.setState({ text: searchTerm }) }

  // listenForItems(ref) {
  //   // get stories
  //   this.unsubscribe = ref.on('value', (snap) => {
  //     const items = []
  //     snap.forEach((child) => {
  //       items.push({ _key: child.key, ...child.val() })
  //       this.setState({ stories: items})
  //     })
  //   })
  // }

  checkMatch (searchTerm, story) {
    return story.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
  }

  // componentWillUnmount () {
  //   this.storyRef.off('value', this.unsubscribe)
  // }

  render () {
    const { text } = this.state
    const { stories } = this.props
    const { navigate } = this.props.navigation

    const filteredStories = text.length
      ? stories.filter(story => this.checkMatch(text, story))
      : stories;
    const storyList = this.state.ds.cloneWithRows(filteredStories)

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
            onSearch={this.onSearch} value={text}
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


const mapState = state => ({
  stories : state.stories.stories
})
export default connect(mapState)(StoryScreen)