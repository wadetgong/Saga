import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import App from './App/Containers/App'
import firebaseApp from './App/Firebase'


console.log('FirebaseApp', firebaseApp)

// register app
AppRegistry.registerComponent('TestIgniteApp', () => App)
