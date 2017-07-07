import { SET_STORY, SET_PUZZLE, SET_CHAPTER, REMOVE_STORY } from '../constants/actionTypes';

const initialState = {
  // storyUrl: '/story/batman',
  journeyUrl: '',
  storyUrl: '',
  selectedChap: 1,
  chapterUrl: null,
  // chapterUrl: '/story/batman/chapters/0',
  puzzleURL: null,
  story: {}
}

export default function reducer(state = initialState, action) {
  const newState = Object.assign({}, state)
  switch(action.type) {
    case SET_STORY:
      newState.journeyUrl = `/journey/${action.journeyId}`
      newState.storyUrl = `/journey/${action.journeyId}/story`
      newState.chapterUrl = `/journey/${action.journeyId}/story/chapters/0`
      break
    case SET_CHAPTER:
      newState.chapterUrl = `${state.storyUrl}/chapters/${action.chapterId - 1}` // -1 here because Chapter 1 has an ID of 0
      break
    case SET_PUZZLE:
      newState.puzzleUrl = `${state.chapterUrl}/puzzles/${action.puzzleId - 1}` // -1 here because Puzzle 1 has an ID of 0
      break
    case REMOVE_STORY:
      newState.storyUrl = null
      newState.journeyUrl = null
      newState.chapterUrl = null
      newState.puzzleURL = null
      break
    default:
      return state
  }
  return newState
}
