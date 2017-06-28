import { ADD_AR_OBJECT, UPDATE_GYRO_DATA } from '../constants/actionTypes';
import {
    GYRO_MOVE_THRESHOLD_X,
    GYRO_MOVE_THRESHOLD_Y
} from '../constants';

export function addArObject(arObject) {
    return dispatch => {
        dispatch({
            type: ADD_AR_OBJECT,
            arObject
        });
    }
}

export function updateGyroData(gyroData) {
    let moveX = 0;
    let moveY = 0;
    if(gyroData.rotationRate.x > GYRO_MOVE_THRESHOLD_Y || gyroData.rotationRate.x < GYRO_MOVE_THRESHOLD_Y * -1) {
        moveY = 1;
    }
    if(gyroData.rotationRate.y > GYRO_MOVE_THRESHOLD_X || gyroData.rotationRate.y < GYRO_MOVE_THRESHOLD_X * -1) {
        moveX = 1;
    }
    return dispatch => {
        dispatch({
            type: UPDATE_GYRO_DATA,
            rotationRate: gyroData.rotationRate,
            moveX,
            moveY
        });
    }
}
