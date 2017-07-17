import React from 'react'
import { View, Text, Modal } from 'react-native'
import { connect } from 'react-redux'
import firebaseApp from '../../../Firebase'
import FillBlank from './FillBlank'
import EnterZone from './EnterZone'
import TreasureChest from './TreasureChest'
import Vision from './Vision'
import TreasureChestKey from './TreasureChestKey'
import AugmentedClick from './AugmentedClick'
import RoundedButton from '../Button/RoundedButton'

class Puzzle extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      attempts: 0,
      showModal: false,
      status: 'Incomplete',
      puzzle: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.closeCameraModal = this.closeCameraModal.bind(this)
    // if (this.props.puzzleUrl) this.puzzleRef = firebaseApp.database().ref(this.props.puzzleUrl)
  }

  handleSubmit (answer) {
    console.log('handleSubmit called', answer, this.state.attempts)
    if (answer.toLowerCase() === this.props.puzzle.answer.toLowerCase()) {
      this.puzzleRef.child('status').set('Complete')
      this.setState({ status: 'Complete' })
    }
  }

  // componentDidMount () {
  //   if (this.props.puzzleUrl) this.listenForChange(this.puzzleRef)
  // }

  // componentWillUnmount () {
  //   if (this.props.puzzleUrl) this.puzzleRef.off('value', this.unsubscribe)
  // }

  // listenForChange (ref) {
  //   this.unsubscribe = ref.on('value', puzzle => {
  //     console.log('new info', puzzle.val())
  //     this.setState({
  //       puzzle: puzzle.val()
  //     })
  //   })
  // }

  openCameraModal () { this.setState({ showModal: true }) }
  closeCameraModal () { this.setState({ showModal: false }) }

  getPuzzleObj (puzzle) {
    switch (puzzle.puzzleType) {
      case 'fillBlank':
        return <FillBlank puzzle={puzzle} handleSubmit={this.handleSubmit} />
      case 'simpleFind':
        return (
          <View>
            <RoundedButton onPress={() => this.openCameraModal()} text={'Search'} />
            <Modal animationType={'slide'} visible={this.state.showModal} onRequestClose={this.closeCameraModal}>
              <TreasureChest
                screenProps={{close: this.closeCameraModal}}
                handleSubmit={this.handleSubmit}
                findObj={puzzle.findImage}
              />
            </Modal>
          </View>
        )
      case 'enterZone':
        return <EnterZone puzzle={puzzle} handleSubmit={this.handleSubmit} />
      case 'clickAR':
        return (
          <View>
            <RoundedButton onPress={() => this.openCameraModal()} text={'Search'} />
            <Modal animationType={'slide'} visible={this.state.showModal} onRequestClose={this.closeCameraModal}>
              <AugmentedClick
                screenProps={{close: this.closeCameraModal}}
                handleSubmit={this.handleSubmit}
              />
            </Modal>
          </View>
        )
      case 'unlockAR':
        return (
          <View>
            <RoundedButton onPress={() => this.openCameraModal()} text={'Search'} />
            <Modal
              animationType={'slide'}
              visible={this.state.showModal}
              onRequestClose={this.closeCameraModal}
            >
              <TreasureChestKey
                screenProps={{close: this.closeCameraModal}}
                handleSubmit={this.handleSubmit}
              />
            </Modal>
          </View>
        )
      case 'vision':
        return (
          <View>
            <RoundedButton onPress={() => this.openCameraModal()} text={'Snap a Picture'} />
            <Modal
              animationType={'slide'}
              visible={this.state.showModal}
              onRequestClose={this.closeCameraModal}
            ><Vision
              screenProps={{ close: this.closeCameraModal }}
              handleSubmit={this.handleSubmit}
              />
            </Modal>
          </View>
        )
      default:
        return <View></View>
    }
  }

  render () {
    console.log('Puzzle props, ', this.props)
    return (
      <View style={{flex: 1}}>
        {
          this.props.puzzle.status === 'Incorrect'
          ? (
            <View style={{
              margin: 15,
              padding: 10,
              backgroundColor: '#f2dede',
              borderColor: '#ebcccc',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderWidth: 1,
              borderRadius: 5
            }}>
              <Text style={{
                color: '#a94442',
                fontStyle: 'italic'
              }}>Your answer is not correct. Please try again.
              </Text>
            </View>
          )
          : null
        }
        {this.getPuzzleObj(this.props.puzzle)}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  // puzzleUrl: state.currentStory.puzzleUrl,
  puzzle: state.stories.currentPuzzle
})

export default connect(mapStateToProps, null)(Puzzle)

export const iconMap = {
  'fillBlank': 'note',
  'simpleFind': 'magnifier',
  'enterZone': 'directions',
  'geoLoc': 'location-pin',
  'clickAR': 'cursor',
  'unlockAR': 'key',
  'vision': 'eye'
}

export const puzzleDesc = {
  'fillBlank': 'This puzzle requires you to submit the correct answer via the text input below.',
  'simpleFind': 'This puzzle requires you to find an item via the AR experience.',
  'enterZone': 'This puzzle requires you to go to a specific location.',
  'geoLoc': 'You need to be within a geo-fence in order to pass.',
  'clickAR': 'Locate the code and tap rapidly in order to pass.',
  'unlockAR': 'Find the key and unlock the treasure chest in order to pass.',
  'vision': 'Find and take a picture of the landmark.'
}
