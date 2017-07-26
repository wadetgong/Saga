import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import firebaseApp from '../../Firebase'
import styles from './Styles/CurrentStoryInfoStyles'

import { removeJourney } from '../../Redux/StoriesRedux'

class CurrentStoryInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      picUrl: 'https://firebasestorage.googleapis.com/v0/b/breach-5ea6b.appspot.com/o/no-image-avail.png?alt=media&token=2cb55c5a-1676-4400-8e1c-00960387de64' // No image image
    }
    this.uid = firebaseApp.auth().currentUser.uid
    this.journeyRef = firebaseApp.database().ref('/journey/' + this.props.journey)
  }

  componentDidMount () {
    if (this.props.journey) this.listenForChange(this.journeyRef)
  }

  componentWillUnmount () {
    if (this.props.journey) this.journeyRef.off('value', this.unsubscribe)
  }

  listenForChange (ref) {
    this.unsubscribe = ref.on('value', journey => {
      let journeyObj = journey.val()
      if (journeyObj) {
        this.setState({
          journey: journeyObj,
        })
      }
    })
  }

  joinTeam (journeyId) {
    const uid = this.uid
    const path1 = `/journey/${journeyId}/team/list/${uid}`
    const path2 = `/journey/${journeyId}/team/pending/${uid}`
    const path3 = `/users/${uid}/journeys/current/${journeyId}`
    const path4 = `/users/${uid}/journeys/pending/${journeyId}`
    firebaseApp.database().ref('/').update({
      [path1]: true,
      [path2]: null,
      [path3]: this.state.journey.story.id,
      [path4]: null
    })
  }

  declineTeam (journeyId) {
    const uid = this.uid
    const path1 = `/journey/${journeyId}/team/pending/${uid}`
    const path2 = `/users/${uid}/journeys/pending/${journeyId}`
    const path3 = `/users/${uid}/journeys/current/${journeyId}`
    // If you are the host of the story, cancel this story for all users
    this.props.removeJourney()
    console.log('removeJourney called')

    if (this.state.journey.creator.id === uid) {
      this.removeAll(journeyId)
    } else {
      firebaseApp.database().ref('/').update({
        [path1]: true,
        [path2]: this.state.journey.story.id,
        [path3]: null
      })
    }
  }

  removeAll (journeyId) {
    let journeyTeams = this.state.journey.team
    let usersList = [...Object.keys(journeyTeams.list)]
    // empty array is guard in the event that there is no pending on this journey
    let usersPending = (journeyTeams.pending && [...Object.keys(journeyTeams.pending)]) || []
    let updateObj = {}
    let journeyPath = `/journey/${journeyId}`
    usersList.forEach(user => {
      updateObj[`/users/${user}/journeys/current/${journeyId}`] = null
    })
    usersPending.forEach(user => {
      updateObj[`/users/${user}/journeys/pending/${journeyId}`] = null
    })
    updateObj[journeyPath] = null
    firebaseApp.database().ref('/').update(updateObj)
    this.props.removeJourney()
  }

  getActiveInactiveInfo (journey) {
    if (journey.status.text === 'inactive') {
      return (
        <View>
          <Text style={{fontSize: 12}}>Status: Waiting for host to start</Text>
          <View>
            <TouchableOpacity
              onPress={() => this.declineTeam(this.props.journey)}
              style={styles.declineButton}
            >
              <Text style={styles.buttonText}>Cancel Story</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    return (
      <View>
        <Text style={{fontSize: 12}}>Status: Active</Text>
        <View>
          <TouchableOpacity
            onPress={() => this.props.screenProps.rootNavigation.navigate('CurrentStory')}
            style={styles.storyButton}
          >
            <Text style={styles.buttonText}>Go to Story</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render () {
    const journey = this.state.journey
    return (
      <View style={styles.rowContainer}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{padding: 5}}>
            <TouchableOpacity onPress={() => {}}>
              <Image
                style={{width: 75, height: 75}}
                source={{uri: this.props.journeyImage}}
              />
            </TouchableOpacity>
          </View>
          {
            journey
            ? (<View style={{padding: 5, flex: 1}}>
              <Text style={{fontWeight: '600', fontSize: 15}}>
                {journey.story.title}
              </Text>
              {this.getActiveInactiveInfo(journey)}
            </View>)
            : null
          }
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    journeyImage: state.stories.journeyImage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeJourney: () => { dispatch(removeJourney()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentStoryInfo)

