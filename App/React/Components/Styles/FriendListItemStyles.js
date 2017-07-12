import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  rowImage:{
    width: 64,
    height: 64
  },
  infoCard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 5,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  inviteSection: {
    flex: .75,
    paddingTop: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
  },
  invitedButton: {
    // marginVertical: 5,
    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 5,
    // backgroundColor: Colors.buttonActive,
    backgroundColor: Colors.buttonStandard,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
