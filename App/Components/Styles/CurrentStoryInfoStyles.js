import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  rowContainer: {flex: 1, flexDirection: 'row'},
  buttonCol: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyButton: {
    borderRadius: 3,
    paddingHorizontal: 25,
    paddingVertical: 5,
    backgroundColor: Colors.buttonStandard,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    width: '60%'
  },
  declineButton: {
    borderRadius: 3,
    paddingHorizontal: 25,
    paddingVertical: 5,
    margin: 5,
    backgroundColor: Colors.charcoal,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%'
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontSize: 12
  }
})
