import React from 'react'
import { ListView, View, Text } from 'react-native'
import firebaseApp from '../Firebase'
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
    
    this.uid = firebaseApp.auth().currentUser.uid
    
    this.onSearch = this.onSearch.bind(this)
    this.createJourney = this.createJourney.bind(this)
  }

  onSearch (searchTerm) { this.setState({ text: searchTerm }) }

  checkMatch (searchTerm, story) {
    return story.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
  }

  createJourney () {    
    const uid = this.uid;
    const { navigate } = this.props.navigation
    
    // increment index
    // NOTE: transactions are really weird
    // I definitely don't know why BUT
    // transactions get called twice, once with i = null
    const indexRef = firebaseApp.database().ref('/indexes/journey')
    indexRef.transaction(i => {
      if (i) {
        const jid = '/journey/' + uid + i
        
        // new journey
        const newJourneyRef = firebaseApp.database().ref(jid)
        newJourneyRef.set({
          "what": "we're making a new journey somehow",
          "team": { [uid] : true }
        })
        
        // user
        // const myJourneysRef = firebaseApp.database().ref('/users/' + uid + '/')
      }
      return i+1
    })
    
    navigate('JourneyFriends')
  }

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
            createJourney={this.createJourney}
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