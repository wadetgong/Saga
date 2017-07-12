import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'


let width = Dimensions.get('window').width - 20

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  nameTag: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    opacity: 0.75,
    width: .31333 * width,
    textAlign: 'center'
  },
  touch: {
    // backgroundColor: 'red',
    margin: 0.01 * width,
    width: .31333 * width,
    height: .31333 * width,
  },
  image: {
    width: .31333 * width,
    height: .31333 * width,
  },
})
