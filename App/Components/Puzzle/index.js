import React from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import { connect } from 'react-redux'
import firebaseApp from '../../Firebase'
import { Images, Fonts } from '../../Themes'
import FillBlank from './FillBlank'
import EnterZone from './EnterZone'
import TreasureChest from './TreasureChest'
import Vision from './Vision'
import TreasureChestKey from './TreasureChestKey'
import AugmentedClick from './AugmentedClick'
import RoundedButton from '../Button/RoundedButton'

class Puzzle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'Pending',
      attempts: 0,
      showModal: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.closeCameraModal = this.closeCameraModal.bind(this)
    if(this.props.puzzleUrl) this.puzzleRef = firebaseApp.database().ref(this.props.puzzleUrl)
  }

  handleSubmit(answer) {
    console.log('handleSubmit called', answer, this.state.attempts)
    // if(this.state.status === 'Pending') {
    //   let newAttempts = this.state.attempts + 1;
    //   console.log('newAttempts', newAttempts)
      if(answer.toLowerCase() === this.props.puzzle.answer.toLowerCase()) {
        this.puzzleRef.child('status').set('Complete')
        this.setState({
          // attempts: newAttempts,
          status: 'Complete',
        })
    //   } else if (newAttempts === this.props.puzzle.maxAttempts) {
    //     this.setState({
    //       attempts: newAttempts,
    //       status: 'Failure',
    //     })
    //   } else {
    //     this.setState({
    //       attempts: newAttempts,
    //     })
    //   }
    }
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

  openCameraModal() { this.setState({ showModal: true, }) }
  closeCameraModal() { this.setState({ showModal: false, }) }

  getPuzzleObj(puzzle) {
    switch(puzzle.puzzleType) {
      case 'fillBlank':
        return <FillBlank puzzle={puzzle} handleSubmit={this.handleSubmit} />
        break;
      case 'simpleFind':
        return (
          <View>
            <RoundedButton onPress={() => this.openCameraModal()} text={"Search"} />
            <Modal animationType={"slide"} visible={this.state.showModal} onRequestClose={this.closeCameraModal}>
              <TreasureChest
                screenProps={{ close: this.closeCameraModal}}
                handleSubmit={this.handleSubmit}
                findObj={puzzle.findImage}
                /*storyKey={this.props.storyKey} */
              />
            </Modal>
          </View>
        )
        break;
      case 'enterZone':
        return <EnterZone puzzle={puzzle} handleSubmit={this.handleSubmit} />
        break;
      case 'clickAR':
        return (
          <View>
            <RoundedButton onPress={() => this.openCameraModal()} text={"Search"} />
            <Modal animationType={"slide"} visible={this.state.showModal} onRequestClose={this.closeCameraModal}>
              <AugmentedClick
                screenProps={{ close: this.closeCameraModal}}
                handleSubmit={this.handleSubmit}
              />
            </Modal>
          </View>
        )
        break;
      case 'unlockAR':
        return (
          <View>
            <RoundedButton onPress={() => this.openCameraModal()} text={"Search"} />
            <Modal 
              animationType={"slide"} 
              visible={this.state.showModal} 
              onRequestClose={this.closeCameraModal}
            ><TreasureChestKey
                screenProps={{ close: this.closeCameraModal }}
                handleSubmit={this.handleSubmit}
              />
            </Modal>
          </View>
        )
        break;
      case 'vision':
        return (
          <View>
          <RoundedButton onPress={() => this.openCameraModal()} text={"Snap a Picture"} />
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
        break;
      default:
        return (<View></View>)
    }
  }

  render() {
    console.log('Puzzle props, ', this.props)
    return (
      <View style={{flex: 1}}>
        {/*<Text>Status: {this.state.status}</Text>
        <Text>Attempts Allowed: {this.props.puzzle.maxAttempts}</Text>
        <Text>Attempts: {this.state.attempts}</Text>*/}
        {this.getPuzzleObj(this.props.puzzle)}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    puzzleUrl: state.currentStory.puzzleUrl,
  }
}

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
