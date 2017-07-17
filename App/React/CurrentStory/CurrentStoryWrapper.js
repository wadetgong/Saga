import React from 'react'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'

import Chapter from './Chapter'
import ChapterDetails from './ChapterDetails'
import JourneySummary from './JourneySummary'
import LeaderBoard from './LeaderBoard'
import PuzzleInfo from './PuzzleInfo'


import firebaseApp from '../../Firebase'
import { fetchStories } from '../../Redux/StoriesRedux'
const CurrentStoryStack = StackNavigator({
  Chapter: { screen: Chapter },
  ChapterDetails: { screen: ChapterDetails },
  JourneySummary: { screen: JourneySummary },
  LeaderBoard: { screen: LeaderBoard },
  PuzzleInfo: { screen: PuzzleInfo },

}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'StoryScreen'
})

class CurrentStoryWrapper extends React.Component {
  constructor() {
    super()
    this.uid = firebaseApp.auth().currentUser.uid

  }
}
