import firebaseApp from '../Firebase'


const PENDING = "pending"
const FAILED = "failed"
const COMPLETED = "completed"
const CURRENT = "current"


// actions
const SET_STORIES = 'SET_STORIES'
const SET_JOURNEYS = 'SET_JOURNEYS'
const SET_JOURNEY = 'SET_JOURNEY'   // JourneyFriends uses this
const SET_JOURNEY_IMAGE = 'SET_JOURNEY_IMAGE'
const SET_CHAPTER = 'SET_CHAPTER'
const SET_PUZZLE = 'SET_PUZZLE'
const COMPLETE_PUZZLE = 'COMPLETE_PUZZLE'
const DELETE_JOURNEY = 'DELETE_JOURNEY'   // JourneyFriends uses this

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

const setJourneyImage = (imageUrl) => ({
  type: SET_JOURNEY_IMAGE, imageUrl
});

const setChapter = (chapId) => ({
  type: SET_CHAPTER, chapId
});

const setPuzzle = (puzzleId) => ({
  type: SET_PUZZLE, puzzleId
});

const completePuzzle = () => ({
  type: COMPLETE_PUZZLE
})

const deleteJourney = () => ({
  type: DELETE_JOURNEY
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
  myStoriesList: {},

  // stories : { storyname : story obj }
  // mapped to /stories
  // filtered by journeys
  // SET_STORIES
  stories: [],

  // SET_JOURNEY
  jid: '',
  name: '',
  current: {},
  journeyImage: 'https://firebasestorage.googleapis.com/v0/b/breach-5ea6b.appspot.com/o/no-image-avail.png?alt=media&token=2cb55c5a-1676-4400-8e1c-00960387de64', //No image image
  currentChapter: {},
  currentPuzzle: {},
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
      break
    case SET_JOURNEY:
      //
      newState.jid = action.jid
      newState.name = action.journey.story.name
      newState.current = Object.assign({}, action.journey)
      newState.currentChapter = Object.assign({}, newState.current.story.chapters[0])
      newState.team = Object.assign({}, action.journey.team)

      let teamList = {}
      for (let status in newState.team) {
        for (let pid in newState.team[status])
          teamList[pid] = status;
      }
      newState.teamList = teamList;
      break
    case SET_JOURNEY_IMAGE:
      newState.journeyImage = action.imageUrl
      break
    case SET_CHAPTER:
      newState.currentChapter = Object.assign({}, newState.current.story.chapters[action.chapId-1])
      break
    case SET_PUZZLE:
      newState.currentPuzzle = Object.assign({}, newState.currentChapter.puzzles[action.puzzleId-1])
      break
    case COMPLETE_PUZZLE:
      newState.currentPuzzle = Object.assign({}, newState.currentPuzzle, {status: 'Complete'})
      break
    case DELETE_JOURNEY:
      newState.jid = ''
      newState.current = {}
      newState.currentChapter = {}
      newState.team = {}
      newState.teamList = {}
      newState.journeyImage = 'https://firebasestorage.googleapis.com/v0/b/breach-5ea6b.appspot.com/o/no-image-avail.png?alt=media&token=2cb55c5a-1676-4400-8e1c-00960387de64'
      break
    default:
      return state
  }

  // console.log(action.type, state, newState)
  return newState
}

// action-dispatchers
// journeys can be null
export const fetchStories = (stories, journeys) => dispatch => {
  dispatch(setJourneys(journeys))
  dispatch(setStories(stories))
}

export const fetchJourney = (jid, journey) => dispatch => {
  const imageRef = firebaseApp.database().ref(`/photos/story/${journey.story.id}`)
  imageRef.once('value', pic => {
    dispatch(setJourneyImage(pic.val()))
  })
  dispatch(setJourney(jid, journey))
}

export const removeJourney = () => dispatch => {
  console.log('removing journey')
  dispatch(deleteJourney())
}

export const fetchChapter = (chapId) => dispatch => {
  console.log('chapter being set to ', chapId)
  dispatch(setChapter(chapId))
}

export const fetchPuzzle = (puzzleId) => dispatch => {
  console.log('puzzle being set to ', puzzleId)
  dispatch(setPuzzle(puzzleId))
}

export const closePuzzle = () => (dispatch, getState) => {
  const {current, currentChapter, currentPuzzle } = getState().stories

  const journeyId = current.id
  const chapId = currentChapter.id
  const puzzleId = currentPuzzle.id

  const puzzleRef = firebaseApp.database().ref(`/journey/${journeyId}/story/chapters/${chapId - 1}/puzzles/${puzzleId - 1}`)
  puzzleRef.child('status').set('Complete')
  dispatch(completePuzzle())
}
