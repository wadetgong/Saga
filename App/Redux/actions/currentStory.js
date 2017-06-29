import { SET_STORY, SET_PUZZLE, SET_CHAPTER } from '../constants/actionTypes';

export function setStoryRef(storyName) {

  return dispatch => {
    dispatch({
      type: SET_STORY,
      storyName
    })
  }
}

export function setChapterRef(chapterId) {
  return dispatch => {
    dispatch({
      type: SET_CHAPTER,
      chapterId
    })
  }
}

export function setPuzzle(puzzleId) {
  return dispatch => {
    dispatch({
      SET_PUZZLE,
      puzzleId
    })
  }
}
