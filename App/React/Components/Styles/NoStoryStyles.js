import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  bgImage: {
    padding: 0,
    margin: 0,
    height: 240,
    width: '100%',
    top: 0,
    opacity: 0.4,
    position: 'absolute',
  },
  cardContainer: {
    marginTop: 220,
    marginHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    shadowColor: 'gray',
    shadowOffset: {width: -2, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.5
  },
  cardHeaderContainer: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: '#f2f2f2',
    paddingVertical: 5,
    paddingHorizontal: 7,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 30,
    justifyContent: 'flex-end'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  },
  cardBody: {
    fontSize: 20,
    fontStyle: 'italic'
  }
})
