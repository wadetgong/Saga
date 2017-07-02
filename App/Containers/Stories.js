import React from 'react'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import StoryScreen from '../Containers/StoryScreen'
import StoryPreview from '../Containers/StoryPreview'
import JourneyFriends from '../Containers/JourneyFriends'
import TeamScreen from '../Containers/TeamScreen'
import firebaseApp from '../Firebase'
import { fetchStories, fetchJourney } from '../Redux/StoriesRedux'

const ChooseStoryStack = StackNavigator({
    StoryScreen: { screen: StoryScreen },
    StoryPreview: { screen: StoryPreview },
    JourneyFriends: { screen: JourneyFriends },
    TeamScreen: { screen: TeamScreen },
    // TeamScreen: { screen: ({ navigation }) => <TeamScreen screenProps={{ rootNavigation: navigation }} /> }
  }, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'StoryScreen',
    // navigationOptions: {
    //   headerStyle: styles.header
    // }
  });

class Stories extends React.Component {
  constructor() {
    super()
    this.uid = firebaseApp.auth().currentUser.uid
    this.unsubscribePrevStoriesRef = null;
    this.unsubscribeJourneyRef = null;
    this.unsubscribeCurrentJourneyRef = null;
  }
  
  componentDidMount () {
    const uid = this.uid
    
    // get list of previous journeys -> stories
    // and filter to stories you can play
    const prevStories = firebaseApp.database().ref('/users/' + uid + '/journeys')    
    const storyRef = firebaseApp.database().ref('/story')
    this.getJourneysAndStories(prevStories, storyRef)
    
    // listen to journey to see if new one is added by yourself
    // possible listen to journey
    const journeyRef = firebaseApp.database().ref('/journey')
    this.getCurrentJourney(journeyRef)
  }
  
  componentWillUnmount () {
    if (this.unsubscribePrevStoriesRef) 
      this.unsubscribePrevStoriesRef();
    if (this.unsubscribeJourneyRef) 
      this.unsubscribeJourneyRef();
    // if (this.unsubscribeCurrentJourneyRef) 
      // this.unsubscribeCurrentJourneyRef();
  }
  
  getJourneysAndStories (journeyRef, storyRef) {
    this.unsubscribePrevStoriesRef = journeyRef.on('value', snap => {
      const journeys = snap.val() || {} // can be null or false
      
      // get list of all stories
      storyRef
        .once('value')
        .then(snap => snap.val())
        .then(stories => this.props.fetchStories(stories, journeys))
        .catch(err => console.log('ERROR IN STORIES.getJourneysAndStories', err))
    })
  }
  
  getCurrentJourney (journeyRef) {
    const uid = this.uid
    
    this.unsubscribeJourneyRef = journeyRef.on('child_added', (snap, _) => {
      const journey = snap.val(), 
            jid = snap.key;
      
      //
      // CODEREVIEW TODO: what is best way to unsubscribe 
      // this next listener when done?
      // I don't understand when componentWillUnmount happens
      //

      // if you added the newest journey to /journey send to redux
      // this listener runs TWICE
      // is it because of the transaction? 
      // How do I fix the transaction running twice in StoryScreen?
      if (jid && !jid.indexOf(uid)) {
        console.log('STORIES STORIES STORIES listening to current journey', jid)
        const curRef = firebaseApp.database().ref('/journey/' + jid)
        this.unsubscribeCurrentJourneyRef = curRef
          .on('value', csnap => {
            const cur = csnap.val()
            
            console.log('STORIES STORIES STORIES listener ran', jid, cur)
            this.props.fetchJourney(jid, cur)
          })
      }
    })
  }
  
  render () { return ( <ChooseStoryStack /> ) }
}

const mapState = state => ({})
const mapDispatch = {
  fetchStories,
  fetchJourney
}
export default connect(mapState, mapDispatch)(Stories)