import React from 'react'
import { View, Text, Image, ScrollView, ListView } from 'react-native'
import { connect } from 'react-redux'
import firebaseApp from '../Firebase'
import { Images } from '../Themes'
import RoundedButton from '../Components/Button/RoundedButton'
import FriendTeamTile from '../Components/FriendTeamTile'

import styles from './Styles/JourneySummaryStyles'


class JourneySummary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      journey: {},
      picUrl: 'https://firebasestorage.googleapis.com/v0/b/breach-5ea6b.appspot.com/o/no-image-avail.png?alt=media&token=2cb55c5a-1676-4400-8e1c-00960387de64' //No image image
    }
    this.journeyRef = firebaseApp.database().ref(this.props.journeyUrl)
  }

  componentDidMount() {
    if(this.props.journeyUrl) this.listenForChange(this.journeyRef)
  }

  componentWillUnmount () {
    if(this.props.journeyUrl) this.journeyRef.off('value', this.unsubscribe)
  }

  listenForChange(ref) {
    this.unsubscribe = ref.on('value', journey => {
      let journeyObj = journey.val()
      if(journeyObj) {
        firebaseApp.database().ref('/photos/story/' + journeyObj.story.id).once('value', pic => {
          this.setState({
            journey: journeyObj,
            picUrl: pic.val()
          })
        })
      }
    })
  }

  render() {
    const friendsList = (this.state.journey && this.state.journey.team && this.state.journey.team.list) || []
    console.log(friendsList, 'friendlist')
    let friendsSource = friendsList && new ListView
      .DataSource({rowHasChanged : (r1, r2) => r1 != r2})
      .cloneWithRows(Object.keys(friendsList))
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{alignItems: 'center', justifyContent: 'center',}}>
            <Image
              style={{
                marginTop: 20,
                height: 240,
                width: '100%',
                opacity: 0.75,
                top: 0,
              }}
              source={{uri: this.state.picUrl}}>
              <View style={styles.sectionHeader}>
                <Text style={styles.boldLabel}>Journey Conclusion</Text>
              </View>
            </Image>
            <Image
              style={{position: 'absolute', zIndex: 5}}
              source={Images.passStamp}
            />
          </View>
          <View>
            <Text style={{fontSize: 20, marginTop: 10, marginBottom: 5, marginHorizontal: 10, textAlign: 'center'}}>Your final time: 2:37:24</Text>
          </View>
          <View style={styles.conclusionDesc}>
            <Text style={{fontStyle: 'italic'}}>
              Story conclusion text here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna arcu, fermentum id elementum quis, blandit sit amet nisi. Donec mi odio, vestibulum in nunc sed, scelerisque tristique turpis. Integer a ante lobortis, porttitor mauris sit amet, pulvinar ligula. Sed convallis ut ante sit amet lacinia.
            </Text>
          </View>
          <View style={{marginHorizontal: 15, marginTop: 5, marginBottom: 10, borderColor: 'gray', borderBottomWidth: 1}}>
            <Text style={{paddingHorizontal: 10, paddingVertical: 5, color: 'gray', fontSize: 16}}>Teammates:</Text>
          </View>
          <View style={{marginHorizontal: 15}}>
            <ListView
              contentContainerStyle={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}
              dataSource={friendsSource}
              removeClippedSubviews={false}
              enableEmptySections={true}
              renderRow={(user) => <FriendTeamTile user={user}/>}
              />
          </View>
          <RoundedButton
            text="View Stories"
            onPress={() => {}}
          />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state in redux', state)
  return {
    journeyUrl: state.currentStory.journeyUrl,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JourneySummary)
