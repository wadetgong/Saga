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
    //width: Metrics.screenWidth,
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
  bgImage: {
    padding: 0,
    margin: 0,
    height: 240,
    width: '100%',
    top: 0,
    opacity: 0.4,
    position: 'absolute',
  },
  modalClose: {
    position: 'absolute',
    paddingVertical: 2,
    paddingHorizontal: 10,
    zIndex: 10
  },
  puzzleCard: {
    marginTop: 140,
    marginHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    shadowColor: 'gray',
    shadowOffset: {width: -2, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.5
  },
  puzzleCardHeader: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: '#f2f2f2',
    paddingVertical: 5,
    paddingHorizontal: 7,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  infoText: {
    padding: 10,
    backgroundColor: 'beige',
  },
  completeText: {
    padding: 10,
    position: 'absolute',
    marginHorizontal: 30,
    marginBottom: 10,
    backgroundColor: '#dff0d8',
    borderColor: '#d0e9c6',
    borderWidth: 1,
    borderRadius: 5,
    width: Metrics.screenWidth - 60
  },
  icon: {
    paddingHorizontal: 1,
    justifyContent: 'center'
  },
  helperText: {
    position: 'absolute',
    top: 26,
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    width: '100%',
    zIndex: 10,
    backgroundColor: '#f2f2f2',
  }
})
