import React from 'react'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import StoryScreen from '../Containers/StoryScreen'
import StoryPreview from '../Containers/StoryPreview'
import JourneyFriends from '../Containers/JourneyFriends'
import TeamScreen from '../Containers/TeamScreen'
import firebaseApp from '../Firebase'
import { fetchStories } from '../Redux/StoriesRedux'

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
  }
  
  componentDidMount () {
    const uid = this.uid
    
    // get list of previous journeys -> stories
    // and filter to stories you can play
    const prevStories = firebaseApp.database().ref('/users/' + uid + '/journeys')    
    const storyRef = firebaseApp.database().ref('/story')
    this.getJourneysAndStories(prevStories, storyRef)
  }
  
  componentWillUnmount () {
    if (this.unsubscribePrevStoriesRef) this.unsubscribePrevStoriesRef()
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
  
  render () {
    return (
      <ChooseStoryStack />
    )
  }
}

const mapState = state => ({})
const mapDispatch = {
  fetchStories
}

export default connect(mapState, mapDispatch)(Stories)