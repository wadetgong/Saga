import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  rowSection: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  addFriend: {
    // marginVertical: 5,
    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // backgroundColor: Colors.buttonActive,
    backgroundColor: Colors.buttonStandard,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontSize: 12
  },
  nameSection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 5,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  addFriendSection: {
    flex: .25,
    paddingTop: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  icon: {
    paddingHorizontal: 5,
    justifyContent: 'center'
  }

})
