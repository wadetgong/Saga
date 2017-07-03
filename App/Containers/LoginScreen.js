import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import styles from './Styles/LoginScreenStyles'
import {Images, Metrics} from '../Themes'
import RoundedButton from '../Components/Button/RoundedButton'
import LoginActions from '../Redux/LoginRedux'
import RootContainer from './RootContainer'
import { NavigationActions } from 'react-navigation'


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
    if (this.unsubscribeAuth) this.unsubscribeAuth();
  }

  login = () => {
    LoginManager
      .logInWithReadPermissions(['public_profile', 'email', 'user_friends'])
      .then(result => {
        if (result.isCancelled) return Promise.resolve('cancelled');
        console.log(`Permissions: ${result.grantedPermissions.toString()}`);
        return AccessToken.getCurrentAccessToken(); // get the access token
      })
      .then(data => {
        // create a new firebase credential with the token
        const credential = firebase.auth
          .FacebookAuthProvider.credential(data.accessToken);
        console.log('FB Oauth data!', data)
        // login with credential
        return firebase.auth().signInWithCredential(credential);
      })
      .then(currentUser => {
        if (currentUser === 'cancelled') console.log('Login cancelled');
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
      .catch(error => console.log(`Login fail with error: ${error}`));
  }

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
