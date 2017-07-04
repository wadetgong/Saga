import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Images, Fonts } from '../Themes'
import firebaseApp from '../Firebase'

class StoryListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      picUrl: 'https://firebasestorage.googleapis.com/v0/b/breach-5ea6b.appspot.com/o/no-image-avail.png?alt=media&token=2cb55c5a-1676-4400-8e1c-00960387de64' //No image image
    }
    this.picRef = firebaseApp.database().ref('/photos/story/' + this.props.item.name)
  }

  componentDidMount() {
    if(this.props.item.name) this.listenForChange(this.picRef)
  }

  componentWillUnmount () {
    if(this.props.item.name) this.picRef.off('value', this.unsubscribe)
  }

  listenForChange(ref) {
    this.unsubscribe = ref.on('value', pic => {
      this.setState({
        picUrl : pic.val()
      })
    })
  }

  render () {
    console.log('props in StoryListItem', this.props, this.state)
    const { item, navigate, createJourney } = this.props
    return (
        <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 10, paddingBottom: 5}}>
          <View style={{padding: 5}}>
            <TouchableOpacity
                onPress={() => navigate('StoryPreview', { item, createJourney, picUrl: this.state.picUrl })}
            >
           <Image
              style={{width: 100, height: 100}}
              source={{uri: this.state.picUrl}}
            />
            </TouchableOpacity>
          </View>
          <View style={{padding: 5, flex: 1}}>
            <TouchableOpacity
                onPress={() => navigate('StoryPreview', { item, createJourney })}
            >
            <Text style={{fontFamily: Fonts.type.bold}}>Story: {item.title}</Text>
            <Text>Description: {item.description}</Text>
            <Text style={{fontStyle: 'italic'}}>Est. Time: {item.estimatedTime} hrs.</Text>
            {/*<Text>Lat: {item.startingLocation.lat}</Text>
            <Text>Long: {item.startingLocation.long}</Text>*/}
            </TouchableOpacity>

          </View>
        </View>
    )
  }

}


export default StoryListItem
