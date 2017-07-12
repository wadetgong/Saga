import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../../Themes/'

export default StyleSheet.create({
  rowContainer: {flex: 1, flexDirection: 'row'},
  buttonCol: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    borderRadius: 3,
    paddingHorizontal: 25,
    paddingVertical: 5,
    backgroundColor: Colors.buttonStandard,
    justifyContent: 'center',
    alignItems: 'center'
  },
  declineButton: {
    borderRadius: 3,
    paddingHorizontal: 25,
    paddingVertical: 5,
    backgroundColor: Colors.charcoal,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontSize: 13
  }
})
