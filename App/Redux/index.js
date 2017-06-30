import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import augmented from './reducers/augmented';
import geoLocation from './reducers/geoLocation';
import currentStory from './reducers/currentStory';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    github: require('./GithubRedux').reducer,
    login: require('./LoginRedux').reducer,
    search: require('./SearchRedux').reducer,
    friends: require('./FriendsRedux').reducer,
    augmented,
    geoLocation,
    currentStory
  })

  return configureStore(rootReducer, rootSaga)
}
