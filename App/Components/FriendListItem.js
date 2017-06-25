import React from 'react'
import { View, Text, Image, TouchableOpacity, Switch } from 'react-native'
import { Images } from '../Themes'

// going to need to change up Image source
// can't navigate to Profile, not in the same stack navigation
// and also not written / not a real component
// Should Profile be a modal? should it be it's own stack?

const FriendListItem = ({ item, navigate, addFriendToTeam, switchValue }) => (
    <View style={{flex: 1,
      flexDirection: 'row',
      padding: 5,
    }}>
        <TouchableOpacity
            onPress={() => navigate('Profile', { navigate, item })}
        >
        <Image
            style={{width: 100, height: 100}}
            source={{uri: item.profilePicture}}
        />
        </TouchableOpacity>
        <View style={{flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 10,}}>
          <Text>{item.id}: {item.username}</Text>
          <Text>{item.email}</Text>
          <Switch
              onValueChange={(value) => addFriendToTeam(item.id, value)}
              value={switchValue}
          />
        </View>
    </View>
)


export default FriendListItem
