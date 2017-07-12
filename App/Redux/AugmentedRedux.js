// import { createReducer, createActions } from 'reduxsauce'
// import Immutable from 'seamless-immutable'

// /* ------------- Types and Action Creators ------------- */

// const { Types, Creators } = createActions({
//   userRequest: ['username'],
//   userSuccess: ['avatar'],
// })

// export const AugmentedReduxTypes = Types
// export default Creators

// /* ------------- Initial State ------------- */

// export const INITIAL_STATE = Immutable({
//   arObject: {},
//   gyroX: 0,
//   gyroY: 0,
//   xOffset: 0,
//   yOffset: 0,
//   active: true
// })

//  ------------- Reducers -------------

// // request the temperature for a city
// export const move = (state, { rotationRate, moveX, moveY }) =>
//   state.merge({ rotationRate, moveX, moveY})

// // successful temperature lookup
// export const setArObject = (state, { arObject }) => {
//   const { avatar } = action
//   return state.merge({ arObject })
// }

// /* ------------- Hookup Reducers To Types ------------- */

// export const reducer = createReducer(INITIAL_STATE, {
//   [Types.ADD_AR_OBJECT]: setArObject,
//   [Types.UPDATE_GYRO_DATA]: move,
// })


//new stuff above, old stuff below
//had to export some things that otherwise shouldnt be exported for the sake of testing...

// constants
const GYRO_MOVE_THRESHOLD_X = .10;
const GYRO_MOVE_THRESHOLD_Y = .10;
export const MOVE_FACTOR_Y = 40
export const MOVE_FACTOR_X = MOVE_FACTOR_Y * .8

// actions
const ADD_AR_OBJECT = 'ADD_AR_OBJECT'
const UPDATE_GYRO_DATA = 'UPDATE_GYRO_DATA'

// action-creators
export const setArObject = arObject => ({
  type: ADD_AR_OBJECT, arObject
})
export const move = (rotationRate, moveX, moveY) => ({
  type: UPDATE_GYRO_DATA,
  rotationRate,
  moveX,
  moveY
})

// reducer
export const initialState = {
  arObject: {},
  gyroX: 0,
  gyroY: 0,
  xOffset: 0,
  yOffset: 0,
  active: true
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_AR_OBJECT:
      return {
        ...state,
        arObject: action.arObject
      }
    case UPDATE_GYRO_DATA:
      return {
        ...state,
        gyroX: action.rotationRate.x,
        gyroY: action.rotationRate.y,
        xOffset: state.xOffset + (action.moveX * (MOVE_FACTOR_X * action.rotationRate.y)),
        yOffset: state.yOffset + (action.moveY * (MOVE_FACTOR_Y * action.rotationRate.x))
      }
    default:
      return state
  }
}


// action-dispatchers
export const addArObject = arObject => dispatch => {
  dispatch(setArObject(arObject))
}
export const updateGyroData = gyroData => dispatch => {
  const moveX = Number(
    gyroData.rotationRate.x > GYRO_MOVE_THRESHOLD_Y ||
    gyroData.rotationRate.x < GYRO_MOVE_THRESHOLD_Y * -1
  )
  const moveY = Number(
    gyroData.rotationRate.y > GYRO_MOVE_THRESHOLD_X ||
    gyroData.rotationRate.y < GYRO_MOVE_THRESHOLD_X * -1
  )
  // if (moveX || moveY)
  dispatch(move(gyroData.rotationRate, moveX, moveY))
}
