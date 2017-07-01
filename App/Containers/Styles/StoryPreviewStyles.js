import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

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
  descriptionView: {
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  detailSection: {
    flex: .5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  mapSectionHeader: {
    fontFamily: Fonts.type.bold,
    alignSelf: 'center',
    paddingVertical: 10
  },
  mapSection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonSection: {
    flex: .5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignItems: 'center'
  }

})
