import { StyleSheet, Dimensions } from 'react-native';

let cameraStyles = StyleSheet.create({
  camera: {
      backgroundColor: 'transparent',
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
  },
  cameraText: {
      color: '#FFF',
      position: 'absolute',
      marginTop: 50,
      marginLeft: 80
  },
  cameraStream: {
      height: 200
  },
  modalClose: {
    position: 'absolute',
    paddingVertical: 32,
    paddingHorizontal: 10,
    zIndex: 20
  }
})

export default cameraStyles;
