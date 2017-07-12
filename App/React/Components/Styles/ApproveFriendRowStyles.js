import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  rowSection: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  icon: {
    paddingHorizontal: 5,
    justifyContent: 'center'
  },
  userDescription: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  approveSection: {
    flex: 1,
    flexDirection: 'row'
  },
  confirmSection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    borderRadius: 3,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: Colors.buttonStandard,
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmText: {
    color: Colors.snow,
    textAlign: 'center',
    fontSize: 12
  },
  declineSection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  declineButton: {
    borderRadius: 3,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: Colors.charcoal,
    justifyContent: 'center',
    alignItems: 'center'
  },
  declineText: {
    color: Colors.snow,
    textAlign: 'center',
    fontSize: 12
  }
})
