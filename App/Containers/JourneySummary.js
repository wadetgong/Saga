import React from 'react'
import { View, Text, Image, ScrollView, ListView } from 'react-native'
import { connect } from 'react-redux'
import firebaseApp from '../Firebase'
import { Images } from '../Themes'
import RoundedButton from '../Components/Button/RoundedButton'
import FriendTeamTile from '../Components/FriendTeamTile'

import styles from './Styles/JourneySummaryStyles'


import { removeJourney } from '../Redux/StoriesRedux'
import { NavigationActions } from 'react-navigation'

class JourneySummary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      journey: {},
      picUrl: 'https://firebasestorage.googleapis.com/v0/b/breach-5ea6b.appspot.com/o/no-image-avail.png?alt=media&token=2cb55c5a-1676-4400-8e1c-00960387de64' //No image image
    }
    this.journeyRef = firebaseApp.database().ref(this.props.journeyUrl)
  }

  componentDidMount() {
    if(this.props.journeyUrl) this.listenForChange(this.journeyRef)
  }

  componentWillUnmount () {
    if(this.props.journeyUrl) this.journeyRef.off('value', this.unsubscribe)
  }

  listenForChange(ref) {
    this.unsubscribe = ref.on('value', journey => {
      let journeyObj = journey.val()
      if(journeyObj) {
        firebaseApp.database().ref('/photos/story/' + journeyObj.story.id).once('value', pic => {
          this.setState({
            journey: journeyObj,
            picUrl: pic.val()
          })
        })
      }
    })
  }

  render() {
    const friendsList = (this.state.journey && this.state.journey.team && this.state.journey.team.list) || []
    console.log(friendsList, 'friendlist')

    console.log('this.props in JourneySummary', this.props)
    const startTime = this.props.current.times ? this.props.current.times.start : 0
    const endTime = this.props.current.times ? this.props.current.times.end : 0
    const timeDif = new Date(endTime - startTime)
    const timeStr = msToTime(timeDif)

    // const resetAction = NavigationActions.reset({
    //   index: 0,
    //   actions: [
    //     NavigationActions.navigate({ routeName: 'Chapter'})
    //   ]
    // })


    let friendsSource = friendsList && new ListView
      .DataSource({rowHasChanged : (r1, r2) => r1 != r2})
      .cloneWithRows(Object.keys(friendsList))
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imageHeaderSection}>
            <Image
              style={styles.storyBG}
              source={{uri: this.state.picUrl}}>
              <View style={styles.sectionHeader}>
                <Text style={styles.boldLabel}>Journey Conclusion</Text>
              </View>
            </Image>
            <Image
              style={styles.passImage}
              source={Images.passStamp}
            />
          </View>
          <View>
            <Text style={styles.timeSection}>Your final time: {timeStr}</Text>
          </View>
          <View style={styles.conclusionDesc}>
            <Text style={{fontStyle: 'italic'}}>
              Story conclusion text here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna arcu, fermentum id elementum quis, blandit sit amet nisi. Donec mi odio, vestibulum in nunc sed, scelerisque tristique turpis. Integer a ante lobortis, porttitor mauris sit amet, pulvinar ligula. Sed convallis ut ante sit amet lacinia.
            </Text>
          </View>
          <View style={styles.teammateSection}>
            <Text style={styles.teammateText}>Teammates:</Text>
          </View>
          <View style={{marginHorizontal: 15}}>
            <ListView
              contentContainerStyle={styles.friendList}
              dataSource={friendsSource}
              removeClippedSubviews={false}
              enableEmptySections={true}
              renderRow={(user) => <FriendTeamTile user={user}/>}
              />
          </View>
          <RoundedButton
            text="View Stories"
            onPress={() => {
              let paths = {}
              let currentStory = this.props.current;
              console.log(Object.keys(currentStory.team.list))
              Object.keys(currentStory.team.list).forEach(user => {
                paths[`/users/${user}/journeys/current`] = null
                paths[`/users/${user}/journeys/completed/${currentStory.id}`] = currentStory.story.id
              })

              firebaseApp.database().ref('/').update(paths)

              // this.props.navigation.dispatch(resetAction)
              this.props.navigation.navigate('UserProfile')
              this.props.removeJourney()
            }}
          />
        </ScrollView>
      </View>
    )
  }
}

const msToTime = (duration) => {
    var seconds = parseInt((duration/1000)%60)
      , minutes = parseInt((duration/(1000*60))%60)
      , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds;
}

const mapStateToProps = (state) => {
  console.log('state in redux', state)
  return {
    journeyUrl: state.currentStory.journeyUrl,
    current: state.stories.current
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeJourney: () => dispatch(removeJourney())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JourneySummary)
