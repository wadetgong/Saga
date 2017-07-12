// actions
const UPDATE_LOCATION = 'UPDATE_LOCATION'

// action-creator
const setLocation = location => ({
  type: UPDATE_LOCATION,
  location
})

// reducer
const initialState = {
  location: {
    latitude: 41.885731,
    longitude: -87.633957,
  }
}

export const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case UPDATE_LOCATION:
      newState.location = action.location
      break
    default:
      return state
  }
  return newState
}

// action-dispatcher
export const updateLocation = location => dispatch => {
  dispatch(setLocation(location))
}
