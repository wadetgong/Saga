import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'

import { Colors } from '../Themes'
import styles from './Styles/ChapterScrollBarStyles'

class ChapterScrollBar extends React.Component {
  constructor() {
    super()
  }

  getBackgroundStyle(chapter) {
    if(chapter.id === this.props.selectedChap) {
      return {
        borderColor: Colors.fire,
        backgroundColor: Colors.buttonActive
      }
    }
    else if (!chapter.enabled) {
      return {
        backgroundColor: 'lightgray',
        borderColor: 'lightgray'
      }
    }
    return {
      borderColor: Colors.fire,
      backgroundColor: 'white'
    }
  }

  getTextColor(chapter) {
    if(!chapter.enabled) {
      return 'gray'
    }
    return Colors.text;
  }

  render() {
    console.log('chapter props in scrollbar', this.props.chapters, this.props.chapters[0])
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
              let buttonStyle = this.getBackgroundStyle(chapter)
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => this.props.handleClick(chapter.id)}
                  disabled={!chapter.enabled}
                >
                  <View style={[styles.chapterButton, buttonStyle]}>
                    <Text style={{color:this.getTextColor(chapter)}}>{chapter.id}</Text>
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
