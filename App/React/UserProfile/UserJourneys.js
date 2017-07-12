import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, TouchableOpacity, ListView} from 'react-native'

import JourneyInviteRow from '../Components/JourneyInviteRow'
import CurrentStoryInfo from '../Components/CurrentStoryInfo'

import styles from './Styles/UserJourneysStyles'
import { Colors, Metrics } from '../../Themes'
import firebaseApp from '../../Firebase'
import { setStory } from '../../Redux/actions/currentStory'
import { removeJourney } from '../../Redux/StoriesRedux'

// const UserJourneys = ({ myJourneys, myStoriesList, jid, name, current, screenProps}) => {
class UserJourneys extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      journeys: {}
    }
    this.uid = firebaseApp.auth().currentUser.uid
    this.pendingJourneys = new ListView.DataSource({rowHasChanged : (r1, r2) => r1 != r2})
    this.journeyRef = firebaseApp.database().ref('/users/' + this.uid + '/journeys/')
  }
  componentDidMount () {this.listenForChange(this.journeyRef) }
  componentWillUnmount () {this.journeyRef.off('value', this.unsubscribe) }

  listenForChange (ref) {
    this.unsubscribe = ref.on('value', journeys => {
      let journeysObj = journeys.val()
      this.setState({ journeys: journeysObj })
    })
  }

  listCurrentStory () {
    let userJourneys = this.state.journeys
    if (userJourneys && userJourneys.current) {
      return <CurrentStoryInfo
        key={Object.keys(this.state.journeys.current)[0]}
        journey={Object.keys(this.state.journeys.current)[0]}
        screenProps={this.props.screenProps}
        removeJourney={() => this.props.removeJourney()}
      />
    }
    return (
      <View>
        <Text style={styles.noRequests}>No current story.</Text>
      </View>
    )
  }

  listPendingInvites () {
    if (this.state.journeys && this.state.journeys.pending){
      let pendList = this.pendingJourneys.cloneWithRows(Object.keys(this.state.journeys.pending))
      return (
        <ListView
          dataSource={pendList}
          removeClippedSubviews={false}
          enableEmptySections={true}
          renderRow={(journey) => <JourneyInviteRow journey={journey}/>}
        />
      )
    }
    return (
      <View>
        <Text style={styles.noRequests}>No pending invites.</Text>
      </View>
    )
  }

  render () {
    const { myJourneys, myStoriesList, jid, name, current, screenProps} = this.props
    // journeys are not saved here but the story is, which has the story image
    // I think it would be nice to have the list of stories like the
    // square friend boxes :D but your choice, not a strong preference

    // also current journey is at (jid, name, journey)

    // console.log('myJourneys', myJourneys)
    // console.log('myStoriesList', myStoriesList)

    // const journeyList = {pending: [], completed: [], failed: []}
    // for (let status in myJourneys) {
    //   journeyList[status] = Object.values(myJourneys[status]).map(storyname => myStoriesList[storyname])
    // }

    // // EXAMPLE: use journeyList.pending as an array to send to Listview.DataSource(funct).clonewithRows(journeyList.pending)

    // console.log('journeyList in UserJourneys', journeyList)
    // console.log('current', current)
    const { navigate } = screenProps.rootNavigation

    // let pendList = this.pendingJourneys.cloneWithRows(this.state.journeys.pending)

    return (
      <View style={styles.container}>
        <View style={styles.currentLabel}>
          <Text style={styles.headerText}>Current Story</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          {this.listCurrentStory(this.props.setStory)}
        </View>
        <View style={styles.pendLabel}>
          <Text style={styles.headerText}>Pending Story Invites</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          {this.listPendingInvites()}
        </View>
        {/*<View style={{flex: 1, flexDirection: 'row', padding: 10, backgroundColor: 'green'}}>
          <Text style={styles.boldLabel}>Current Story</Text>
            <TouchableOpacity onPress={() => navigate('CurrentStory')}>
              <Text>Go to my current story</Text>
            </TouchableOpacity>
        </View>*/}
        {/*<View style={{flex: 1, flexDirection: 'row', padding: 10, backgroundColor: 'blue'}}>
          <Text style={styles.boldLabel}>My History</Text>
        </View>*/}
      </View>
    )
  }
}


const mapState = state => ({
  myJourneys: state.stories.myJourneys,
  myStoriesList: state.stories.myStoriesList,
  jid: state.stories.jid,
  name: state.stories.name,
  current: state.stories.current,
  user: state.friends.user

})

const mapDispatch = dispatch => ({
  setStory: journeyId => dispatch(setStory(journeyId)),
  removeJourney: () => dispatch(removeJourney())
})

export default connect(mapState, mapDispatch)(UserJourneys)
