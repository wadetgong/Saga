import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { Fonts, Colors, Metrics } from '../Themes/'

import firebaseApp from '../Firebase'


const PendingFriendRow = ({ user, cancel }) => (
    <View style={{flex: 1,
      flexDirection: 'row',
      padding: 5,
    }}>
        <TouchableOpacity
            onPress={() => {}}
        >
        <Image
            style={{width: 80, height: 80}}
            source={{uri: user.profilePicture}}
        />
        </TouchableOpacity>
        <View style={{flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingHorizontal: 10,}}
        >
          <Text><Text style={{fontWeight: 'bold'}}>{user.name}</Text> ({user.username})</Text>
          {/*<Text style={{fontStyle: 'italic'}}>Date Requested: 6/22/2017</Text>*/}
          <TouchableOpacity 
            onPress={() => cancel(user.uid)}
            style={{
              borderRadius: 5,
              marginVertical: 5,
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: Colors.fire,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{
              color: Colors.snow,
              textAlign: 'center',
            }}>Cancel Request</Text>
          </TouchableOpacity>
        </View>
    </View>
)

class PendingFriendClass extends React.Component {
  constructor () {
    super()
    
    this.uid = 'bDvfVQh8YPPrjckTMa0L06uC6N52' // firebaseApp.auth().currentUser.uid
    
    this.cancel = this.cancel.bind(this)
  }
  
  cancel (fid) {
    const uid = this.uid,
          path1 = '/users/' + uid + '/friends/sent/' + fid,
          path2 = '/users/' + fid + '/friends/received/' + uid;
    firebaseApp.database().ref(path1).remove();
    firebaseApp.database().ref(path2).remove();
  }
  
  render () {
    const { user } = this.props;
    return <PendingFriendRow 
      user={user} 
      cancel={this.cancel}
    />
  }
}

export default PendingFriendClass
