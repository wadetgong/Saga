import React from 'react'
import { View, Text, Modal } from 'react-native'
import { connect } from 'react-redux'
import FullButton from '../Components/Button/FullButton'
import PuzzleInfo from '../Containers/PuzzleInfo'
import { setPuzzle } from '../Redux/actions/currentStory'
import firebaseApp from '../Firebase'
import { Colors } from '../Themes'

import styles from './Styles/ChapterDetailsStyles'

class ChapterDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      selectedPuzzle: null,
      chapter: {}
    }
    this.openPuzzle = this.openPuzzle.bind(this)
    this.closePuzzle = this.closePuzzle.bind(this)
    if(this.props.chapterUrl) this.chapterRef = firebaseApp.database().ref(this.props.chapterUrl)
  }

  componentDidMount() {
    if(this.props.chapterUrl) this.listenForChange(this.chapterRef)
  }
  componentWillUnmount () {
    if(this.props.chapterUrl) this.chapterRef.off('value', this.unsubscribe)
  }

  listenForChange(ref) {
    this.unsubscribe = ref.on('value', chapter => {
      this.setState({ chapter: chapter.val() })
    })
  }

  openPuzzle() { this.setState({ showModal: true }) }
  closePuzzle() { this.setState({ showModal: false }) }

  getButtonStyle(puzzle) {
    if(puzzle.status === 'Complete') {
      return {
        backgroundColor: '#16a916',
        borderTopColor: '#007400',
        borderBottomColor: '#3ab53a',
      }
    }
    return {
      // backgroundColor: Colors.ember,
      // borderTopColor: Colors.fire,
      // borderBottomColor: Colors.bloodOrange,
      backgroundColor: '#333333',
      borderTopColor: '#111111',
      borderBottomColor: '#444444',
    }
  }

  render() {
    console.log('ChapterDetails', this.props)
    return (
      <View>
        <View style={styles.chapterDesc}>
          <Text style={{fontStyle: 'italic'}}>
            {
              this.props.chapterInfo.description
              ? this.props.chapterInfo.description
              : 'Description is empty in Firebase.'
            }
          </Text>
        </View>
        <View>
          {
            this.props.chapterInfo
            ? this.props.chapterInfo.puzzles.map((puzzle,i) => (
                <FullButton
                  styles={this.getButtonStyle(puzzle)}
                  key={i}
                  onPress={() => {
                    this.openPuzzle()
                    this.props.setPuzzle(puzzle.id)
                  }}
                  text={`Chapter ${this.props.selectedChap} - Puzzle ${puzzle.id}`}
                />
              ))
            : null
          }
          <Modal
            animationType={"slide"}
            visible={this.state.showModal}
            onRequestClose={this.closePuzzle}>
            <PuzzleInfo
              screenProps={{ close: this.closePuzzle}}
              puzzleInfo={this.state.selectedPuzzle}
              storyKey={this.props.storyKey}
            />
          </Modal>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chapterUrl: state.currentStory.chapterUrl,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPuzzle: (puzzleId) => { dispatch(setPuzzle(puzzleId)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChapterDetails)

