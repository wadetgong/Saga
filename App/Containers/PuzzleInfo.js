import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import RoundedButton from '../Components/Button/RoundedButton'
import { ApplicationStyles, Images } from '../Themes'

// Styles
import styles from './Styles/PuzzleInfoStyles'

class PuzzleInfo extends React.Component {
  constructor() {
    super()
  }

  render() {
    console.log('props in PuzzleInfo', this.props)
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.props.screenProps.toggle}
          style={{
            position: 'absolute',
            paddingTop: 30,
            paddingHorizontal: 5,
            zIndex: 10
        }}>
          <Image source={Images.closeButton} />
        </TouchableOpacity>
        <View style={styles.centered}>
          <Image source={Images.puzzle} style={styles.logo} />
        </View>
        <View style={styles.sectionHeader}>
          <Text>
            (Puzzle Information Here) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum sem eget fringilla commodo. Etiam condimentum nibh vel est ullamcorper, sit amet aliquet leo fermentum.
          </Text>
          <Text>Props from Chapter: {this.props.chapterInfo.id}</Text>
          <Text>Puzzle ID: {this.props.puzzleInfo}</Text>
        </View>
        <View style={ApplicationStyles.darkLabelContainer}>
        </View>
      </View>
    )
  }
}

export default PuzzleInfo
