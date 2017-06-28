import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { Fonts, Colors, Metrics } from '../Themes/'

const PendingFriendRow = ({ user }) => (
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
          <TouchableOpacity style={{
            borderRadius: 5,
            marginVertical: 5,
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: Colors.fire,
            justifyContent: 'center',
            alignItems: 'center'}}
          >
            <Text style={{
              color: Colors.snow,
              textAlign: 'center',
            }}>Cancel Request</Text>
          </TouchableOpacity>
        </View>
    </View>
)


export default PendingFriendRow
