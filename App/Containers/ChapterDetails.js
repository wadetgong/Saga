import React from 'react'
import { View, Text, Modal } from 'react-native'
import { connect } from 'react-redux'
import FullButton from '../Components/Button/FullButton'
import PuzzleInfo from '../Containers/PuzzleInfo'

class ChapterDetails extends React.Component {
  constructor() {
    super()
      this.state = {
      showModal: false,
      selectedPuzzle: null
    }
  }

  toggleModal = (puzzleId) => {
    // console.log('New puzzle selected: ', puzzleId)
    this.setState({
      showModal: !this.state.showModal,
      selectedPuzzle: puzzleId
    })
  }

  openComponents = () => {
    this.props.screenProps.rootNavigation.navigate('PuzzleInfo', {test: 'testing'})
  }

  render() {
    // console.log('props in ChapterDetails', this.props)
    return (
      <View>
        <View style={{padding: 10, margin: 10, backgroundColor: 'beige', borderRadius: 5,
          /*shadowColor: 'black',
          hadowOffset: {width: 1, height: 1},
          shadowRadius: 1,
          shadowOpacity: 0.5*/
        }}>
          <Text>Showing the chapter details for Chapter {this.props.selectedChap}</Text>
          <Text style={{fontStyle: 'italic'}}>(Chapter Narrrative): Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum sem eget fringilla commodo. Etiam condimentum nibh vel est ullamcorper, sit amet aliquet leo fermentum.</Text>
        </View>
        <View >
          {
            this.props.chapterInfo
            ? this.props.chapterInfo.puzzles.map((puzzle,i) => (
                <FullButton
                  key={i}
                  onPress={() => this.toggleModal(puzzle.id)}
                  text={`Chapter ${this.props.selectedChap} - Puzzle ${puzzle.id}`}
                />
              ))
            : null
          }
          <Modal
            animationType={"slide"}
            visible={this.state.showModal}
            onRequestClose={this.toggleModal}>
            <PuzzleInfo
              screenProps={{ toggle: this.toggleModal}}
              puzzleInfo={this.state.selectedPuzzle}
              chapterInfo={this.props.chapterInfo}
              storyKey={this.props.storyKey}
            />
          </Modal>
        </View>
      </View>
    )
  }
}

// export default ChapterDetails

const mapStateToProps = (state) => {
  return {
    chapterRef: state.currentStory.chapterRef,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChapterDetails)

