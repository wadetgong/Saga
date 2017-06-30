import { UPDATE_LOCATION } from '../constants/actionTypes';

export function updateLocation(location) {
  return dispatch => {
    dispatch({
        type: UPDATE_LOCATION,
        location
    });
  }
}
