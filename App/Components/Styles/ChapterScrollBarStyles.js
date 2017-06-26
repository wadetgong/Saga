import {StyleSheet} from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.borderGray,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    height: 50
  },
  chapterButton: {
    borderColor: Colors.fire,
    borderWidth: 1,
    alignItems:'center',
    justifyContent:'center',
    width:40,
    height:40,
    borderRadius: 100,
    marginVertical: 5,
    marginHorizontal: 1,
  }
})
