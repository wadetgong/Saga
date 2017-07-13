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
  profileSection: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 10
  },
  pictureContainer: {
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
    overflow: 'hidden',
    borderColor: 'lightgray'
  },
  userDetailsSection: {
    padding: 10,
    flexDirection: 'column',
    borderColor: Colors.border,
    borderWidth: 1,
    flex: 1,
    borderBottomRightRadius: 3,
    borderTopRightRadius: 3,
    borderColor: 'lightgray'
  },
  logoutButton: {
    margin: 5,
    width: 100,
    borderRadius: 3,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: 'gray',
  },
  logoutText: {
    color: Colors.snow,
    textAlign: 'center',
    fontSize: 12
  }
})
