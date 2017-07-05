import React from 'react'
import { View, Text, Image, TouchableOpacity} from 'react-native'
import styles from './Styles/FriendTileStyles'

import firebaseApp from '../Firebase'

const FriendTile = ({user}) => {
  let names = user.name.split(" ")
  let firstName = names[0]
  let lastInitial = names[1].slice(0,1)

  return (
    <View style={styles.touch}>
      <TouchableOpacity
        onPress={()=>{}}
      >
        <Text style={styles.nameTag}>{`${firstName} ${lastInitial}.`}</Text>
        <Image
          style={styles.image}
          source={{uri: user.profilePicture}}
        />
      </TouchableOpacity>
    </View>
  )
}

export default FriendTile

