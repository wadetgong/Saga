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
  cancelSection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  cancelButton: {
    borderRadius: 3,
    margin: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.fire,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelText: {
    color: Colors.snow,
    textAlign: 'center',
    fontSize: 12
  }
})
