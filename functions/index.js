const functions = require('firebase-functions')
const admin = require('firebase-admin')
const vision = require('@google-cloud/vision')()
const gcs = require('@google-cloud/storage')()

admin.initializeApp(functions.config().firebase)

exports.initUser = functions.auth.user()
  .onCreate(event => {
    // The Firebase user.
    const { displayName, email, photoURL, uid } = event.data
    const user = {
      email,
      name: displayName,
      fb_thumbnail: photoURL,
      friends: {
        sent: false,
        received: false,
        list: false
      },
      id: uid,
      journeys: false,
      profilePicture: photoURL,
      username: false
    }

    return admin.database().ref('/users').child(uid).set(user)
  })

// needs work
// exports.deleteUser = functions.auth.user().onDelete(event => {
//   const { uid } = event.data.previous
//   return admin.database().ref('/users/' + uid).remove()
// });

exports.onPuzzleComplete = functions.database.ref('/journey/{journeyId}/story/chapters/{chapterId}/puzzles/{puzzleId}/status').onWrite(event => {
  // console.log('something happened in the cloud hook function. ', event, event.data)

  const { journeyId, chapterId } = event.params // puzzleId
  admin.database().ref(`/journey/${journeyId}/story/chapters`).once('value')
    .then(snapshot => {
      // console.log('snapshot in admin database', snapshot.val()[chapterId].puzzles)
      let chapPuzzles = snapshot.val()[chapterId].puzzles
      let chapterComplete = true
      for (let i = 0; i < chapPuzzles.length; i++) {
        if (chapPuzzles[i].status !== 'Complete') chapterComplete = false
      }
      let nextChap = parseInt(chapterId) + 1 + ''

      if (chapterComplete) {
        if (snapshot.hasChild(nextChap)) {
          return Promise.all([
            admin.database()
              .ref(`/journey/${journeyId}/story/chapters/${nextChap}`)
              .child('enabled').set(true),
            admin.database()
              .ref(`/journey/${journeyId}/story/chapters/${chapterId}`)
              .child('status').set('Complete')])
        } else {
          return Promise.all([
            admin.database()
              .ref(`/journey/${journeyId}/story`)
              .child('status').set('Complete'),
            admin.database()
              .ref(`/journey/${journeyId}/story/chapters/${chapterId}`)
              .child('status').set('Complete'),
            admin.database()
              .ref(`/journey/${journeyId}/times/`)
              .child('end').set(admin.database.ServerValue.TIMESTAMP)
          ])
        }
      }
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

//
exports.imageRecognition = functions.storage.object()
  .onChange(event => {
    console.log(event)
    const object = event.data
    const file = gcs.bucket(object.bucket).file(object.name)

    // Exit if this is triggered on a file that is not an image.
    if (!object.contentType.startsWith('image/')) {
      console.log('This is not an image.')
      return
    }

    // Exit if this is a move or deletion event.
    if (object.resourceState === 'not_exists') {
      console.log('This is a deletion event.')
      return
    }

    // exit if not in /journey
    if (file.name.indexOf('journey') < 0) return

    const puzzleRef = admin.database().ref(file.name)
    return vision.detectLandmarks(file)
      .then(data => {
        let landmarkArr = data[0] // array of landmarks

        return puzzleRef.child('answer').once('value').then(snap => {
          const answer = snap.val()
          const correct = landmarkArr.indexOf(answer) > -1

          console.log(landmarkArr, correct, file.name)

          if (correct) return puzzleRef.child('status').set('Complete')
          else return puzzleRef.child('status').set('Incorrect')
        })
      })
      .catch(err => console.log('error in image recognition cloud function', err))
  })
