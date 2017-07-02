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
  logo: {
    // height: Metrics.images.logo,
    // width: Metrics.images.logo,
    height: 200,
    width: '100%',
    // resizeMode: 'contain',
    alignItems: 'center',
  },
  centeredOverlay: {
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: .5,
    position: 'absolute'
  },
  modalClose: {
    position: 'absolute',
    paddingTop: 10,
    paddingHorizontal: 5,
    zIndex: 10
  },
  infoText: {
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'beige',
    borderWidth: 1,
    borderColor: 'lightgray',
    // borderRadius: 5
  },
  completeText: {
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#dff0d8',
    borderColor: '#d0e9c6',
    borderWidth: 1,
    borderRadius: 5
  }
})
