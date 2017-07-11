// constants
const GYRO_MOVE_THRESHOLD_X = .10;
const GYRO_MOVE_THRESHOLD_Y = .10;
const MOVE_FACTOR_Y = 40
const MOVE_FACTOR_X = MOVE_FACTOR_Y * .8

// actions
const ADD_AR_OBJECT = 'ADD_AR_OBJECT'
const UPDATE_GYRO_DATA = 'UPDATE_GYRO_DATA'

// action-creators
const setArObject = arObject => ({
  type: ADD_AR_OBJECT, arObject
})
const move = (rotationRate, moveX, moveY) => ({
  type: UPDATE_GYRO_DATA,
  rotationRate,
  moveX,
  moveY
})

// reducer
const initialState = {
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
      // console.log('xOffset is? ', state.xOffset + (action.moveX * (MOVE_FACTOR_X * action.rotationRate.y)) )
      // console.log('moveX is? ', action.moveX * (MOVE_FACTOR_X * action.rotationRate.y))
      // console.log('old sate.xoffSet is? ', state.xOffset)
      // console.log('YRotation rate is? ', action.rotationRate.y)
      // console.log('yOffset is? ', state.yOffset + (action.moveY * (MOVE_FACTOR_Y * action.rotationRate.x)) )
      // console.log('moveY is? ', action.moveY * (MOVE_FACTOR_Y * action.rotationRate.x))
      // console.log('old sate.yoffSet is? ', state.yOffset)
      // console.log('xRotation rate is? ', action.rotationRate.x)

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
