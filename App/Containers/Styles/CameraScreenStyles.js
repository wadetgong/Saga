import { StyleSheet, Dimensions } from 'react-native';

let cameraStyles = StyleSheet.create({
    camera: {
        backgroundColor: 'transparent',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    cameraText: {
        color: '#FFF',
    },
    cameraStream: {
        height: 200
    }
})

export default cameraStyles;