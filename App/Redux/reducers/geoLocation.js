import { UPDATE_LOCATION } from '../constants/actionTypes';


const initialState = {
  location: {
    latitude: 41.88,
    longitude: -87.6354,
  }
};

export default function reducer(state = initialState, action) {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case UPDATE_LOCATION:
      newState.location = action.location
      break
    default:
      return state;
  }
  return newState
}
