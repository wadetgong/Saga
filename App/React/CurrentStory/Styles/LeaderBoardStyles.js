import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  imageHeaderSection: {
    marginTop: 20,
    height: 200,
    width: '100%',
    opacity: 0.75,
    top: 0,
  },
  headerTitleSection: {
    padding: Metrics.baseMargin,
    width: Metrics.screenWidth,
    alignSelf: 'center',
    margin: Metrics.baseMargin,
    backgroundColor: Colors.background,
    position: 'absolute',
    bottom: 0,
    opacity: 0.9
  },
  sectionTitle: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.text,
    textAlign: 'center',
  },
  leaderBoardSection: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 15
  },
  leaderBoardHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'lightgray'
  }
})
