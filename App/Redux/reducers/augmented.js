import { ADD_AR_OBJECT, UPDATE_GYRO_DATA } from '../constants/actionTypes';
import {
    MOVE_FACTOR_X,
    MOVE_FACTOR_Y
} from '../constants';

const initialState = {
    arObject: {},
    gyroX: 0,
    gyroY: 0,
    xOffset: 0,
    yOffset: 0
};

export default function reducer(state = initialState, action) {

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
            return state;
    }
}