'use strict'

import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, Switch, Image, Dimensions, DeviceEventEmitter } from 'react-native';
import styles from './Styles/CameraScreenStyles.js';
import Camera from 'react-native-camera';
import TreasureChest from '../Components/Puzzle/TreasureChest';
import { Gyroscope } from 'NativeModules';
import { addArObject, updateGyroData } from '../Redux/actions/augmented';
import { connect } from 'react-redux';
import { Images } from '../Themes'

import {
    GYRO_MOVE_THRESHOLD_X,
    GYRO_MOVE_THRESHOLD_Y,
    MOVE_FACTOR_X,
    MOVE_FACTOR_Y
} from '../Redux/constants';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

 class CameraScreen extends Component {
  static navigationOptions = {
      title: 'Camera'
  }

  constructor(props) {
      super(props);
      this.state = {}
      this.handleArStart = this.handleArStart.bind(this);
      this.createAr = this.createAr.bind(this);
  }
  componentWillMount() {
      this.handleArStart();
  }
  componentDidMount() {
      console.log('initialize gyro')
      Gyroscope.setGyroUpdateInterval(0.04);
      this.unsubscribe = DeviceEventEmitter.addListener('GyroData', (data) => {
          if(data.rotationRate.y && data.rotationRate.x){
              data.rotationRate.y += 0.06;
              data.rotationRate.x -= 0.02;
              this.props.updateGyroData(data);
          }
      });
      Gyroscope.startGyroUpdates();
  }
  componentWillUnmount() {
    console.log('stopping gryo updates')
    Gyroscope.stopGyroUpdates();
    this.unsubscribe.remove();
  }
  handleArStart() {
      this.createAr();
  }
  createAr() {
      // let startingPosX = Math.random() * width * (Math.random() > 0.5 ? 1 : 1) + (width * 0.5);
      // let startingPosY = Math.random() * height * .75 * (Math.random() > 0.75 ? 1 : 1) + (height * .8);
      let startingPosX = 100
      let startingPosY = 100

      this.props.addArObject({
          startingPosX: startingPosX,
          startingPosY: startingPosY
      })
  }

  render() {
    console.log('dimensions', width, height)
    let arObj = this.props.arObject
    return (
      <View style={styles.camera}>
        <TouchableOpacity
          onPress={this.props.close}
          style={styles.modalClose}>
          <Image source={Images.closeButton} />
        </TouchableOpacity>
        <Camera
            ref={cam => { this.camera = cam }}
            style={styles.camera}
            aspect={Camera.constants.Aspect.fill}
            type={this.state.cameraType}>
            <Text style={styles.cameraText}> </Text>
            {
              this.props.children
            }
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

function mapDispatchToProps(dispatch) {
    return {
        addArObject: arObj => dispatch(addArObject(arObj)),
        updateGyroData: data => dispatch(updateGyroData(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CameraScreen);
