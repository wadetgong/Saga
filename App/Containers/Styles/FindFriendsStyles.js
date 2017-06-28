import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
})
