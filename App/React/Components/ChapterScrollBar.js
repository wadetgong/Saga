import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Colors } from '../../Themes'
import styles from './Styles/ChapterScrollBarStyles'

const ChapterScrollBar = ({chapters, handleClick, selectedChap}) => {
  return (
    <View style={styles.scrollContainer}>
      <ScrollView
        style={{height: 50, backgroundColor: '#FAFAFA'}}
        centerContent={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {
          chapters.map((chapter, i) => {
            let buttonStyle = getBackgroundStyle(chapter, selectedChap)
            return (
              <TouchableOpacity
                key={i}
                onPress={() => handleClick(chapter.id)}
                disabled={!chapter.enabled}
              >
                <View style={[styles.chapterButton, buttonStyle]}>
                  <Text style={{color: getTextColor(chapter, selectedChap)}}>{chapter.id}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

const getBackgroundStyle = (chapter, selectedChap) => {
  if (chapter.id === selectedChap) {
    if (chapter.status === 'Complete') {
      return {
        borderColor: '#66CF66',
        backgroundColor: '#66CF66'
      }
    }
    return {
      borderColor: '#111111',
      backgroundColor: '#444444'
    }
  } else if (!chapter.enabled) {
    return {
      backgroundColor: 'lightgray',
      borderColor: 'lightgray'
    }
  } else {
    return chapter.status === 'Complete'
      ? {
        borderColor: '#16a916',
        backgroundColor: 'white'
      }
      : {
        borderColor: '#444444',
        backgroundColor: 'white'
      }
  }
}

const getTextColor = (chapter, selectedChap) => {
  if (!chapter.enabled) return 'gray'
  if (chapter.id === selectedChap) return 'white'
  return Colors.text
}

export default ChapterScrollBar
