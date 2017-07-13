// Left drift is coming from render styling maybe we can fix this top and left maybe we can find other way?
//take a look at ../reducers/constants/index to see the threshold to mess with that as well

import React from 'react'
import {
    Image,
    View,
    Dimensions,
    TouchableHighlight,
    Text
} from 'react-native'
import styles from './Styles/TreasureChestStyles'
import { connect } from 'react-redux'
import Camera from '../../Camera'

import { Images } from '../../../Themes'

let width = Dimensions.get('window').width

class TreasureChest extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            offScreenLeft: false,
            offScreenRight: false,
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
      this.props.screenProps.close()
      this.props.handleSubmit('Pass')
    }

    render() {
      return (
        <View style={styles.container}>
          <Camera close={this.props.screenProps.close} >
          <TouchableHighlight onPress={this.clickedTreasureChest}>
            <Image
              source={Images[this.props.findObj]}
              resizeMode='contain'
              style={[styles.arObject, styles.row, {
                top: this.props.arObject.startingPosY + this.props.yOffset,
                left: this.props.arObject.startingPosX + this.props.xOffset
              }]}
            />
          </TouchableHighlight>
          </Camera>
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
