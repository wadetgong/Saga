import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/FriendTeamTileStyles'
import firebaseApp from '../../Firebase'

class FriendTeamTile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {},
      picUrl: 'https://firebasestorage.googleapis.com/v0/b/breach-5ea6b.appspot.com/o/no-image-avail.png?alt=media&token=2cb55c5a-1676-4400-8e1c-00960387de64' // No image image
    }
    if (this.props.user) this.userRef = firebaseApp.database().ref(`/users/${this.props.user}`)
  }

  componentDidMount () {
    if (this.props.user) this.listenForChange(this.userRef)
  }

  componentWillUnmount () {
    if (this.props.user) this.userRef.off('value', this.unsubscribe)
  }

  listenForChange (ref) {
    this.unsubscribe = ref.on('value', user => {
      let userObj = user.val()
      if (userObj) this.setState({ user: userObj, picUrl: userObj.profilePicture })
    })
  }

  render () {
    // let names = this.state.user && this.state.user.name.split(" ")
    // let firstName = names[0]
    // let lastInitial = names[1].slice(0,1)

    return (
      <View style={[styles.touch, this.props.styles]}>
        <TouchableOpacity
          onPress={() => {}}
        >
          <Image
            style={[styles.image, this.props.styles]}
            source={{uri: this.state.user.profilePicture}}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

export default FriendTeamTile
