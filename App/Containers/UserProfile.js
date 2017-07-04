import React from 'react'
import { TabNavigator } from 'react-navigation'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import API from '../Services/FixtureApi'

import ViewFriends from './ViewFriends'
import UserJourneys from './UserJourneys'


import styles from './Styles/UserProfileStyles'
import { Colors } from '../Themes'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import { connect } from 'react-redux'
import { setSelf } from '../Redux/FriendsRedux'
import firebaseApp from '../Firebase'


const UserProfileStack = TabNavigator({
  UserJourneys: {
    screen: UserJourneys,
    navigationOptions: {
      tabBarLabel: 'My Stories',
      tabBarIcon: ({ tintColor }) => (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Icon name='book-open' size={20} color={tintColor} style={{paddingHorizontal: 5}}/><Text style={{color: tintColor}}>Stories</Text>
      </View>),
    },
  },
  ViewFriends: {
    screen: ViewFriends,
    navigationOptions: {
      tabBarLabel: 'My Friends',
      tabBarIcon: ({ tintColor }) => (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Icon name='people' size={20} color={tintColor} style={{paddingHorizontal: 5}}/><Text style={{color: tintColor}}>Friends</Text>
      </View>),
    },
  },
}, {
  initialRouteName: 'UserJourneys',
  tabBarPosition: 'top',
  tabBarOptions: {
    tintColor: Colors.tintColor,
    activeBackgroundColor: 'white',
    showLabel: false
  },
})


class UserProfile extends React.Component {
  constructor() {
    super()
    this.uid = firebaseApp.auth().currentUser.uid
    this.userRef = firebaseApp.database().ref('/users/' + this.uid)
  }

  componentDidMount () {
    this.listenForItems(this.userRef)
  }

  componentWillUnmount () {
    this.userRef.off('value', this.unsubscribe)
  }

  listenForItems(ref) {
    // get stories
    this.unsubscribe = ref.on('value', (snap) => {
      this.props.setUser(snap.val())
    })
  }

  render() {
    const { user } = this.props
    
    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.boldLabel}>My Account</Text>
        </View>
        {
          user
          ? (
              <View style={styles.profileSection}>
                <View style={styles.pictureContainer}>
                  <Image
                    source={{uri: user.profilePicture}}
                    style={{width: 100, height: 100}}
                  />
                </View>
                <View style={styles.userDetailsSection}>
                  <Text style={{fontWeight: 'bold'}}><Icon name='user' style={styles.icon}/> {user.name}</Text>
                  <Text style={{fontSize: 12}}><Icon name='envelope' style={styles.icon}/> {user.email}</Text>
                    <TouchableOpacity
                      onPress={() => {this.props.navigation.navigate('Login')}}
                      style={styles.logoutButton}
                    >
                      <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
              </View>
          )
          : null
        }
        <UserProfileStack />
      </View>
    )
  }
}

const mapState = state => ({
  user: state.friends.user
})
const mapDispatch = dispatch => ({
  setUser: (user) => dispatch(setSelf(user))  // definitely should try do elsewhere
})

export default connect(mapState, mapDispatch)(UserProfile)
