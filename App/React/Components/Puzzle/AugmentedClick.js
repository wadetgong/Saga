import React, { Component } from 'react'
import { Image, View, Dimensions, TouchableHighlight, Text } from 'react-native'
import styles from './Styles/TreasureChestStyles'
import { connect } from 'react-redux'
import Camera from '../../Camera'

let width = Dimensions.get('window').width
class BreakOpen extends Component {
  constructor (props) {
    super(props);
    this.state = {
      offScreenLeft: false,
      offScreenRight: false,
      timesClicked: 1,
      progress: 0,
    }
    this.clickedTreasureChest = this.clickedTreasureChest.bind(this);
  }
  componentWillReceiveProps (nextProps) {
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
  shouldComponentUpdate (nextProps) {
    return (
      this.props.xOffset != nextProps.xOffset ||
      this.props.yOffset != nextProps.yOffset
    )
  }
  clickedTreasureChest () {
    if (this.state.timesClicked > 34) {
      this.props.handleSubmit('Pass')
      // this.forceUpdate();
    }
    this.setState({
      timesClicked: this.state.timesClicked + 1,
      progress: Math.round(this.state.timesClicked / 35 * 100 )
    })
    // this.forceUpdate();  // can probably remove this when running non-simulator version
  }
      // cracked the code!!
  render () {
    // console.log('top is?????? ', this.props.arObject.startingPosY + this.props.yOffset, this.props.arObject.startingPosY, this.props.yOffset )
    // console.log('left is?????? ', this.props.arObject.startingPosX + this.props.xOffset, this.props.arObject.startingPosX, this.props.xOffset )
    return (
      (this.state.timesClicked < 35) ?
        <View style={styles.container}>
          <Camera close={this.props.screenProps.close} >
            {/*<Text style={{ color: 'white', fontSize: 15, top: 0, left: 50 }}> Keep on Clicking to Break the Code! </Text>*/}
            <Text style={{color: 'green', fontSize: 30, top: 40, left: width * .255 }}> {this.state.progress}% Cracked! </Text>
            <TouchableHighlight onPress={this.clickedTreasureChest}>
              <Image
                source={require('../../../Images/codeBreak.jpg')}
                resizeMode='contain'
                style={[styles.arObject, styles.row, {
                    top: this.props.arObject.startingPosY + this.props.yOffset,
                    left: this.props.arObject.startingPosX + this.props.xOffset
                }]}
              />
            </TouchableHighlight>
          </Camera>
        </View>
        :
        <View>
          <Camera close={this.props.screenProps.close} >
            <Text style={{
                color: 'green',
                fontSize: 30,
                top: 40,
                left: width * .125
            }}> Code Cracked! </Text>
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
export default connect(mapStateToProps)(BreakOpen);
