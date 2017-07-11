import { UPDATE_LOCATION } from '../actions';

export function updateLocation(location) {
  return dispatch => {
    dispatch({
        type: UPDATE_LOCATION,
        location
    });
  }
}
