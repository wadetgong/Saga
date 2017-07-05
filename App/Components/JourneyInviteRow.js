import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Images, Fonts, Colors } from '../Themes'
import firebaseApp from '../Firebase'

import styles from './Styles/JourneyInviteRowStyles'

class JourneyInviteRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessage: '',
      picUrl: 'https://firebasestorage.googleapis.com/v0/b/breach-5ea6b.appspot.com/o/no-image-avail.png?alt=media&token=2cb55c5a-1676-4400-8e1c-00960387de64' //No image image
    }
    this.uid = firebaseApp.auth().currentUser.uid
    this.journeyRef = firebaseApp.database().ref('/journey/' + this.props.journey)
  }

  componentDidMount() {
    if(this.props.journey) this.listenForChange(this.journeyRef)
  }

  componentWillUnmount () {
    if(this.props.journey) this.journeyRef.off('value', this.unsubscribe)
  }

  listenForChange(ref) {
    this.unsubscribe = ref.on('value', journey => {
      let journeyObj = journey.val()
      firebaseApp.database().ref('/photos/story/' + journeyObj.story.id).once('value', pic => {
        this.setState({
          journey: journeyObj,
          picUrl: pic.val()
        })
      })
    })
  }

  joinTeam(journeyId) {
    const uid = this.uid,
          path1 = `/journey/${journeyId}/team/list/${uid}`
          path2 = `/journey/${journeyId}/team/pending/${uid}`
          path3 = `/users/${uid}/journeys/current/${journeyId}`
          path4 = `/users/${uid}/journeys/pending/${journeyId}`



    firebaseApp.database().ref(`/users/${uid}/journeys/current`).once('value', current => {
      if(current.val()){
        // this.setState({
        //   errorMessage: "You cannot join a story when you have a current story already."
        // })
        alert("You cannot join a story when you have a current story already.")
      }else {
        firebaseApp.database().ref('/').update({
          [path1] : true,
          [path2] : null,
          [path3] : this.state.journey.story.id,
          [path4] : null,
        });
      }
    })
  }

  declineTeam(journeyId) {
    const uid = this.uid,
          path1 = `/journey/${journeyId}/team/pending/${uid}`
          path2 = `/users/${uid}/journeys/pending/${journeyId}`
    firebaseApp.database().ref('/').update({
      [path1] : null,
      [path2] : null,
    });
  }
  render () {
    const journey = this.state.journey
    return (
        <View style={styles.rowContainer}>
          {
            journey
            ? (
               <View style={{flexDirection: 'row', flex: 1}}>
                <View style={{padding: 5}}>
                  <TouchableOpacity onPress={() => {}}>
                 <Image
                    style={{width: 75, height: 75}}
                    source={{uri: this.state.picUrl}}
                  />
                  </TouchableOpacity>
                </View>
                <View style={{padding: 5, flex: 1}}>
                    <Text>Story: {journey.story.title}</Text>
                    <Text>Invited by: {journey.creator.name}</Text>
                    <View style={styles.rowContainer}>
                      <View style={styles.buttonCol}>
                        <TouchableOpacity
                        onPress={() => this.joinTeam(this.props.journey)}
                        style={styles.confirmButton}
                        >
                          <Text style={styles.buttonText}>Join Story</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.buttonCol}>
                        <TouchableOpacity
                        onPress={() => {this.declineTeam(this.props.journey)}}
                        style={styles.declineButton}
                        >
                          <Text style={styles.buttonText}>Decline</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                </View>
              </View>
            )
            : null
          }
        </View>
    )
  }

}
export default JourneyInviteRow
