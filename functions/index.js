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
  
exports.accept

