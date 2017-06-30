const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.initUser = functions.auth.user()
  .onCreate(event => {
    // The Firebase user.
    const { displayName, email, photoURL, uid } = event.data;
    const user = {
      displayName, email, fb_thumbnail: photoURL,
      friends: {
        sent: null,
        recieved: null,
        friends: null
      },
      journeys: null,
      profilePicture: null,
      username: null,
    }

    return admin.database().ref('/users').child(uid).set(user)
  });

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
          return admin.database().ref(`/story/${storyId}/chapters/${nextChap}`).child('enabled').set(true)
        }
        else {
          return admin.database().ref(`/story/${storyId}`).child('status').set('Complete')
        }
      }
    // return admin.database().ref('/story/batman/chapters/1').child('enabled').set(true)
  })
})

// on create/update/destroy friends
//
exports.sendFriendInvite = functions.database.ref('/users/{uid}/friends/{fid}')
  .onWrite(event => {
    // exit if no data ??
    if (!event.data.exists()) return;

    // variables
    const { uid, fid } = event.params;
    // what was written to db
    const written = event.data.val();

    // get previous data to update friendship
    if (event.data.previous.exists()) {

    }
    // else you are sending an invite and must change on the other
    else {
      return admin.database().ref('/users' + friends).child(uid).set()
    }
  })

// exports.accept

