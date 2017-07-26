import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import firebaseApp from '../../Firebase'
import styles from './Styles/JourneyInviteRowStyles'

import { removeJourney } from '../../Redux/StoriesRedux'

/* global alert */

class JourneyInviteRow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errorMessage: '',
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
      console.log('journey val in JourneyInviteRow', journeyObj)
      if(journeyObj)
        firebaseApp.database().ref('/photos/story/' + journeyObj.story.id)
          .once('value')
          .then(pic => {
            if(pic.val() !== this.state.picUrl) this.setState({ journey: journeyObj, picUrl: pic.val() })
          })
    })
  }

  joinTeam (journeyId) {
    const uid = this.uid
    const path1 = `/journey/${journeyId}/team/list/${uid}`
    const path2 = `/journey/${journeyId}/team/pending/${uid}`
    const path3 = `/users/${uid}/journeys/current/${journeyId}`
    const path4 = `/users/${uid}/journeys/pending/${journeyId}`

    firebaseApp.database().ref(`/users/${uid}/journeys/current`).once('value', current => {
      if (current.val()) {
        alert('You cannot join a story when you have a current story already.')
      } else {
        firebaseApp.database().ref('/').update({
          [path1]: true,
          [path2]: null,
          [path3]: this.state.journey.story.id,
          [path4]: null
        })
      }
    })
  }

  declineTeam (journeyId) {
    const uid = this.uid
    const path1 = `/journey/${journeyId}/team/pending/${uid}`
    const path2 = `/users/${uid}/journeys/pending/${journeyId}`

    this.props.removeJourney()
    console.log('removeJourney called')
    firebaseApp.database().ref('/').update({
      [path1]: null,
      [path2]: null
    })
  }

  render () {
    const journey = this.state.journey
    return (
      <View style={styles.rowContainer}>
        {
          journey
          ? (<View style={{flexDirection: 'row', flex: 1}}>
            <View style={{padding: 5}}>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  style={{width: 75, height: 75}}
                  source={{uri: this.state.picUrl}}
                />
              </TouchableOpacity>
            </View>
            <View style={{padding: 5, flex: 1}}>
              <Text style={{fontWeight: '600', fontSize: 15}}>{journey.story.title}</Text>
              <Text style={{fontSize: 12}}>Invited by: {journey.creator.name}</Text>
              <View style={styles.rowContainer}>
                <View style={styles.buttonCol}>
                  <TouchableOpacity
                    onPress={() => this.joinTeam(this.props.journey)}
                    style={styles.confirmButton}
                  ><Text style={styles.buttonText}>Join Story</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonCol}>
                  <TouchableOpacity
                    onPress={() => this.declineTeam(this.props.journey)}
                    style={styles.declineButton}
                  ><Text style={styles.buttonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>)
          : null
        }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    removeJourney: () => { dispatch(removeJourney()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JourneyInviteRow)

