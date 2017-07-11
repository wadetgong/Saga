import { UPDATE_LOCATION } from '../actions';


const initialState = {
  location: {
    latitude: 41.885731,
    longitude: -87.633957,
  }
};

export default function reducer(state = initialState, action) {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case UPDATE_LOCATION:
      // newState.location = action.location
      newState.location = {
        latitude: 41.885731,
        longitude: -87.633957,
      }
      break
    default:
      return state;
  }
  return newState
}
