const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.initUser = functions.auth.user()
  .onCreate(event => {
    // The Firebase user.
    const { displayName, email, photoURL, uid } = event.data;
    const user = {
      email,
      name: displayName,
      fb_thumbnail: photoURL,
      friends: {
        sent: false,
        received: false,
        list: false
      },
      journeys: false,
      profilePicture: photoURL,
      username: false,
    }

    return admin.database().ref('/users').child(uid).set(user)
  });

// needs work
// exports.deleteUser = functions.auth.user().onDelete(event => {
//   const { uid } = event.data.previous
//   return admin.database().ref('/users/' + uid).remove()
// });

exports.onPuzzleComplete = functions.database.ref('/story/{storyId}/chapters/{chapterId}/puzzles/{puzzleId}/status').onWrite(event => {
  // console.log('something happened in the cloud hook function. ', event, event.data)

  const {storyId, chapterId, puzzleId} = event.params;
  admin.database().ref(`/story/${storyId}/chapters`).once('value')
    .then(snapshot => {
      // console.log('snapshot in admin database', snapshot.val()[chapterId].puzzles)
      let chapPuzzles = snapshot.val()[chapterId].puzzles;
      let chapterComplete = true;
      for(let i = 0; i < chapPuzzles.length; i++) {
        if(chapPuzzles[i].status !== 'Complete') {
          chapterComplete = false;
        }
      }
      let nextChap = parseInt(chapterId) + 1 + "";

      if(chapterComplete) {
        if(snapshot.hasChild(nextChap)) {
          return Promise.all([
            admin.database().ref(`/story/${storyId}/chapters/${nextChap}`).child('enabled').set(true),
            admin.database().ref(`/story/${storyId}/chapters/${chapterId}`).child('status').set('Complete')])
        }
        else {
          return Promise.all([
            admin.database().ref(`/story/${storyId}`).child('status').set('Complete'),
            admin.database().ref(`/story/${storyId}/chapters/${chapterId}`).child('status').set('Complete')])
        }
      }
    // return admin.database().ref('/story/batman/chapters/1').child('enabled').set(true)
  })
})

// on create/update/destroy current journey
// needs work
// exports.updateCurrentJourney = functions.database.ref('/users/{uid}/journeys/current')
//   .onWrite(event => {
//     // exit if no data ??
//     if (!event.data.exists()) return;
//
//     // variables
//     const { uid } = event.params;
//     // what was written to db
//     const written = event.data.val();
//
//     // get previous data
//     if (event.data.previous.exists()) {
//       console.log('Function', '\nwritten', written, '\nprevious', event.data.previous.val())
//     }
//     //
//     // else {
//     //   return admin.database().ref('/users' + friends)
//     // }
//   })

