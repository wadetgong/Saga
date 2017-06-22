import { StyleSheet, Dimensions } from 'react-native';

let styles = StyleSheet.create({
    arObject: {
        position: 'absolute',
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height / 3,
        paddingTop: 800,
        marginLeft: 80
    },
    row: flex('row', 'wrap'),
    container: {
        position: 'absolute',
    }
    
})

export function flex(direction = 'column', wrap = 'nowrap') {
    return {
        flexDirection: direction,
        flexWrap: wrap
    };
};

export default styles

