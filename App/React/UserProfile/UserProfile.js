import React from 'react'
import { connect } from 'react-redux'
import { TabNavigator } from 'react-navigation'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import firebaseApp from '../../Firebase'

import { Images, Colors } from '../../Themes'
import styles from './Styles/UserProfileStyles'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import { setSelf } from '../../Redux/FriendsRedux'
import { fetchJourney } from '../../Redux/StoriesRedux'

import ViewFriends from './ViewFriends'
import UserJourneys from './UserJourneys'


const UserProfileStack = TabNavigator({
  UserJourneys: {
    screen: ({ screenProps, navigation }) => <UserJourneys
      screenProps={screenProps}
      navigation={navigation}
    />,
    navigationOptions: {
      tabBarLabel: 'My Stories',
      tabBarIcon: ({ tintColor }) => (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Icon name='book-open' size={20} color={tintColor} style={{paddingHorizontal: 5}}/><Text style={{color: tintColor}}>Stories</Text>
      </View>),
    }
  },
  ViewFriends: {
    screen: ViewFriends,
    navigationOptions: {
      tabBarLabel: 'My Friends',
      tabBarIcon: ({ tintColor }) => (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Icon name='people' size={20} color={tintColor} style={{paddingHorizontal: 5}}/><Text style={{color: tintColor}}>Friends</Text>
      </View>),
    }
  },
}, {
  initialRouteName: 'UserJourneys',
  tabBarPosition: 'top',
  tabBarOptions: {
    tintColor: Colors.tintColor,
    activeBackgroundColor: 'white',
    showLabel: false
  }
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
      let user = snap.val()
      this.props.setUser(user)
      if(user.journeys && user.journeys.current) {
        firebaseApp.database().ref(`/journey/${Object.keys(user.journeys.current)[0]}`)
          .once('value', journey => {
            let journeyData = journey.val()
            if(journeyData && journeyData.status && journeyData.status.text === 'active') {
              this.props.fetchJourney(journeyData.id, journeyData)
            }
        })
      }
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
        <UserProfileStack screenProps={this.props.screenProps}/>
      </View>
    )
  }
}

const mapState = state => ({
  user: state.friends.user
})
const mapDispatch = dispatch => ({
  setUser: (user) => dispatch(setSelf(user)),  // definitely should try do elsewhere
  fetchJourney: (jid, journey) => dispatch(fetchJourney(jid, journey)),
})

export default connect(mapState, mapDispatch)(UserProfile)
