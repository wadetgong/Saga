import React from 'react'
import { View, Text } from 'react-native'
import RoundedButton from '../Components/Button/RoundedButton'

class ChapterDetails extends React.Component {
  constructor() {
    super()
  }

  openComponents = () => {
    this.props.screenProps.rootNavigation.navigate('PuzzleInfo', {test: 'testing'})
  }

  render() {
    console.log('props in ChapterDetails', this.props)
    return (
      <View>
        <View>
          <Text>Showing the chapter details for Chapter {this.props.selectedChap}</Text>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum sem eget fringilla commodo. Etiam condimentum nibh vel est ullamcorper, sit amet aliquet leo fermentum. Etiam nibh nulla, varius sit amet egestas nec, sodales condimentum ex. Morbi fringilla, dui eu efficitur commodo, est justo finibus massa, a iaculis purus diam ut massa.</Text>
        </View>
        <View >
          <RoundedButton onPress={this.openComponents}>
            Explore
          </RoundedButton>
        </View>
      </View>
    )
  }
}

export default ChapterDetails
