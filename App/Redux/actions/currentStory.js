import { SET_STORY, SET_PUZZLE, SET_CHAPTER } from '../actions'

export function setStory(journeyId) {
  return dispatch => {
    dispatch({
      type: SET_STORY,
      journeyId
    })
  }
}

export function setChapter(chapterId) {
  console.log('chapter being set to chapter ', chapterId)
  return dispatch => {
    dispatch({
      type: SET_CHAPTER,
      chapterId
    })
  }
}

export function setPuzzle(puzzleId) {
  console.log('puzzle being set to puzzle ', puzzleId)
  return dispatch => {
    dispatch({
      type: SET_PUZZLE,
      puzzleId
    })
  }
}
