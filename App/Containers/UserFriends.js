import React from 'react'
import { TabNavigator } from 'react-navigation'
import { View, Text, Image } from 'react-native'
import { Images } from '../Themes'

import { connect } from 'react-redux'
import { setMyFriendsAndUsers } from '../Redux/FriendsRedux'

import FindFriends from './FindFriends'
import PendingFriends from './PendingFriends'

import styles from './Styles/UserFriendsStyles'
import { Colors } from '../Themes'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import firebaseApp from '../Firebase'


// not sure the filtering works yet since there's still no friends

const FriendStack = TabNavigator({
  FindFriends: {
    screen: FindFriends,
    navigationOptions: {
      tabBarLabel: 'Find Friends',
      tabBarIcon: ({ tintColor }) => (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
      <Icon name='magnifier-add' size={20} color={tintColor} style={{paddingHorizontal: 5}}/><Text style={{color: tintColor}}>Find Friends</Text>
      </View>),
    },
  },
  PendingFriends: {
    screen: PendingFriends,
    navigationOptions: {
      tabBarLabel: 'Pending Requests',
      tabBarIcon: ({ tintColor }) => (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Icon name='user-follow' size={20} color={tintColor} style={{paddingRight: 5}}/><Text style={{color: tintColor}}>Pending Requests</Text>
      </View>),
    },
  },
  // ViewFriends: {
  //   screen: ViewFriends,
  //   navigationOptions: {
  //     tabBarLabel: 'My Friends',
  //     tabBarIcon: ({ tintColor }) => (
  //     <Icon name='people' size={20} color={tintColor} />),
  //   },
  // },
}, {
  initialRouteName: 'FindFriends',
  tabBarPosition: 'top',
  tabBarOptions: {
    tintColor: Colors.tintColor,
    activeBackgroundColor: 'white',
    showLabel: false
  },
})


// currently hardcoding the uid pretending we are already logged in :D :D
// tabnavigator renders UserProfile before user is logged in
// as we have it on all pages
// when we reorder the tabnavigator undo this hardcode

class UserProfile extends React.Component {
  constructor() {
    super()
    // unsubscribing
    this.unsubscribeMyFriendsRef = null
    this.unsubscribeUsers = null

    this.uid = firebaseApp.auth().currentUser.uid
  }

  componentDidMount () {
    const uid = this.uid

    const myFriendsRef = firebaseApp.database().ref('/users/' + uid + '/friends/')
    const usersRef = firebaseApp.database().ref('/users')
    this.getMyFriendsAndUsers(myFriendsRef, usersRef)
  }

  componentWillUnmount () {
    if (this.unsubscribeMyFriendsRef) this.unsubscribeMyFriendsRef();
    if (this.unsubscribeUsers) this.unsubscribeUsers();
  }

  // listener on my friends
  getMyFriendsAndUsers (myFriendsRef, usersRef) {
    const uid = this.uid
    
    // get myFriends
    this.unsubscribeMyFriendsRef = myFriendsRef
      .on('value', fsnap => {
        const myFriends = fsnap.val();
        if (!myFriends) console.log('fsnap', fsnap, fsnap.val())
        // get users
        usersRef // return
          .once('value')
          .then(usnap => usnap.val())
          .then(users => this.props.setMyFriendsAndUsers(uid, myFriends, users))
          .catch(err => console.log('ERROR USERFRIENDS.getMyFriendsAndUsers', err))
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.boldLabel}>Add Friends</Text>
        </View>
        <View style={{flex:1}}>
          <FriendStack/>
        </View>
      </View>
    )
  }

}

const mapState = state => ({})
const mapDispatch = {
  setMyFriendsAndUsers
}

export default connect(mapState, mapDispatch)(UserProfile)

