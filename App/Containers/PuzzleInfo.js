import React from 'react'
import { View, Text, TouchableOpacity, Image, LayoutAnimation} from 'react-native'
import { connect } from 'react-redux'
import firebaseApp from '../Firebase'

import RoundedButton from '../Components/Button/RoundedButton'
import Puzzle, {iconMap, puzzleDesc}from '../Components/Puzzle'
import { ApplicationStyles, Images } from '../Themes'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

// Styles
import styles from './Styles/PuzzleInfoStyles'

class PuzzleInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      puzzle: {},
      showInfoModal: false,
    }
    if(this.props.puzzleUrl) this.puzzleRef = firebaseApp.database().ref(this.props.puzzleUrl)
  }

  componentDidMount() {
    if(this.props.puzzleUrl) this.listenForChange(this.puzzleRef)
  }

  componentWillUnmount () {
    if(this.props.puzzleUrl) this.puzzleRef.off('value', this.unsubscribe)
  }

  listenForChange(ref) {
    this.unsubscribe = ref.on('value', puzzle => {
      console.log('new info', puzzle.val())
      this.setState({
        puzzle: puzzle.val()
      })
    })
  }

  toggleInfoModal() {
    this.setState({showInfoModal: !this.state.showInfoModal})
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  getHelperText(puzzle) {
    let iconName = iconMap[puzzle.puzzleType];
    let puzzleDesc = puzzleDesc[puzzle.puzzleType]
    return (
      <View style={styles.helperText}>
        <Text><Icon name={iconName} style={styles.icon} size={16}/> - {puzzleDesc}</Text>
        {
          puzzle.location
          ? (
            <Text><Icon name='geoLoc' style={styles.icon} size={16}/> - {puzzleDesc.geoLoc}</Text>

          )
          : null
        }
      </View>
    )
  }

  getIconList(puzzle) {
    let iconName = iconMap[puzzle.puzzleType];
    return (
      <View style={{flexDirection: 'row'}}>
        <Icon name={iconName} style={styles.icon} size={16}/>
        {
          puzzle.location
          ? (
            <Icon name='location-pin' style={styles.icon} size={16}/>
          )
          : null
        }
      </View>
    )
  }

  render() {
    return (
        this.props.puzzleUrl
        ? (
          <View style={styles.container}>
            <Image source={Images.storyMain[this.props.storyKey]} style={styles.bgImage} resizeMode={'cover'}/>
            <View style={styles.sectionHeader}>
              <View>
                <TouchableOpacity onPress={this.props.screenProps.close} style={styles.modalClose}>
                  <Image source={Images.closeButton} style={{height: 12, width: 12}}/>
                </TouchableOpacity>
                {
                  this.state.puzzle.status === 'Complete'
                  ? (
                    <View style={styles.completeText}>
                      <Text style={{fontStyle: 'italic', color: '#3c763d'}}>Congratulations, you completed this puzzle!</Text>
                    </View>
                  )
                  : null
                }
                <Text style={styles.boldLabel}></Text>{/*Puzzle #{this.state.puzzle.id}*/}
              </View>
            </View>

            <View style={styles.puzzleCard}>
              <View style={styles.puzzleCardHeader}
              >
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontWeight: 'bold'}}>Puzzle #{this.state.puzzle.id}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <TouchableOpacity onPress={() => {this.toggleInfoModal()}}>
                    {this.getIconList(this.state.puzzle)}
                  </TouchableOpacity>
                </View>
              </View>
              {
                this.state.showInfoModal
                ? this.getHelperText(this.state.puzzle)
                : null

              }
              <View style={styles.infoText}>
                <Text style={{ fontSize: 24}}>
                  {
                    this.state.puzzle.description
                    ? this.state.puzzle.description
                    : 'Description is empty in Firebase.'
                  }
                </Text>
              </View>
            </View>


            <Puzzle puzzle={this.state.puzzle} close={this.props.screenProps.close}/>
          </View>
        )
        : <View></View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    puzzleUrl: state.currentStory.puzzleUrl,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleInfo)

