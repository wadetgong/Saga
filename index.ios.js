import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import App from './App/React/App'
import firebaseApp from './App/Firebase'

console.log('FirebaseApp Connected\n', firebaseApp)

// register app
AppRegistry.registerComponent('TestIgniteApp', () => App)
