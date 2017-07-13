import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../../Themes/'

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
  groupLabel: {
    alignSelf: 'center',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin,
    color: 'gray'
  },
  joinedSection: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginHorizontal: '25%',
    justifyContent: 'center',
    marginBottom: 10
  },
  invitedSection: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginHorizontal: '25%',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

})
