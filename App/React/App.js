import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React from 'react'
import { Provider } from 'react-redux'
import createStore from '../Redux'
import RootContainer from './RootContainer'

// create our store
export const store = createStore()

/**
 * Provides an entry point into our application.
 * Both index.ios.js and index.android.js
 * call this component first.
 *
 * Create our Redux store, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
