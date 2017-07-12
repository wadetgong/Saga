import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import firebaseApp from '../../Firebase'
import styles from './Styles/PendingFriendRowStyles'

const PendingFriendRow = ({ user, cancel }) => (
  <View style={styles.rowSection}>
    <TouchableOpacity onPress={() => {}}>
      <Image
        style={{width: 75, height: 75}}
        source={{uri: user.profilePicture}}
      />
    </TouchableOpacity>
    <View style={styles.cancelSection}>
      <Text style={{fontWeight: 'bold'}}><Icon name='user' style={styles.icon} /> {user.name}</Text>
      <Text style={{fontSize: 12}}><Icon name='envelope' style={styles.icon} /> {user.email}</Text>
      <TouchableOpacity onPress={() => cancel(user.uid)} style={styles.cancelButton}>
        <Text style={styles.cancelText}>Cancel Request</Text>
      </TouchableOpacity>
    </View>
  </View>
)

class PendingFriendClass extends React.Component {
  constructor () {
    super()
    this.uid = firebaseApp.auth().currentUser.uid
    this.cancel = this.cancel.bind(this)
  }

  cancel (fid) {
    const uid = this.uid
    const path1 = '/users/' + uid + '/friends/sent/' + fid
    const path2 = '/users/' + fid + '/friends/received/' + uid
    firebaseApp.database().ref(path1).remove()
    firebaseApp.database().ref(path2).remove()
  }

  render () {
    const { user } = this.props
    return <PendingFriendRow
      user={user}
      cancel={this.cancel}
    />
  }
}

export default PendingFriendClass
