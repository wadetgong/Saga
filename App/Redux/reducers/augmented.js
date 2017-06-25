import { ADD_AR_Object, UPDATE_GYRO_DATA } from '../constants/actionTypes';
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
    console.log('what is action arObject? ', action.arObject);
    switch(action.type) {
        case ADD_AR_Object:
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
            return state;
    }
}