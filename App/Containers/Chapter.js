import React from 'react'
import { View, Text, Button, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import TreasureHunt from '../Components/TreasureHunt'
import Tracker from '../Components/Tracker'
import ChapterDetails from '../Containers/ChapterDetails'
import ChapterScrollBar from '../Components/ChapterScrollBar'
import RoundedButton from '../Components/Button/RoundedButton'
import { ApplicationStyles, Images} from '../Themes'
import geolib from 'geolib'
import firebaseApp from '../Firebase'
import { setChapter } from '../Redux/actions/currentStory'

// Styles
import styles from './Styles/ChapterStyles'

class Chapter extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      // insideRange: false,
      selectedChap: 1,
      story: {},
    }
    // this.onLocation = this.onLocation.bind(this);
    this.handleClick = this.handleClick.bind(this);
    if(this.props.storyUrl) this.storyRef = firebaseApp.database().ref(this.props.storyUrl)
  }

  componentDidMount() {
    if(this.props.storyUrl) this.listenForChange(this.storyRef)
    // // console.log('componentDidMount in Chapter')
    // let polygon = [
    //   { latitude: 41.89, longitude: -87.66 },
    //   { latitude: 41.89, longitude: -87.68},
    //   { latitude: 41.92, longitude:  -87.68},
    //   { latitude: 41.92, longitude:  -87.66},
    //   { latitude: 41.89, longitude: -87.66 } // last point has to be same as first point
    // ]


    //   // console.log('long lat being set: ', point)

      // this.setState({
      //   latitude: crd.latitude,
      //   longitude: crd.longitude,
      //   insideRange: geolib.isPointInside(point, polygon),
      // })
    // })
  }

  componentWillUnmount () {
    if(this.props.storyUrl) this.storyRef.off('value', this.unsubscribe)
  }

  listenForChange(ref) {
    this.unsubscribe = ref.on('value', story => {
      console.log('new info', story.val())
      this.setState({
        story: story.val()
      })
    })
  }

  onLocation(location) {
    // //My location passing: 41.90, -87.67
    // //My location failing 41.88, -87.67
    // let polygon = [
    //   { latitude: 41.89, longitude: -87.66 },
    //   { latitude: 41.89, longitude: -87.68},
    //   { latitude: 41.92, longitude:  -87.68},
    //   { latitude: 41.92, longitude:  -87.66},
    //   { latitude: 41.89, longitude: -87.66 } // last point has to be same as first point
    // ]

    // let point = {
    //   latitude: location.coords.latitude,
    //   longitude: location.coords.longitude,
    // }
  }

  handleClick(e) {
    this.props.setChapter(e)
    this.setState({
      selectedChap: e
    })
  }

  render () {
    // const chapters = [
    //   {id: 1, puzzles: [{id: 1}, {id: 2}]},
    //   {id: 2, puzzles: [{id: 3}]},
    //   {id: 3, puzzles: [{id: 4},{id: 5},{id: 6}]},
    //   {id: 4, puzzles: [{id: 7},{id: 8},{id: 9}, {id: 10}]},
    //   {id: 5, puzzles: [{id: 11},{id: 12},{id: 13}]},
    //   {id: 6, puzzles: [{id: 14},{id: 15}]}
    // ]

    const chapters = this.state.story.chapters || []
    const selectedChapInfo = (chapters && chapters[this.state.selectedChap-1]) || 0
    const storyName = this.state.story && this.state.story.title

    return (
      this.props.storyUrl
      ? (
        <View style={styles.container}>
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
           {/* <View>
              {
                this.state.insideRange
                ? <Text>Inside range? Yes</Text>
                : <Text>Inside range? No</Text>
              }
            </View>*/}
            <ChapterDetails
              screenProps={{rootNavigation: this.props.navigation}}
              selectedChap={this.state.selectedChap}
              chapterInfo={selectedChapInfo}
              storyKey={this.state.story.id}
            />
          </ScrollView>
        </View>
      )
      : (
        <View style={styles.container}>
          <View style={styles.sectionHeader}>
            <Text style={styles.boldLabel}>No Current Story :(</Text>
          </View>
          <Image
            style={{width: '100%', height: 200}}
            source={Images.emptyStory}
          />
          <View style={styles.paddedDiv}>
            <Text>
              You are currently not participating in a live story. Find one via the button below, or join one when your friends invite you!
            </Text>
          </View>
          <RoundedButton
            text="Browse Stories"
            onPress={() => {this.props.navigation.navigate('Stories')}}
          />
        </View>
      )
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
