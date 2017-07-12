import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {flex: 1, padding: 10},
  currentLabel: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginHorizontal: '25%',
    justifyContent: 'center',
    marginBottom: 10
  },
  pendLabel: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginHorizontal: '25%',
    justifyContent: 'center',
    marginBottom: 10
  },
  headerText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: Metrics.smallMargin,
    color: 'gray'
  },
  noRequests: {fontStyle: 'italic', textAlign: 'center', width: '100%'},


})
