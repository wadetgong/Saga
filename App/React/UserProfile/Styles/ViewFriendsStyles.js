import { StyleSheet, } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'


export default StyleSheet.create({
  ...ApplicationStyles.screen,
  friendLabel: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginHorizontal: '25%',
    justifyContent: 'center',
    marginBottom: 10
  },
  friendLabelText: {
    alignSelf: 'center',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin,
    color: 'gray'
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
})
