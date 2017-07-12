import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../../../Themes/'

export default StyleSheet.create({
  button: {
    marginVertical: 2.5,
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  buttonText: {
    margin: 18,
    textAlign: 'center',
    color: Colors.snow,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold
  }
})
