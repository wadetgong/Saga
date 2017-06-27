import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import styles from './Styles/LoginScreenStyles'
import {Images, Metrics} from '../Themes'
import RoundedButton from '../Components/Button/RoundedButton'
import LoginActions from '../Redux/LoginRedux'

import { 
  LoginButton, AccessToken, LoginManager, 
  GraphRequest, GraphRequestManager 
} from 'react-native-fbsdk';
import firebaseApp from '../Firebase'
import * as firebase from 'firebase';

class LoginScreen extends React.Component {
  constructor () {
    super()
    
    this.state = {}
    
    this.unsubscribeAuth = null;
    this.unsubscribeDBUser = null;
  }
  
  componentDidMount () {
    this.unsubscribeAuth = firebase.auth().onAuthStateChanged(user => {
      // User is signed in.
      if (user) {
        // what do I do here?
      }
    });
    
    // this.unsubscribeDBUser = firebaseApp.aut.ref()
  }
  
  componentWillUnmount () {
    if (this.unsubscribeAuth) this.unsubscribeAuth();
    if (this.unsubscribeDBUser) this.unsubscribeDBUser()
  }
  
  login = () => {
    LoginManager
      .logInWithReadPermissions(['public_profile', 'email', 'user_friends'])
      .then(result => {
        if (result.isCancelled) return Promise.resolve('cancelled'); 
        console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
        return AccessToken.getCurrentAccessToken(); // get the access token
      })
      .then(data => {
        // create a new firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
        
        console.log('data!', data)
        
        return firebase.auth().signInWithCredential(credential); // login with credential
      })
      .then(currentUser => {
        if (currentUser === 'cancelled') console.log('Login cancelled');
        else {
          console.warn(JSON.stringify(currentUser.toJSON())); // signed in!
          this.props.navigation.navigate('StoryScreen')
          
          // firebaseApp
        }
      })
      .catch(error => console.log(`Login fail with error: ${error}`));
  }
  
  init
  
  render () {
    
    return (
      <View>
      <RoundedButton onPress={() => this.login()}>
        Login with Facebook
      </RoundedButton>
      </View>
    )
  }
}

export default LoginScreen