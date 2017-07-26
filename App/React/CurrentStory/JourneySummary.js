import React from 'react'
import { View, Text, Image, ScrollView, ListView } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../../Themes'
import RoundedButton from '../Components/Button/RoundedButton'
import FriendTeamTile from '../Components/FriendTeamTile'

import styles from './Styles/JourneySummaryStyles'

const JourneySummary =({ current, journeyImage, navigation }) => {
  const friendsList = (current && current.team && current.team.list) || []
  console.log(friendsList, 'friendlist')

  const startTime = current.times ? current.times.start : 0
  const endTime = current.times ? current.times.end : 0
  const timeDif = new Date(endTime - startTime)
  const timeStr = msToTime(timeDif)


  const conclusion = current && current.story && current.story.conclusion || ''



  let friendsSource = friendsList && new ListView
    .DataSource({rowHasChanged : (r1, r2) => r1 != r2})
    .cloneWithRows(Object.keys(friendsList))
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageHeaderSection}>
          <Image
            style={styles.storyBG}
            source={{uri: journeyImage}}>
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
            {conclusion}
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
          text="View LeaderBoard"
          onPress={() => { navigation.navigate('LeaderBoard') }}
        />
      </ScrollView>
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
    // journeyUrl: state.currentStory.journeyUrl,
    current: state.stories.current,
    journeyImage: state.stories.journeyImage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JourneySummary)
