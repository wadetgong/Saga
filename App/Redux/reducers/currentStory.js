import { SET_STORY, SET_PUZZLE, SET_CHAPTER } from '../constants/actionTypes';
import firebaseApp from '../../Firebase'

const initialState = {
  // storyRef: null,
  storyUrl: '/story/batman',
  selectedChap: 1,
  chapterUrl: null,
  puzzleURL: null,
}

export default function reducer(state = initialState, action) {
  const newState = Object.assign({}, state)
  switch(action.type) {
    case SET_STORY:
      newState.storyUrl = `/story/${action.storyName}`
      break
    case SET_CHAPTER:
      newState.chapterUrl = `${state.storyUrl}chapters/${action.chapterId - 1}` // -1 here because Chapter 1 has an ID of 0
      break
    case SET_PUZZLE:
      newState.puzzleUrl = `${state.chapterUrl}/puzzles/${action.puzzleId}`
      break
    default:
      return state
  }
  return newState
}
