import { combineReducers } from 'redux'
import configureStore from './CreateStore'
// import rootSaga from '../Sagas/'
import augmented from './reducers/augmented';
import geoLocation from './reducers/geoLocation';
import currentStory from './reducers/currentStory';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    friends: require('./FriendsRedux').reducer,
    stories: require('./StoriesRedux').reducer,
    augmented,
    geoLocation,
    currentStory
  })

  return configureStore(rootReducer)
}
