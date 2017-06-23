import React, { Component } from 'react';
import {
    Image,
    View
} from 'react-native';
import styles from './Styles/TreasureChestStyles';
import { connect } from 'react-redux';


class TreasureChest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offScreenLeft: false,
            offScreenRight: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../Images/treasureChest.png')}
                    resizeMode='contain'
                    style={[styles.arObject, styles.row]}
                    />
            </View>
        )
    }
}

export default TreasureChest;