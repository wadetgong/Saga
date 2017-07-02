
// actions
const SET_STORIES = 'SET_STORIES'
const SET_JOURNEYS = 'SET_JOURNEYS'

// action-creators
setStories = (stories) => ({
  type: SET_STORIES, stories
})
setJourneys = (journeys) => ({
  type: SET_JOURNEYS, journeys
})

// reducer
const initialState = {
  myJourneys: {}, // mapped to /users/uid/journeys
  myStories: {},  // mapped to myJourneys' values/ie stories, with story obj
  stories: [],    // mapped to /stories, filtered by journeys, with story obj
}

export const reducer = (state=initialState, action) => {
  const newState = Object.assign({}, state)
  switch(action.type) {
    case SET_JOURNEYS:
      const journeys = Object.assign({}, action.journeys)
      const myStories = {}
      for (let jid in journeys)
        myStories[journeys[jid]] = true
      
      newState.myStories = myStories
      newState.myJourneys = journeys
      break;
    case SET_STORIES: 
      let filteredStories = []
      const stories = action.stories
      
      // get story objects
      // myStories, stories
      for (let name in stories) {
        let newStory = Object.assign({ name: name }, stories[name])
        if (state.myStories[name]) newState.myStories[name] = newStory;
        else filteredStories.push(newStory);
      }
      
      newState.stories = filteredStories
      break;
    default:
      return state
  }
  
  
  console.log(action.type, state, newState)
  return newState
}

// action-dispatchers
// journeys can be null
export const fetchStories = (stories, journeys) => dispatch => {
  console.log(stories, journeys)
  dispatch(setJourneys(journeys))
  dispatch(setStories(stories))
}