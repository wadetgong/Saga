import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { Fonts, Colors, Metrics } from '../Themes/'
import firebaseApp from '../Firebase'

import styles from './Styles/FriendUserRowStyles'

class FriendUserRow extends React.Component {
  constructor () {
    super()

    this.addFriend = this.addFriend.bind(this)
    this.uid = firebaseApp.auth().currentUser.uid
  }

  componentDidMount () {
    this.usersRef = firebaseApp.database().ref('/users')
  }

  addFriend (fid) {
    const uid = this.uid,
          path1 = uid + '/friends/sent/' + fid,
          path2 = fid + '/friends/received/' + uid;
    this.usersRef.update({ [path1] : true, [path2] : true })
  }

  render() {
    const { user } = this.props
    const addFriend = this.addFriend

    return (
      <View style={styles.rowSection}>
          <TouchableOpacity onPress={() => {}}>
          <Image
            style={{width: 64, height: 64}}
            source={{uri: user.profilePicture}}
          />
          </TouchableOpacity>
          <View style={styles.nameSection}
          >
            <Text style={{fontWeight: 'bold'}}><Icon name='user' style={styles.icon}/> {user.name}</Text>
            <Text style={{fontSize: 12}}><Icon name='envelope' style={styles.icon}/> {user.email}</Text>
          </View>
          <View style={styles.addFriendSection}>
            <TouchableOpacity
              onPress={() => addFriend(user.uid)}
              style={styles.addFriend}
            >
              <Text style={styles.buttonText}>Add Friend</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}


export default FriendUserRow
