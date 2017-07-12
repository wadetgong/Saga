import React from 'react'
import { View, Text, Button, ScrollView, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import TreasureHunt from '../Components/TreasureHunt'
import NoStory from '../Components/NoStory'
import ChapterDetails from './ChapterDetails'
import ChapterScrollBar from '../Components/ChapterScrollBar'

import firebaseApp from '../../Firebase'
import { setChapter, setStory, removeStoryUrl } from '../../Redux/actions/currentStory'

// Styles
import styles from './Styles/ChapterStyles'

class Chapter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedChap: 1,
      story: {},
      //picUrl: 'https://firebasestorage.googleapis.com/v0/b/breach-5ea6b.appspot.com/o/no-image-avail.png?alt=media&token=2cb55c5a-1676-4400-8e1c-00960387de64' //No image image
    }
    this.handleClick = this.handleClick.bind(this);

    //if the status of my current journey has changed to active, dispatch setstory so that my current story tab will populate with my current journey (sorry is mess)
    this.uid = firebaseApp.auth().currentUser.uid
    firebaseApp.database().ref(`/users/${this.uid}/journeys/current`)
      .once('value', journey => {
        let journeyObj = journey.val()
        if(journeyObj && journeyObj.status && journeyObj.status.text === 'active') {
          this.props.setStory(Object.keys(journey.val())[0])
        }
      })

    if (this.props.storyUrl) this.storyRef = firebaseApp.database().ref(this.props.storyUrl)
  }

  componentDidMount () {
    if(this.props.storyUrl) this.listenForChange(this.storyRef)
  }

  componentWillUnmount () {
    if(this.props.storyUrl) this.storyRef.off('value', this.unsubscribe)
  }

componentWillReceiveProps(newProps) {
  console.log(newProps, 'newProps in chapter')
  if(newProps.storyUrl !== this.props.storyUrl) {
    this.storyRef = firebaseApp.database().ref(newProps.storyUrl)
    this.listenForChange(this.storyRef)
  }
}

  listenForChange(ref) {
    this.unsubscribe = ref.on('value', story => {
      console.log('state updated in chapter', story.val())
      let storyObj = story.val()
      this.setState({
        story: storyObj,
      })
      // if(storyObj) {
      //   firebaseApp.database().ref('/photos/story/' + storyObj.id).once('value', pic => {
      //     this.setState({
      //       story: storyObj,
      //       picUrl: pic.val()
      //     })
      //   })
      // }
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

    const storyStatus = this.state.story.status && this.state.story.status.text || 'None'

    return (
      storyStatus !== 'Complete' && this.props.storyUrl
      ? (
        <View style={styles.container}>
        {/*<Image
          source={{uri: this.state.picUrl}}
          style={{position: 'absolute', zIndex: -10, height: 200, width: '100%', top: 0, opacity: 0.25}}
        />*/}
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
    setStory: (journeyId) => { dispatch(setStory(journeyId)) },
    removeStoryUrl: () => { dispatch(removeStoryUrl()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chapter)
