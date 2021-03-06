'use strict'
import React from 'react'
import { StyleSheet, Text, View, Switch, Image, Dimensions, DeviceEventEmitter, TouchableOpacity } from 'react-native'
import styles from './Styles/CameraStyles.js'
import Camera from 'react-native-camera'
import { Gyroscope, DeviceAngles } from 'NativeModules'
import { addArObject, updateGyroData } from '../Redux/AugmentedRedux'
import { connect } from 'react-redux'
import { Images } from '../Themes'

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height
// DeviceAngles.setDeviceMotionUpdateInterval(0.1)

 class CameraScreen extends React.Component {
  static navigationOptions = {
      title: 'Camera'
  }

  constructor (props) {
    super(props);

    // wadestuff
    this.state = {
      rotX: 0, // wadestuff
      rotY: 0, // wadestuff
      rotZ: 0, // wadestuff
      pitch: 0,
      roll:0,
      yaw:0
    }
    // wadestuff

    this.handleArStart = this.handleArStart.bind(this);
    this.createAr = this.createAr.bind(this);
  }
  componentWillMount () {
    this.handleArStart()
    // DeviceAngles.startMotionUpdates()
    Gyroscope.setGyroUpdateInterval(0.1)
    Gyroscope.startGyroUpdates()
  }

  componentDidMount () {
    console.log('initialize gyro')
    this.gyro = (data) => {
      if(data.rotationRate.y && data.rotationRate.x){
        data.rotationRate.y //+= 0.06;
        data.rotationRate.x //-= 0.02;
        this.props.updateGyroData(data);
        //wade stuff
        this.setState({
          rotX: data.rotationRate.x,
          rotY: data.rotationRate.y,
          rotZ: data.rotationRate.z
        })
      }
    }

    DeviceEventEmitter.addListener('GyroData', this.gyro);
    // this.angle = (data) => {
    // // console.log(data.pitch);
    // // console.log(data.roll);
    // // console.log(data.yaw);
    //   this.setState({
    //     pitch: data.pitch,
    //     yaw: data.yaw,
    //     roll: data.roll,
    //   })
    // }
    // DeviceEventEmitter.addListener('AnglesData', this.angle);
  }

  componentWillUnmount() {
    console.log('stopping gryo updates')
    DeviceEventEmitter.removeListener('GyroData', this.gyro)
    // DeviceEventEmitter.removeListener('AnglesData', this.angle)
    Gyroscope.stopGyroUpdates();
    // DeviceAngles.stopMotionUpdates();
  }
  handleArStart() {
    this.createAr();
  }
  createAr() {
    let startingPosX = 100 + 150 * (Math.random() > 0.5 ? 1 : -1)
    //let startingPosX = 100 + 400 * (Math.random() > 0.5 ? 1 : -1)
    let startingPosY = 125 + 25 * (Math.random() > 0.5 ? 1 : -1)

    this.props.addArObject({
      startingPosX: startingPosX,
      startingPosY: startingPosY
    })
  }

  render() {
    let arObj = this.props.arObject
    return (
      <View style={styles.camera}>
        <View style={{position: 'absolute', backgroundColor: 'gray', zIndex: 10, height: 20, marginTop: 50}}>
          {/*<Text>w: {width} h: {height} rotX: {this.state.rotX.toFixed(4)} rotY: {this.state.rotY.toFixed(4)} rotZ: {this.state.rotZ.toFixed(4)}</Text>
          <Text>pitch: {this.state.pitch.toFixed(4)} yaw: {this.state.yaw.toFixed(4)} roll: {this.state.roll.toFixed(4)}</Text>*/}
        </View>
        <TouchableOpacity onPress={this.props.close} style={styles.modalClose}>
          <Image source={Images.closeButton} style={{height: 12, width: 12}}/>
        </TouchableOpacity>
        <Camera
            ref={cam => { this.camera = cam }}
            style={styles.camera}
            aspect={Camera.constants.Aspect.fill}
            type={this.state.cameraType}>
            {
              this.props.children
            }
        </Camera>
      </View>
    )
  }
}

function mapState({ augmented }) {
  return {
    ...augmented
  }
}

function mapDispatch(dispatch) {
  return {
    addArObject: arObj => dispatch(addArObject(arObj)),
    updateGyroData: data => dispatch(updateGyroData(data)),
  }
}

export default connect(mapState, mapDispatch)(CameraScreen);
