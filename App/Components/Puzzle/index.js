import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Images, Fonts } from '../../Themes'
import FillBlank from './FillBlank'
// import SimpleFin from './FillBlank'

class Puzzle extends React.Component {
  constructor() {
    super()
    this.state = {
      status: 'Pending',
      attempts: 0,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(answer) {
    console.log('handleSubmit called', answer, this.state.attempts)
    let newAttempts = this.state.attempts + 1;
    console.log('newAttempts', newAttempts)
    if(answer.toLowerCase() === this.props.puzzle.answer.toLowerCase()) {
      this.setState({
        attempts: newAttempts,
        status: 'Complete',
      })
    } else if (newAttempts === this.props.puzzle.maxAttempts) {
      this.setState({
        attempts: newAttempts,
        status: 'Failure',
      })
    } else {
      this.setState({
        attempts: newAttempts,
      })
    }
  }

  getPuzzleObj(puzzle) {
    switch(puzzle.puzzleType) {
      case 'fillBlank':
        return <FillBlank puzzle={puzzle} handleSubmit={this.handleSubmit}/>
        break;
      case 'simpleFind':
        return (
          <View>
            <TouchableOpacity
              onPress={() => {}}
              style={{}}>
              <Text>Click to launch camera</Text>
            </TouchableOpacity>
          </View>
        )
        break;
      default:
        throw new Error('Puzzle type not recognized.')
    }
  }
  render() {
    console.log('Puzzle props, ', this.props)
    return (
      <View>
        <Text>Status: {this.state.status}</Text>
        <Text>Attempts Allowed: {this.props.puzzle.maxAttempts}</Text>
        <Text>Attempts: {this.state.attempts}</Text>
        {this.getPuzzleObj(this.props.puzzle)}
      </View>
    )
  }
}

export default Puzzle
