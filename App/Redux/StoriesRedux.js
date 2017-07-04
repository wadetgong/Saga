
const PENDING = "pending"
const FAILED = "failed"
const COMPLETED = "completed"
const CURRENT = "current"


// actions
const SET_STORIES = 'SET_STORIES'
const SET_JOURNEYS = 'SET_JOURNEYS'
const SET_JOURNEY = 'SET_JOURNEY'   // JourneyFriends uses this

// action-creators
const setStories = (stories) => ({
  type: SET_STORIES, stories
})
const setJourneys = (journeys) => ({
  type: SET_JOURNEYS, journeys
})
const setJourney = (jid, journey) => ({ 
  type: SET_JOURNEY, journey, jid
});

// reducer
const initialState = {
  // myJourneys = { status : { jid : storyname } }
  // mapped to /users/uid/journeys
  // SET_JOURNEYS
  myJourneys: {},
  
  // myJourneysList { jid: journey obj }
  // myJourneysList: {},
  
  // myStories = { storyname : true }
  // SET_JOURNEYS
  myStories: {}, 
  
  // myStoriesList = { storyname : story obj }
  // SET_STORIES
  myStoriesList: {}
  
  // stories : { storyname : story obj }
  // mapped to /stories
  // filtered by journeys
  // SET_STORIES
  stories: [],
  
  // SET_JOURNEY
  jid: '',
  name: '',
  current: {},
  team: {},       // mapped to /journey/jid/team
  teamList: {},   // { uid: status } // get user obj from FriendsRedux
}

export const reducer = (state=initialState, action) => {
  const newState = Object.assign({}, state)
  switch(action.type) {
    case SET_JOURNEYS:
      // myJourneys, myJourneysList, myStories, myStoriesList
      
      // myJourneys = { status : { jid : storyname } }
      const journeys = Object.assign({}, action.journeys)
      newState.myJourneys = journeys
      
      // myStories = { storyname : true }
      const myStories = {}
      for (let status in journeys) {
        for (let jid in journeys[status])
          myStories[journeys[status][jid]] = status;
      }
      newState.myStories = myStories
      
      break;
    case SET_STORIES:
      // myStoriesList, stories
      const stories = action.stories
      let filteredStories = []

      // myStoriesList = { storyname : story obj }
      // stories : { storyname : story obj }
      for (let name in stories) {
        let newStory = Object.assign({ name: name }, stories[name])
        if (state.myStories[name]) newState.myStoriesList[name] = newStory;
        else filteredStories.push(newStory);
      }
      
      newState.stories = filteredStories
      break;
    case SET_JOURNEY:
      // 
      newState.jid = action.jid
      newState.name = action.journey.story.name
      newState.current = Object.assign({}, action.journey)
      newState.team = Object.assign({}, action.journey.team)
      
      let teamList = {}
      for (let status in newState.team) {
        for (let pid in newState.team[status])
          teamList[pid] = status;
      }
      newState.teamList = teamList;
      break;
    default:
      return state
  }
  
  // console.log(action.type, state, newState)
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