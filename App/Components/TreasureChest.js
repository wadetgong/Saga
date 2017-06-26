import React, { Component } from 'react';
import {
    Image,
    View,
    Dimensions
} from 'react-native';
import styles from './Styles/TreasureChestStyles';
import { connect } from 'react-redux';

import {
    GYRO_MOVE_THRESHOLD_X,
    GYRO_MOVE_THRESHOLD_Y,
    MOVE_FACTOR_X,
    MOVE_FACTOR_Y
} from '../Redux/constants';

let width = Dimensions.get('window').width

class TreasureChest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offScreenLeft: false,
            offScreenRight: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if((nextProps.startingPosX + nextProps.xOffset) < 0) {
            this.setState({ offScreenLeft: true});
        } else {
            this.setState({ offScreenLeft: false});
        }
        if((nextProps.startingPosX + nextProps.xOffset) > width ) {
            this.setState({ offScreenRight: true});
        } else {
            this.setState({ offScreenRight: false});
        }
    }
    shouldComponentUpdate(nextProps) {
        return (
            this.props.xOffset != nextProps.xOffset ||
            this.props.yOffset != nextProps.yOffset
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../Images/treasureChest.png')}
                    resizeMode='contain'
                    style={[styles.arObject, styles.row, {
                        top: this.props.startingPosY + this.props.yOffset,
                        left: this.props.startingPosX + this.props.xOffset
                    }]}
                    />
            </View>
        )
    }
}

function mapStateToProps({ augmented }) {
    return {
        ...augmented
    }
}

export default connect(
    mapStateToProps
)(TreasureChest);