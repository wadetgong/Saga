import * as firebase from 'firebase'
import secrets from '../../secrets'

const firebaseConfig = {
  apiKey: secrets.ios_apiKey,
  authDomain: secrets.ios_authDomain,
  databaseURL: secrets.ios_databaseURL,
  storageBucket: secrets.ios_storageBucket
}
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp
