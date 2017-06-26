import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import RoundedButton from '../Components/Button/RoundedButton'
import Puzzle from '../Components/Puzzle'
import { ApplicationStyles, Images } from '../Themes'

// Styles
import styles from './Styles/PuzzleInfoStyles'

class PuzzleInfo extends React.Component {
  constructor() {
    super()
  }

  render() {

    const puzzle = {
      id: this.props.puzzleInfo,
      question: 'What goes up when rain comes down?',
      answer: 'An umbrella',
      puzzleType: 'fillBlank',
      maxAttempts: 3
    }
    console.log('props in PuzzleInfo', this.props)
    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.boldLabel}>Puzzle #{this.props.puzzleInfo}</Text>
          <TouchableOpacity
            onPress={this.props.screenProps.toggle}
            style={styles.modalClose}>
            <Image source={Images.closeButton} />
          </TouchableOpacity>
        </View>
        <View style={styles.centered}>
          <Image source={Images.puzzle} style={styles.logo} />
        </View>
        <View style={{padding: 10, margin: 10, backgroundColor: 'beige', borderRadius: 5}}>
          <Text>
            (Puzzle Information Here) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum sem eget fringilla commodo. Etiam condimentum nibh vel est ullamcorper, sit amet aliquet leo fermentum.
          </Text>
          <Text>Props from Chapter: {this.props.chapterInfo.id}</Text>
          <Text>Puzzle ID: {this.props.puzzleInfo}</Text>
        </View>
        <Puzzle puzzle={puzzle}/>
      </View>
    )
  }
}

export default PuzzleInfo
