
// actions
const SET_STORIES = 'SET_STORIES'
const SET_JOURNEYS = 'SET_JOURNEYS'
const SET_JOURNEY = 'SET_JOURNEY'   // JourneyFriends uses this

// action-creators
setStories = (stories) => ({
  type: SET_STORIES, stories
})
setJourneys = (journeys) => ({
  type: SET_JOURNEYS, journeys
})
const setJourney = (jid, journey) => ({ 
  type: SET_JOURNEY, journey, jid
});

// reducer
const initialState = {
  myJourneys: {}, // mapped to /users/uid/journeys
  myStories: {},  // mapped to myJourneys' values/ie stories, with story obj
  stories: [],    // mapped to /stories, filtered by journeys, with story obj
  jid: '',
  name: '',
  journey: {},
  team: {},       // mapped to /journey/jid/team
  teamList: {},   // uid : {user}
}

export const reducer = (state=initialState, action) => {
  const newState = Object.assign({}, state)
  switch(action.type) {
    case SET_JOURNEYS:
      const journeys = Object.assign({}, action.journeys)
      const myStories = {}
      for (let jid in journeys) {
        if (jid == "pending")
        myStories[journeys[jid]] = true
      }
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
    case SET_JOURNEY:
      newState.jid = action.jid
      newState.name = action.journey.story.name
      newState.journey = Object.assign({}, action.journey)
      newState.team = Object.assign({}, action.journey.team)
      
      let teamList = {}
      for (let uid in newState.team) {
        if (uid == "pending") {
          for (let pid in newState.team.pending)
            teamList[pid] = "pending";
        } else {
          teamList[uid] = true
        }
      }
      newState.teamList = teamList;
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
  // console.log(stories, journeys)
  dispatch(setJourneys(journeys))
  dispatch(setStories(stories))
}

export const fetchJourney = (jid, journey) => dispatch => {
  dispatch(setJourney(jid, journey))
}