import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  imageHeaderSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyBG: {
    marginTop: 20,
    height: 240,
    width: '100%',
    opacity: 0.75,
    top: 0,
  },
  passImage: {
    position: 'absolute',
    zIndex: 5
  },
  timeSection: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    textAlign: 'center'
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
  },
  teammateSection: {
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 10,
    borderColor: 'gray',
    borderBottomWidth: 1
  },
  teammateText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: 'gray',
    fontSize: 16
  },
  friendList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }

})
