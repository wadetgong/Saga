

// actions
const SET_USERS = 'GET_USERS';
const SET_MYFRIENDS = 'GET_MYFRIENDS';
const SET_ME = 'SET_ME'

// action-creators
const setUsers = users => ({ type: SET_USERS, users })
const setMyFriends = myFriends => ({ type: SET_MYFRIENDS, myFriends })
const setMe = uid => ({ type: SET_ME, uid })

// reducer
const initialState = {
  users: [], // filtered users
  myFriends: {},
  myFriendsList: {},
  uid: ''
}

export const reducer = (state=initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case (SET_USERS):
      let newUsers = []
      const users = action.users
      
      for (let uid in users) {
        console.log('REDUX', uid, state.uid, state.myFriendsList)
        if (!state.myFriendsList[uid] && uid != state.uid)
          newUsers.push({ uid: uid, ...users[uid] })
      }
      newState.users = newUsers
      break;
    case (SET_MYFRIENDS):
      let myFriends = action.myFriends
      newState.myFriends = myFriends
      
      let myFriendsList = {}
      for (let key in myFriends) {
        const friends = myFriends[key]
        if (friends) Object.assign(myFriendsList, friends)
      }
      newState.myFriendsList = myFriendsList
      
      console.log(myFriendsList)
      break;
    case (SET_ME):
      newState.uid = action.uid
      break;
    default:
      return state
  }
  return newState
}

// action-dispatcher
export const setMyFriendsAndUsers = (uid, myFriends, users) => dispatch => {
  // everything must be done before setUsers()
  dispatch(setMe(uid))
  dispatch(setMyFriends(myFriends))
  dispatch(setUsers(users))
}


// // listener on my friends
// getMyFriends (ref) {
//   this.unsubscribeMyFriendsRef = ref.on('value', snap => {
//     const myFriends = snap.val();
//     const myFriendsList = {}
//     snap.forEach(child => {
//       console.log('UserFriends getMyFriends: 3 keys', child.key, child.val())
//       if (child.val()) child.val().forEach(f => myFriendsList[f] = true)
//     })
//   })
// }
//
// // promise listener on all users
// getUsers (ref) {
//   ref.once('value').then(snap => {
//     const users = []
//     snap.forEach(child => {
//       if (!this.state.myFriendsList[child.key])
//         users.push({ uid: child.key, ...child.val() });
//     })
//   })
// }