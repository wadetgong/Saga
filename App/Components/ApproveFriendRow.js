import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { Images, Fonts, Colors, Metrics } from '../Themes/'
import firebaseApp from '../Firebase'

const ApproveFriendRow = ({ user, confirm, decline }) => (
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
          <Text style={{fontStyle: 'italic'}}>Date Requested: 6/22/2017</Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',}}
            >
              <TouchableOpacity 
              onPress={() => confirm(user.uid)}
                style={{
                  borderRadius: 5,
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  backgroundColor: Colors.buttonStandard,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={{
                  color: Colors.snow,
                  textAlign: 'center',
                }}>Confirm</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',}}
            >
              <TouchableOpacity 
                onPress={() => decline(user.uid)}
                style={{
                  borderRadius: 5,
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  backgroundColor: Colors.charcoal,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={{
                  color: Colors.snow,
                  textAlign: 'center',
                }}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </View>
)

class ApproveFriendClass extends React.Component {
  constructor () {
    super()
    
    this.uid = 'bDvfVQh8YPPrjckTMa0L06uC6N52' // firebaseApp.auth().currentUser.uid
    
    this.confirm = this.confirm.bind(this)
    this.decline = this.decline.bind(this)
  }
  
  confirm (fid) {
    const uid = this.uid,
          path1 = '/users/' + uid + '/friends/received/' + fid,
          path2 = uid + '/friends/list/' + fid,
          path3 = '/users/' + fid + '/friends/sent/' + uid,
          path4 = fid + '/friends/list/' + uid;
    firebaseApp.database().ref(path1).remove();
    firebaseApp.database().ref(path3).remove();
    firebaseApp.database().ref('/users').update({ [path2] : true, [path4] : true });
  }
  
  delete (fid) {
    const uid = this.uid,
          path1 = '/users/' + uid + '/friends/received/' + fid,
          path2 = '/users/' + fid + '/friends/sent/' + uid;
    firebaseApp.database().ref(path1).remove();
    firebaseApp.database().ref(path2).remove();
  }
  
  render () {
    const { user } = this.props;
    return <ApproveFriendRow 
      user={user} 
      confirm={this.confirm} 
      decline={this.decline}
    />
  }
}

export default ApproveFriendClass
