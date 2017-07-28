import React from 'react'
import { View, Text, ScrollView, ListView } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import RoundedButton from '../Components/Button/RoundedButton'
import FriendTile from '../Components/FriendTile'
import CancelJourneyFriend from '../Components/CancelJourneyFriend'

import { fetchJourney } from '../../Redux/StoriesRedux'

import { Colors, Metrics } from '../../Themes'

import firebaseApp from '../../Firebase'
import * as firebase from 'firebase'
import styles from './Styles/TeamScreenStyles'

// const TeamScreen = ({ teamList, friends, uid, navigation, user, screenProps }) => {

class TeamScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      journey: {},
    }
    this.journeyRef = firebaseApp.database().ref('/journey/' + this.props.jid + '/team/')
    this.joinedFriends = new ListView.DataSource({rowHasChanged : (r1, r2) => r1 != r2}),
    this.pendingFriends = new ListView.DataSource({rowHasChanged : (r1, r2) => r1 != r2})
    this.removeFriendFromTeam = this.removeFriendFromTeam.bind(this)
  }
  componentDidMount () { this.listenForChange(this.journeyRef) }
  componentWillUnmount () { this.journeyRef.off('value', this.unsubscribe) }

  listenForChange (ref) {
    this.unsubscribe = ref.on('value', journey => {
      this.setState({ journey: journey.val() })
    })
  }

  removeFriendFromTeam (fid) {
    console.log('fid in removeFriendFromTeam', fid)
    // remove friend from team
    const { jid } = this.props,
          path1 = '/users/' + fid + '/journeys/pending/' + jid,
          path2 = '/journey/' + jid + '/team/pending/' + fid;
    firebaseApp.database().ref('/').update({
      [path1] : null, [path2] : null
    })

    console.log('JourneyFriends.addFriendToTeam', path1, path2, true)
  }

  render() {

    const { teamList, friends, uid, navigation, user, screenProps } = this.props
    const pending = []
    const list = []
    for (let key in teamList) {
      switch (teamList[key]) {
        case 'pending':
          if(key === uid) pending.push(user)
          else pending.push(friends[key])
          break;
        case 'list':
          if(key === uid) list.push(user)
          else list.push(friends[key])
          break;
        default:
          console.error('TEAMSCREEN ERROR - teamList not cool. Possible error in StoriesRedux or in firebase')
      }
    }

    const joinList = this.joinedFriends.cloneWithRows(list)
    const pendList = this.pendingFriends.cloneWithRows(pending)

    //working
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'StoryScreen'})
      ]
    })

    console.log('pending in teamscreen', pending)

    return (
      <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.boldLabel}>Your Team:</Text>
      </View>
      <ScrollView style={{paddingHorizontal: 10}}>
        <View style={styles.joinedSection}>
          <Text style={styles.groupLabel}>
            <Text style={{fontWeight: 'bold',}}>Joined</Text> ({list.length})
          </Text>
        </View>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={joinList}
          removeClippedSubviews={false}
          enableEmptySections={true}
          renderRow={(user) => <FriendTile user={user} />}
        />

        <View style={styles.invitedSection}>
          <Text style={styles.groupLabel}>
            <Text style={{fontWeight: 'bold'}}>Invited</Text> ({pending.length})
          </Text>
        </View>
        <ListView
          dataSource={pendList}
          removeClippedSubviews={false}
          enableEmptySections={true}
          renderRow={(user) => <CancelJourneyFriend
            user={user}
            removeFriendFromTeam = {this.removeFriendFromTeam}
          />}
        />
      </ScrollView>
      <RoundedButton onPress={() => {
        navigation.dispatch(resetAction)
        pending.forEach(user => {
          this.removeFriendFromTeam(user.id)
        })

        const currentTime = firebase.database.ServerValue.TIMESTAMP
        firebaseApp.database().ref('/journey/' + this.props.jid).update({
          ['status/text']: 'active',
          ['times/start']: currentTime,
        })
        // this.props.fetchJourney(this.props.jid, this.props.current)
        screenProps.rootNavigation.navigate('CurrentStory')
      }}>
        begin journey
      </RoundedButton>
      </View>
    )


  }
}

const mapState = state => ({
  user: state.friends.user,
  uid : state.friends.uid,
  teamList : state.stories.teamList,
  friends : state.friends.myFriendsList,
  jid: state.stories.jid,
  // current: state.stories.current,
})

const mapDispatch = dispatch => ({
  // fetchJourney: (jid, journey) => {dispatch(fetchJourney(jid, journey))}
})
export default connect(mapState, mapDispatch)(TeamScreen)
