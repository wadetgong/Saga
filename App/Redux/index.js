import { combineReducers } from 'redux'
import configureStore from './CreateStore'
// import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    friends: require('./FriendsRedux').reducer,
    stories: require('./StoriesRedux').reducer,
    augmented: require('./AugmentedRedux').reducer,
    geoLocation: require('./GeolocationRedux').reducer,
  })

  return configureStore(rootReducer)
}
