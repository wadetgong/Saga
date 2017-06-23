import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import App from './App/Containers/App'
import * as firebase from 'firebase'
import secrets from './secrets'


// Initialize Firebase
const firebaseConfig = {
  apiKey: secrets.ios_apiKey,
  authDomain: secrets.ios_authDomain,
  databaseURL: secrets.ios_databaseURL,
  storageBucket: secrets.ios_storageBucket,
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

console.log('index.ios.js firebaseApp\n', firebaseApp)

// register app
AppRegistry.registerComponent('TestIgniteApp', () => App)
