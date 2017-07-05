import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  sectionHeader: {
    padding: Metrics.baseMargin,
    width: Metrics.screenWidth,
    alignSelf: 'center',
    margin: Metrics.baseMargin,
    backgroundColor: Colors.background,
    position: 'absolute',
    bottom: 0,
    opacity: 0.9,
    zIndex: 10
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  conclusionDesc: {
    padding: 10,
    margin: 10,
    backgroundColor: 'beige',
    borderWidth: 1,
    borderColor: 'lightgray',
  }

})
