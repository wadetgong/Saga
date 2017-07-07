import React, { Component } from 'react';
import { Image, View, Dimensions, TouchableHighlight, PanResponder, Animated, Text } from 'react-native';
import styles from './Styles/TreasureChestStyles';
import { connect } from 'react-redux';
import {
  GYRO_MOVE_THRESHOLD_X,
  GYRO_MOVE_THRESHOLD_Y,
  MOVE_FACTOR_X,
  MOVE_FACTOR_Y
} from '../../Redux/constants';

import CameraScreen from '../../Containers/CameraScreen'

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height
let fiveOFive = 505;
let oneOneFive = 115;
let threeOh = 30;

class TreasureChest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offScreenLeft: false,
      offScreenRight: false,
      pan: new Animated.ValueXY(),
      hasKey: false,
      foundBooty: false
    }
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.state.pan.setOffset(this.state.pan.__getValue());               // allows for dragged object to stay in location you dragged too
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, {
        dx: this.state.pan.x,
        dy: this.state.pan.y
      }]),
      onPanResponderRelease: (e, gesture) => {
        // ************ THIS IS NOW WORKING EXAMPLE JUST NEED SWITCH CONSTANTS TO VARIABLE WHEN GOING INTO PRODUCTION **********************
        // console.log('WHAT IS GESTURE?!?!?!??!?!??!?!?!<!>!><!#>?!>$?<?!<', gesture)
        // console.log('WHAT IS THE TOP LOWRANGE?!?!?!??!?!',200 - 50 + this.props.yOffset)
        // console.log('WHAT is the TOP HIGHRANGE???', 250 + this.props.yOffset)
        // console.log('WHAT IS LOW XRANGE', 50 + this.props.xOffset)
        // console.log('WHAT IS THE HIGH XRANGE', 150 + this.props.xOffset)
        this.state.pan.flattenOffset()
        if(this.props.arObject.startingPosY + this.props.yOffset <= gesture.moveY
        && gesture.moveY <= this.props.arObject.startingPosY + 200 + this.props.yOffset  // add 200 to origin amount thats how we got to y-400 and x-300 but for props will need to + 200 on each
        && this.props.arObject.startingPosX + this.props.xOffset <=  gesture.moveX
        && gesture.moveX <= this.props.arObject.startingPosX + 200 + this.props.xOffset) {
            this.unlockChest();
        }
      }     // part of allowing dragged object to stay in loacation
    })
    this.clickedTreasureChest = this.clickedTreasureChest.bind(this);
    this.foundKey = this.foundKey.bind(this);
    this.unlockChest = this.unlockChest.bind(this);
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
      if (!this.state.hasKey) alert('The Treasure Chest is locked! Find the key to open it');
      if (this.state.hasKey) alert('Use the Key to Open the Treasure Chest!')
    }
    foundKey() {
      this.setState({ hasKey: true });
    }
    unlockChest() {
      //this.props.screenProps.close()
      this.setState({ foundBooty: true })
      this.props.handleSubmit('Pass')
    }

    whichKey() {
      return (
        this.state.hasKey
        ? <View style={{ position: 'absolute', top: sixOhFive, left: oneOneFive }}>
            <Text style={{ color: 'white', fontSize: 32, top: threeOh, left: -oneOneFive }}> ITEMS: </Text>
            <Animated.Image
              source={require('../../Images/key.png')}
              {...this.PanResponder.panHandlers}
              resizeMode='contain'
              style={[this.state.pan.getLayout(), styles.key, styles.row,]}
            />
          </View>
        : <View style={styles.container}>
            <Text style={{ color: 'white', fontSize: 32, top: 635, left: 0 }}> ITEMS: </Text>
            <TouchableHighlight onPress={this.foundKey}>
              <Image
                source={require('../../Images/key.png')}
                resizeMode='contain'
                style={[styles.key, styles.row, {
                    top: 100 + this.props.yOffset,
                    left: 500 + this.props.xOffset,
                }]}
              />
            </TouchableHighlight>
          </View>
      )
    }

    render() {
      return (
        <View style={styles.container}>
          <CameraScreen close={this.props.screenProps.close} >
          {
            (!this.state.foundBooty)
            ? <View>
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
                {this.whichKey()}
              </View>
            : <View>
                <Text style={{ color:'black', fontSize: 24, top: 20, left: 95 }}>Treasure Found!</Text>
                <Image
                    source={require('../../Images/piratesBooty.png')}
                    resizeMode='contain'
                    style={[styles.booty, { top: this.props.arObject.startingPosY + this.props.yOffset, left: this.props.arObject.startingPosX + this.props.xOffset }]}
                />
              </View>
          }
          </CameraScreen>
        </View>
        )
    }
}
function mapStateToProps({ augmented }) {
  return {
    ...augmented
  }
}
export default connect(mapStateToProps)(TreasureChest);
