'use strict'

import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch, Image, Dimensions, DeviceEventEmitter } from 'react-native';
import cameraStyles from './Styles/CameraScreenStyles.js';
import Camera from 'react-native-camera';
import TreasureChest from '../Components/TreasureChest';
import { Gyroscope } from 'NativeModules';
import { addArObject, updateGyroData } from '../Redux/actions/augmented';
import { connect } from 'react-redux';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

 class CameraScreen extends Component {
    static navigationOptions = {
        title: 'Camera'
    }

    constructor(props) {
        super(props);
        this.state = {
            cameraType: Camera.constants.Type.back,
            frame: 1,
        }
        this.handleArStart = this.handleArStart.bind(this);
        this.createAr = this.createAr.bind(this);
    }
    componentDidMount() {
        Gyroscope.stopGyroUpdates();
        Gyroscope.setGyroUpdateInterval(0.05);
        DeviceEventEmitter.addListener('GyroData', this.props.updateGyroData);
    }
    componentWillUnmount() {
        Gyroscope.stopGyroUpdates();
    }
    componentDidUpdate() {
        this.handleArStart();
    }
    handleArStart() {
        Gyroscope.startGyroUpdates();
        this.createAr();
    }
    createAr() {
        let startingPosX = Math.random() * width * (Math.random() > 0.5 ? -1 : 1) + (width * 0.5);
        let startingPosY = Math.random() * height * .75(Math.random() > 0.5 ? -1 : 1) + (height * .8);

        this.props.addArObject({
            startingPosX: startingPosX,
            startingPosY: startingPosY
        })
    }

    render() {
        let arObj = this.props.arObject
        console.log('what is props? ', this.props );
        return (
            <Camera
                ref={cam => { this.camera = cam }}
                style={cameraStyles.camera}
                aspect={Camera.constants.Aspect.fill}
                type={this.state.cameraType}>
                <Text style={cameraStyles.cameraText}> Find the Treasure Chest!! </Text>
                <TreasureChest
                    startingPosX={arObj.startingPosX}
                    startingPosY={arObj.startingPosY}
                />
            </Camera>
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