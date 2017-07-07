import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  sectionHeader: {
    paddingTop: Metrics.doubleBaseMargin,
    width: Metrics.screenWidth,
    alignSelf: 'center',
    margin: Metrics.baseMargin,
    backgroundColor: Colors.transparent
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  completeText: {
    marginTop: 25,
    marginHorizontal: 10,
    marginBottom: -10,
    padding: 10,
    backgroundColor: '#dff0d8',
    borderColor: '#d0e9c6',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderRadius: 5
  }

})
