import React from 'react'
import { View, Text, TextInput } from 'react-native'
import RoundedButton from '../Button/RoundedButton'

class FillBlank extends React.Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }
  }
  render() {
    console.log('fill in blank state is ', this.state)
    return (
      <View style={{padding: 5, margin: 5, backgroundColor: 'lightblue'}}>
        <Text>{this.props.puzzle.question}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10,}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <RoundedButton
          text="Submit Answer"
          disabled={this.props.disabled}
          onPress={() => {
            if (this.state.text.length) {
              this.setState({text: ''})
              this.props.handleSubmit(this.state.text)
            }
          }}
        />

      </View>
    )
  }
}

export default FillBlank
