import React, { Component } from 'react';
import {
    Image,
    View,
    Dimensions,
    TouchableHighlight,
    Text
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

class BreakOpen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offScreenLeft: false,
            offScreenRight: false,
            timesClicked: 1,
        }
        this.clickedTreasureChest = this.clickedTreasureChest.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if ((nextProps.arObject.startingPosX + nextProps.xOffset) < 0) {
            this.setState({ offScreenLeft: true });
        } else {
            this.setState({ offScreenLeft: false });
        }
        if ((nextProps.arObject.startingPosX + nextProps.xOffset) > width) {
            this.setState({ offScreenRight: true });
        } else {
            this.setState({ offScreenRight: false });
        }
    }
    shouldComponentUpdate(nextProps) {
        return (
            this.props.xOffset != nextProps.xOffset ||
            this.props.yOffset != nextProps.yOffset
        )
    }
    clickedTreasureChest() {
        this.setState({ timesClicked: this.state.timesClicked + 1})
        alert('Box was clicked' + this.state.timesClicked);

    }

    render() {
        // console.log('top is?????? ', this.props.arObject.startingPosY + this.props.yOffset, this.props.arObject.startingPosY, this.props.yOffset )
        // console.log('left is?????? ', this.props.arObject.startingPosX + this.props.xOffset, this.props.arObject.startingPosX, this.props.xOffset )
        return (
            <View style={styles.container}>
                <Text> Click the Box until it Breaks! </Text>
                <TouchableHighlight onPress={this.clickedTreasureChest}>
                    <Image
                        source={require('../../Images/treasureChest.png')}
                        resizeMode='contain'
                        style={[styles.arObject, styles.row, {
                            top: this.props.arObject.startingPosY + this.props.yOffset,
                            left: this.props.arObject.startingPosX + this.props.xOffset 
                        }]}
                    />
                </TouchableHighlight>
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