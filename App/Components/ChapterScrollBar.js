import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'

import { Colors } from '../Themes'
import styles from './Styles/ChapterScrollBarStyles'

class ChapterScrollBar extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <View style={styles.scrollContainer}>
        <View style={{padding: 5}}>
          <Text>Chapter:</Text>
        </View>
        <ScrollView
          style={{height: 50}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {
            this.props.chapters.map((chapter,i) => {
              let buttonColor = chapter.id === this.props.selectedChap
                ? Colors.buttonActive
                : 'white'
              return (
                <TouchableOpacity key={i} onPress={() => this.props.handleClick(chapter.id)}>
                  <View style={[styles.chapterButton, {backgroundColor: buttonColor}]}>
                    <Text style={{color:Colors.text}}>{chapter.id}</Text>
                  </View>
                </TouchableOpacity>
              )})
          }
        </ScrollView>
      </View>
    )
  }
}

export default ChapterScrollBar
