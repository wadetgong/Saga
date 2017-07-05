import React from 'react'
import { View, Text, Button, ScrollView, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import TreasureHunt from '../Components/TreasureHunt'
import NoStory from '../Components/NoStory'
import ChapterDetails from '../Containers/ChapterDetails'
import ChapterScrollBar from '../Components/ChapterScrollBar'

import firebaseApp from '../Firebase'
import { setChapter } from '../Redux/actions/currentStory'

// Styles
import styles from './Styles/ChapterStyles'

class Chapter extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      selectedChap: 1,
      story: {},
    }
    this.handleClick = this.handleClick.bind(this);
    if(this.props.storyUrl) this.storyRef = firebaseApp.database().ref(this.props.storyUrl)
  }

  componentDidMount() {
    if(this.props.storyUrl) this.listenForChange(this.storyRef)
  }

  componentWillUnmount () {
    if(this.props.storyUrl) this.storyRef.off('value', this.unsubscribe)
  }

  listenForChange(ref) {
    this.unsubscribe = ref.on('value', story => {
      this.setState({
        story: story.val()
      })
    })
  }

  handleClick(e) {
    this.props.setChapter(e)
    this.setState({
      selectedChap: e
    })
  }

  showWinMessage() {
    if(this.state.story.status === 'Complete') {
      return (
        <View style={styles.completeText}>
          <Text style={{color: '#3c763d'}}>Congratulations, you have completed the story {this.state.story.title}!{' '}
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
    const chapters = this.state.story.chapters || []
    const selectedChapInfo = (chapters && chapters[this.state.selectedChap-1]) || 0
    const storyName = this.state.story && this.state.story.title

    return (
      this.props.storyUrl
      ? (
        <View style={styles.container}>
          {
            this.showWinMessage()
          }
          <View style={styles.sectionHeader}>
            <Text style={styles.boldLabel}>{storyName} - Chapter {this.state.selectedChap}</Text>
          </View>
          <ScrollView style={styles.container}>
            <View>
              <TreasureHunt/>
              <ChapterScrollBar
                chapters={chapters}
                handleClick={this.handleClick}
                selectedChap={this.state.selectedChap}
              />
            </View>
            <View>
              <ChapterDetails
                screenProps={{rootNavigation: this.props.navigation}}
                selectedChap={this.state.selectedChap}
                chapterInfo={selectedChapInfo}
                storyKey={this.state.story.id}
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
    storyUrl: state.currentStory.storyUrl,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setChapter: (chapterId) => { dispatch(setChapter(chapterId)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chapter)
