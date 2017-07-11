import React from 'react'
import { View, Text, Image, ScrollView, ListView } from 'react-native'
import { connect } from 'react-redux'
import firebaseApp from '../Firebase'
import { Images, Metrics, Colors } from '../Themes'
import RoundedButton from '../Components/Button/RoundedButton'
import TeamListRow from '../Components/TeamListRow'

import styles from './Styles/JourneySummaryStyles'

import { removeJourney } from '../Redux/StoriesRedux'
import { NavigationActions } from 'react-navigation'

class LeaderBoard extends React.Component {
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
    const startTime = this.props.current.times ? this.props.current.times.start : 0
    const endTime = this.props.current.times ? this.props.current.times.end : 0
    const timeDif = new Date(endTime - startTime)
    const timeStr = msToTime(timeDif)

    let teams = [ {
      time: timeDif,
      team: friendsList
    }, {
      time: 7618080,
      team: {
        hurlabob: true,
        wadetgong: true,
        jacobss: true
      }
    }, {
      time: 8841580,
      team: {
        ben: true,
        snowwhite: true,
        connie: true,
        ehacinom: true
      }
    }, {
      time: 13841580,
      team: {
        rob: true,
        nick: true,
      }
    }, {
      time: 6841580,
      team: {
        gehrj: true,
        jake: true,
      }
    }]

    teams = teams.sort((a, b) => (a.time > b.time))
    console.log(teams)

    let teamList = teams && new ListView
      .DataSource({rowHasChanged : (r1, r2) => r1 != r2})
      .cloneWithRows(teams)
    return (
      <View style={{
        flex: 1,
        backgroundColor: Colors.background
      }}>
        <View>
          <Image
            style={{
            marginTop: 20,
            height: 200,
            width: '100%',
            opacity: 0.75,
            top: 0,
          }}
            source={{uri: this.state.picUrl}}>
            <View style={{
              padding: Metrics.baseMargin,
              width: Metrics.screenWidth,
              alignSelf: 'center',
              margin: Metrics.baseMargin,
              backgroundColor: Colors.background,
              position: 'absolute',
              bottom: 0,
              opacity: 0.9
            }}>
              <Text style={{
                fontWeight: 'bold',
                alignSelf: 'center',
                color: Colors.text,
                textAlign: 'center',
              }}>{this.props.current.story && this.props.current.story.title}: Leaderboard</Text>
            </View>

          </Image>
        </View>
        <View style={{flex: 1, marginHorizontal: 15, marginVertical: 15}}>
          <View style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: 'lightgray'}}>
            <View style={{flex: 1, paddingHorizontal: 5}}>
              <Text style={{color: 'gray'}}>#</Text>
            </View>
            <View style={{flex: 4, paddingHorizontal: 5}}>
              <Text style={{color: 'gray'}}>Time</Text>
            </View>
            <View style={{flex: 10, paddingHorizontal: 5}}>
              <Text style={{color: 'gray'}}>Team</Text>
            </View>
          </View>
          <ScrollView style={{marginTop: 5}}>
            <View>
              <ListView
                dataSource={teamList}
                removeClippedSubviews={false}
                enableEmptySections={true}
                renderRow={(team, sectionID, rowID) => <TeamListRow
                  team={team}
                  id={rowID}
                />}
                />
            </View>
          </ScrollView>

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
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard)
