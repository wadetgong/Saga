import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/LoginScreenStyles'
import { Images, Metrics } from '../Themes'
import RoundedButton from './Components/Button/RoundedButton'
import RootContainer from './RootContainer'
import { NavigationActions } from 'react-navigation'

import {
  LoginButton, AccessToken, LoginManager,
  GraphRequest, GraphRequestManager
} from 'react-native-fbsdk'
import firebaseApp from '../Firebase'
import * as firebase from 'firebase'
import Video from 'react-native-video'

import {Colors} from '../Themes'

class LoginScreen extends React.Component {
  constructor () {
    super()
    this.state = {}
    this.unsubscribeAuth = null;
  }

  componentDidMount () {
    this.unsubscribeAuth = firebase.auth().onAuthStateChanged(user => {
      // User is signed in.
      if (user) {
        // what do I do here?
      }
    });
  }

  componentWillUnmount () {
    if (this.unsubscribeAuth) this.unsubscribeAuth()
  }

  login = () => {
    LoginManager
      .logInWithReadPermissions(['public_profile', 'email', 'user_friends'])
      .then(result => {
        if (result.isCancelled) return Promise.resolve('cancelled')
        console.log(`Permissions: ${result.grantedPermissions.toString()}`)
        return AccessToken.getCurrentAccessToken(); // get the access token
      })
      .then(data => {
        // create a new firebase credential with the token
        const credential = firebase.auth
          .FacebookAuthProvider.credential(data.accessToken)
        console.log('FB Oauth data!', data)
        // login with credential
        return firebase.auth().signInWithCredential(credential)
      })
      .then(currentUser => {
        if (currentUser === 'cancelled') console.log('Login cancelled')
        else {
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'TabNav'})
            ]
          })
          this.props.navigation.dispatch(resetAction)
        }
      })
      .catch(error => console.log(`Login fail with error: ${error}`))
  }

  render () {
    //LaoSangamMN
    //Avenir
    //OriyaSangamMN
    //TamilSangamMN
    return (
      <View style={styles.container}>
        <Image
          source={require('../Images/citybackground.gif')}
          resizeMode={"stretch"}
          style={styles.video}
        />
        <View style={styles.videoContainer}>
          <View style={styles.titleSection}>
            <Text style={{fontSize: 48, fontWeight: '500', color: 'white', fontFamily: 'Avenir'}}>SAGA</Text>
            <Text style={{fontSize: 20, fontStyle: 'italic', color: 'white', fontFamily: 'Avenir', marginTop: -10}}>Explore your city - save the day.</Text>
          </View>
          <View style={styles.loginSection}>
            <View style={{width: '100%', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.login()}>
                <View style={{borderRadius: 100, height: 40, width: '80%', backgroundColor: '#3b5998', alignItems: 'center', justifyContent: 'center', width: '66.6%'}}>
                  <Text style={{color: 'white', fontFamily: 'Avenir', fontWeight: 'bold'}}>LOGIN WITH FACEBOOK</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={{fontSize: 12}}>Made with ♡ at Fullstack Academy</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default LoginScreen
