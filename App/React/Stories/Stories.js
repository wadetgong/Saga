import React from 'react'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'

import StoryScreen from './StoryScreen'
import StoryPreview from './StoryPreview'
import JourneyFriends from './JourneyFriends'
import TeamScreen from './TeamScreen'

import firebaseApp from '../../Firebase'
import { fetchStories, fetchJourney } from '../../Redux/StoriesRedux'

const ChooseStoryStack = StackNavigator({
  StoryScreen: { screen: StoryScreen },
  StoryPreview: { screen: ({ navigation, name, current, screenProps }) =>
    <StoryPreview
      screenProps={screenProps}
      navigation={navigation}
      name={name}
      current={current}
    />
  },
  JourneyFriends: { screen: JourneyFriends },
  TeamScreen: { screen: ({ screenProps, navigation }) =>
    <TeamScreen
      screenProps={screenProps}
      navigation={navigation}
    />
  }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'StoryScreen'
})

class Stories extends React.Component {
  constructor() {
    super()
    this.uid = firebaseApp.auth().currentUser.uid
    this.unsubscribeMyJourneysRef = null;
    this.unsubscribeMyCurrentJourneyRef = null;
    // this.unsubscribeCurrentJourneyRef = null;
  }

  componentDidMount () {
    const uid = this.uid

    // get list of previous journeys -> stories
    // and filter to stories you can play
    const myJourneysRef = firebaseApp.database().ref('/users/' + uid + '/journeys')
    const storyRef = firebaseApp.database().ref('/story')
    this.getJourneysAndStories(myJourneysRef, storyRef)

    // // listen to journey to see if new one is added by yourself
    // // possible listen to journey
    // const journeyRef = firebaseApp.database().ref('/journey')
    // this.getCurrentJourney(journeyRef)
    const myCurrentJourneyRef = firebaseApp.database().ref('/users/' + uid + '/journeys/current')
    this.getCurrentJourney(myCurrentJourneyRef)
  }

  componentWillUnmount () {
    if (this.unsubscribeMyJourneysRef)
      this.unsubscribeMyJourneysRef()
    if (this.unsubscribeMyCurrentJourneyRef)
      this.unsubscribeMyCurrentJourneyRef()
    // if (this.unsubscribeCurrentJourneyRef)
    //   this.unsubscribeCurrentJourneyRef()
  }

  getJourneysAndStories (journeyRef, storyRef) {
    this.unsubscribeMyJourneysRef = journeyRef.on('value', snap => {
      const journeys = snap.val() || {} // can be null or false

      // get list of all stories
      storyRef
        .once('value')
        .then(snap => snap.val())
        .then(stories => this.props.fetchStories(stories, journeys))
        .catch(err => console.log('ERROR IN STORIES.getJourneysAndStories', err))
    })
  }

  getCurrentJourney (myCurrentJourneyRef) {
    const uid = this.uid
    const fetchJourney = this.props.fetchJourney

    this.unsubscribeMyCurrentJourneyRef = myCurrentJourneyRef.on('value', snap => {
      const value = snap.val() // {jid : storyname}
      console.log('val in currentJourneyRef', value)
      if (value) {
        //
        // CODEREVIEW TODO: what is best way to unsubscribe
        // this next listener when done?
        // I don't understand when componentWillUnmount happens
        // Also should I do this here? Or in
        // ./RootContainer.js

        // if you added the newest journey to /journey send to redux
        // this listener runs TWICE
        // is it because of the transaction?
        // How do I fix the transaction running twice in StoryScreen?

        const jid = Object.keys(value)[0], name = value[jid]
        const currentJourneyRef = firebaseApp.database().ref('/journey/' + jid)
        // this.unsubscribeCurrentJourneyRef = currentJourneyRef
        currentJourneyRef.once('value', csnap => {
          const cur = csnap.val()
          console.log('STORIES STORIES STORIES listener ran', jid, cur)
          if(cur){ //check to see if currentjourney exists - built removal for current story elsewhere
            fetchJourney(jid, cur)
          }
        })
      }
    })
  }

  render () { return ( <ChooseStoryStack screenProps={this.props.screenProps}/> ) }
}

const mapState = state => ({})
const mapDispatch = {
  fetchStories,
  fetchJourney
}
export default connect(mapState, mapDispatch)(Stories)
