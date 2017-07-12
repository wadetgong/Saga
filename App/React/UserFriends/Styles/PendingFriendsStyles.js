import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  containerSection: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 10
  },
  sectionHeader: {
    paddingTop: Metrics.doubleBaseMargin,
    width: Metrics.screenWidth,
    alignSelf: 'center',
    margin: Metrics.baseMargin,
    backgroundColor: Colors.background
  },
  sentLabel: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginHorizontal: '25%',
    justifyContent: 'center',
    marginBottom: 10
  },
  receivedLabel: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginHorizontal: '25%',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  friendSectionLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: Metrics.smallMargin,
    color: 'gray'
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  friendSearchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 10
  }

})
