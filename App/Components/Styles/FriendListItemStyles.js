import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  rowImage:{
    width: 100,
    height: 100
  },
  infoCard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  inviteButton: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    width: '60%',
    backgroundColor: Colors.buttonStandard,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
  },
  invitedButton: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    width: '60%',
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center'
  },
})
