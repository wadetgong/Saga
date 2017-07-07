import { StyleSheet, Dimensions } from 'react-native';
// iphone 5 height is 568 and width is 320
let styles = StyleSheet.create({
  arObject: {
    position: 'absolute',
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 3,
  },
  key: {
    position: 'absolute',
    width: Dimensions.get('window').width / 5,
    height: Dimensions.get('window').height / 10.5,
  },
  row: flex('row', 'wrap'),
  container: {
    position: 'absolute',
  },
  booty: {
    position: 'absolute',
    width: Dimensions.get('window').width / 1.5,
    height: Dimensions.get('window').height / 3
  }

})
export function flex(direction = 'column', wrap = 'nowrap') {
  return {
    flexDirection: direction,
    flexWrap: wrap
  };
};
export default styles
