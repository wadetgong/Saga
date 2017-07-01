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
    backgroundColor: Colors.background
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  paddedDiv: {
    padding: 15,
  },
  completeText: {
    padding: 10,
    // margin: 10,
    // backgroundColor: 'lightgray',
    borderColor: 'gray',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    // borderWidth: 1,
    // borderRadius: 5
  }

})
