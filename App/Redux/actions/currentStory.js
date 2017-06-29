import { SET_STORY, SET_PUZZLE, SET_CHAPTER } from '../constants/actionTypes';

export function setStory(storyName) {

  return dispatch => {
    dispatch({
      type: SET_STORY,
      storyName
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
