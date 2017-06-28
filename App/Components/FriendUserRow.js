import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { Fonts, Colors, Metrics } from '../Themes/'

const FriendUserRow = ({ user }) => (
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
          <Text style={{fontWeight: 'bold'}}>{user.name}</Text>
          <Text><Icon name='user' style={{paddingHorizontal: 5, justifyContent: 'center'}}/> : {user.username}</Text>
          <Text><Icon name='envelope' style={{paddingHorizontal: 5, justifyContent: 'center'}}/> : {user.email}</Text>
        </View>
        <View style={{flex: .6,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',}}
        >
          <TouchableOpacity style={{
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: Colors.buttonActive,
            justifyContent: 'center',
            alignItems: 'center'}}
          >
            <Text style={{
              color: Colors.snow,
              textAlign: 'center',
            }}>Add Friend</Text>
          </TouchableOpacity>
        </View>
    </View>
)


export default FriendUserRow
