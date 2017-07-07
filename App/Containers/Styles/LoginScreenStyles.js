import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  videoContainer: {
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center'
  },
  titleSection: {
    marginTop: '55%',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 15,
    width: '100%',
    zIndex: 10,
    backgroundColor: Colors.transparent,
    position: 'absolute'
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.75,
    height: '100%',
    'width': '100%',
    zIndex: -5
  },
  loginSection: {
    marginTop: '85%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.transparent,
  },
  footer: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: Colors.background,
    width: '100%'
  }
})
