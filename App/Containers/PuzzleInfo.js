import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import firebaseApp from '../Firebase'

import RoundedButton from '../Components/Button/RoundedButton'
import Puzzle from '../Components/Puzzle'
import { ApplicationStyles, Images } from '../Themes'

// Styles
import styles from './Styles/PuzzleInfoStyles'

class PuzzleInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      puzzle: {},
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

  render() {
    return (
        this.props.puzzleUrl
        ? (
          <View style={styles.container}>
            <View style={styles.sectionHeader}>
              <Text style={styles.boldLabel}>Puzzle #{this.state.puzzle.id}</Text>
              <TouchableOpacity
                onPress={this.props.screenProps.close}
                style={styles.modalClose}>
                <Image source={Images.closeButton} />
              </TouchableOpacity>
            </View>
            {
              this.state.puzzle.status === 'Complete'
              ? (
                <View style={styles.completeText}>
                  <Text style={{fontStyle: 'italic', color: '#3c763d'}}>Congratulations, you completed this puzzle!</Text>
                </View>
              )
              : null
            }
            <View>
              <Image source={Images.storyMain[this.props.storyKey]} style={styles.logo}/>
            </View>
            <View style={styles.infoText}>
              <Text>
                (Puzzle Information Here)
                {
                  this.state.puzzle.description
                  ? this.state.puzzle.description
                  : 'Description is empty in Firebase.'
                }
              </Text>
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

