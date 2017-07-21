import React from 'react'
import { View, Text, Modal, LayoutAnimation } from 'react-native'
import { connect } from 'react-redux'
import FullButton from '../Components/Button/FullButton'
import PuzzleInfo from './PuzzleInfo'
import { Colors } from '../../Themes'


import { fetchPuzzle } from '../../Redux/StoriesRedux'

import styles from './Styles/ChapterDetailsStyles'

class ChapterDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      selectedPuzzle: null,
    }
    this.openPuzzle = this.openPuzzle.bind(this)
    this.closePuzzle = this.closePuzzle.bind(this)
  }

  componentWillUpdate () { LayoutAnimation.easeInEaseOut() }

  openPuzzle () { this.setState({ showModal: true }) }
  closePuzzle () { this.setState({ showModal: false }) }

  getButtonStyle (puzzle) {
    if (puzzle.status === 'Complete') {
      return {
        backgroundColor: '#16a916',
        borderTopColor: '#007400',
        borderBottomColor: '#3ab53a',
      }
    }
    return {
      backgroundColor: '#333333',
      borderTopColor: '#111111',
      borderBottomColor: '#444444',
    }
  }

  render () {
    return (
      <View>
        <View style={styles.chapterDesc}>
          <Text style={{fontStyle: 'italic'}}>
            {
              this.props.chapter.description
              ? this.props.chapter.description
              : 'Description is empty in Firebase.'
            }
          </Text>
        </View>
        <View>
          {
            this.props.chapter.puzzles
            ? this.props.chapter.puzzles.map((puzzle,i) => (
                <FullButton
                  styles={this.getButtonStyle(puzzle)}
                  key={i}
                  onPress={() => {
                    this.openPuzzle()
                    // this.props.setPuzzle(puzzle.id)
                    this.props.fetchPuzzle(puzzle.id)
                  }}
                  text={`Chapter ${this.props.chapter.id} - Puzzle ${puzzle.id}`}
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
              puzzleInfo={this.props.puzzle}
              storyKey={this.props.storyKey}
            />
          </Modal>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    chapter: state.stories.currentChapter,
    puzzle: state.stories.currentPuzzle
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPuzzle: (puzzleId) => { dispatch(fetchPuzzle(puzzleId)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChapterDetails)

