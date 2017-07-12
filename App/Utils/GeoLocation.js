import BackgroundGeolocation from 'react-native-background-geolocation'
import { store } from '../React/App'

export const sendLocation = (location) => {
  let longitude = location.coords.longitude
  let latitude = location.coords.latitude
  console.log('BackgroundGeolocation sending location', longitude, latitude)
  store.dispatch({
    type: 'UPDATE_LOCATION',
    location: { longitude, latitude }
  })
}

export const locationStart = () => {
  console.log('listener added for location changes')
  BackgroundGeolocation.on('location', sendLocation)
  BackgroundGeolocation.configure({
    // Geolocation Config
    desiredAccuracy: 0,
    stationaryRadius: 0,
    distanceFilter: 0,
    // Activity Recognition
    stopTimeout: 1,
    // Application config
    debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
    logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
    stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
    startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
    locationAuthorizationRequest: 'Always'
    // HTTP / SQLite config
    // url: 'http://yourserver.com/locations',
    // batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
    // autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
    // headers: {              // <-- Optional HTTP headers
    //   "X-FOO": "bar"
    // },
    // params: {               // <-- Optional HTTP params
    //   "auth_token": "maybe_your_server_authenticates_via_token_YES?"
    // }
  }, function () {
    console.log('BackgroundGeolocation is configured and ready.')
    BackgroundGeolocation.start()
  })
}

export const locationStop = () => {
  // Remove BackgroundGeolocation listeners
  BackgroundGeolocation.un('location', sendLocation)
}
