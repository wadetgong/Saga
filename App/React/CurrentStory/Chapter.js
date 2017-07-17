import React from 'react'
import { View, Text, Button, ScrollView, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import TreasureHunt from '../Components/TreasureHunt'
import NoStory from '../Components/NoStory'
import ChapterDetails from './ChapterDetails'
import ChapterScrollBar from '../Components/ChapterScrollBar'

import firebaseApp from '../../Firebase'
import { fetchChapter } from '../../Redux/StoriesRedux'

// Styles
import styles from './Styles/ChapterStyles'

class Chapter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedChap: 1,
      story: {},
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.fetchChapter(e)
    this.setState({
      selectedChap: e
    })
  }

  showWinMessage(currentStory) {
    if(currentStory.status === 'Complete') {
      return (
        <View style={styles.completeText}>
          <Text style={{color: '#3c763d'}}>Congratulations, you have completed the story {currentStory.title}!{' '}
              <Text
                onPress={() => this.props.navigation.navigate('JourneySummary')}
                style={{color: '#3c763d', fontWeight: 'bold', fontStyle: 'italic'
              }}>
                Click here to see conclusion.
              </Text>
          </Text>
        </View>
      )
    }
  }

  render () {
    const chapters = this.props.current.story && this.props.current.story.chapters || []
    const storyName = this.props.current.story && this.props.current.story.title

    const storyStatus = this.props.current.story && this.props.current.story.status && this.props.current.story.status.text || 'None'

    return (
      this.props.current.story && storyStatus !== 'Complete'
      ? (
        <View style={styles.container}>
          {
            this.showWinMessage(this.props.current.story)
          }
          <View style={styles.sectionHeader}>
            <Text style={styles.boldLabel}>{storyName} - Chapter {this.props.currentChapter.id}</Text>
          </View>
          <ScrollView style={styles.container}>
            <View>
              <TreasureHunt/>
              <ChapterScrollBar
                chapters={chapters}
                handleClick={this.handleClick}
                selectedChap={this.props.currentChapter.id}
              />
            </View>
            <View>
              <ChapterDetails
                screenProps={{rootNavigation: this.props.navigation}}
                storyKey={this.props.current.story.id}
              />
            </View>
          </ScrollView>
        </View>
      )
      : <NoStory navigation={this.props.navigation}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    current: state.stories.current,
    currentChapter: state.stories.currentChapter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChapter: (chapId) => { dispatch(fetchChapter(chapId)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chapter)
