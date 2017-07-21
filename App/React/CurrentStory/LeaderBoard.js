import React from 'react'
import { View, Text, Image, ScrollView, ListView } from 'react-native'
import { connect } from 'react-redux'
import firebaseApp from '../../Firebase'
import { Images, Metrics, Colors } from '../../Themes'
import RoundedButton from '../Components/Button/RoundedButton'
import TeamListRow from '../Components/TeamListRow'

import styles from './Styles/LeaderBoardStyles'

import { removeJourney } from '../../Redux/StoriesRedux'
import { NavigationActions } from 'react-navigation'

const LeaderBoard = ({ current, journeyImage, navigation}) => {
  const friendsList = (current && current.team && current.team.list) || []
  const startTime = current.times ? current.times.start : 0
  const endTime = current.times ? current.times.end : 0
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

  // const resetAction = NavigationActions.reset({
  //   index: 0,
  //   actions: [
  //     NavigationActions.navigate({ routeName: 'Chapter'})
  //   ]
  // })


  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.imageHeaderSection} source={{uri: journeyImage}}>
          <View style={styles.headerTitleSection}>
            <Text style={styles.sectionTitle}>{current.story && current.story.title}: Leaderboard</Text>
          </View>

        </Image>
      </View>
      <View style={styles.leaderBoardSection}>
        <View style={styles.leaderBoardHeader}>
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
              let currentStory = current;
              console.log(Object.keys(currentStory.team.list))
              Object.keys(currentStory.team.list).forEach(user => {
                paths[`/users/${user}/journeys/current`] = null
                paths[`/users/${user}/journeys/completed/${currentStory.id}`] = currentStory.story.id
              })
              paths[`/journey/${currentStory.id}/status/text`] = 'Complete'
              firebaseApp.database().ref('/').update(paths)

              // navigation.dispatch(resetAction)
              navigation.navigate('UserProfile')
              removeJourney()
          }}
        />
      </View>
    </View>
  )
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
    current: state.stories.current,
    journeyImage: state.stories.journeyImage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeJourney: () => dispatch(removeJourney()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard)
