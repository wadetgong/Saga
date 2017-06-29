const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.initUser = functions.auth.user()
  .onCreate(event => {
    // The Firebase user.
    const { displayName, email, photoURL, uid } = event.data; 
    const user = { 
      displayName, email, fb_thumbnail: photoURL, 
      friends: {
        sent: false,
        received: false,
        list: false
      },
      journeys: false,
      profilePicture: 'default.jpg',
      username: false
    }
    
    return admin.database().ref('/users').child(uid).set(user)
  });
  
exports.deleteUser = functions.auth.user().onDelete(event => {
  const { uid } = event.data.previous
  return admin.database().ref('/users/' + uid).remove()
});