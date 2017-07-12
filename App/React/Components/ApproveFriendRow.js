import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import firebaseApp from '../Firebase'

import styles from './Styles/ApproveFriendRowStyles'

const ApproveFriendRow = ({ user, confirm, decline }) => (
  <View style={styles.rowSection}>
    <TouchableOpacity onPress={() => {}}>
      <Image
        style={{width: 75, height: 75}}
        source={{uri: user.profilePicture}}
      />
    </TouchableOpacity>
    <View style={styles.userDescription}>
      <Text style={{fontWeight: 'bold'}}><Icon name='user' style={styles.icon} /> {user.name}</Text>
      <Text style={{fontSize: 12}}><Icon name='envelope' style={styles.icon} /> {user.email}</Text>

      <View style={styles.approveSection}>
        <View style={styles.confirmSection}>
          <TouchableOpacity onPress={() => confirm(user.uid)} style={styles.confirmButton}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.declineSection}>
          <TouchableOpacity onPress={() => decline(user.uid)} style={styles.declineButton}>
            <Text style={styles.declineText}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
)

class ApproveFriendClass extends React.Component {
  constructor () {
    super()
    this.uid = firebaseApp.auth().currentUser.uid
    this.confirm = this.confirm.bind(this)
    this.decline = this.decline.bind(this)
  }

  confirm (fid) {
    const uid = this.uid
    const path1 = uid + '/friends/received/' + fid
    const path2 = uid + '/friends/list/' + fid
    const path3 = fid + '/friends/sent/' + uid
    const path4 = fid + '/friends/list/' + uid
    firebaseApp.database().ref('/users').update({
      [path1]: null,
      [path2]: true,
      [path3]: null,
      [path4]: true
    })
  }

  decline (fid) {
    const uid = this.uid
    const path1 = '/users/' + uid + '/friends/received/' + fid
    const path2 = '/users/' + fid + '/friends/sent/' + uid
    firebaseApp.database().ref(path1).remove()
    firebaseApp.database().ref(path2).remove()
  }

  render () {
    const { user } = this.props
    return <ApproveFriendRow
      user={user}
      confirm={this.confirm}
      decline={this.decline}
    />
  }
}

export default ApproveFriendClass
