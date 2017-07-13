import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import IconFA from 'react-native-vector-icons/FontAwesome'
import firebaseApp from '../../Firebase'

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
    const uid = this.uid
    const path1 = uid + '/friends/sent/' + fid
    const path2 = fid + '/friends/received/' + uid
    this.usersRef.update({ [path1]: true, [path2]: true })
  }

  render () {
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
          <Text style={{fontWeight: 'bold'}}><Icon name='user' style={styles.icon} /> {user.name}</Text>
          <Text style={{fontSize: 12}}><Icon name='envelope' style={styles.icon} /> {user.email}</Text>
        </View>
        <View style={styles.addFriendSection}>
          <TouchableOpacity
            onPress={() => addFriend(user.uid)}
            style={styles.addFriend}
          >
            <Text style={styles.buttonText}>
              <IconFA
                name='plus'
                size={16}
                style={{
                  justifyContent: 'center'
                }}
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default FriendUserRow
