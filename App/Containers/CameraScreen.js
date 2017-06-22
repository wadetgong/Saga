'use strict'

import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch, Image } from 'react-native';
import cameraStyles from './Styles/CameraScreenStyles.js';
import Camera from 'react-native-camera';

export default class CameraScreen extends Component {
    static navigationOptions = {
        title: 'Camera'
    }

    constructor() {
        super();

        this.state = {
            cameraType: Camera.constants.Type.back,
            frame: 1,
        }
    }

    render() {
        return (
            <Camera
                ref={cam => { this.camera = cam}}
                style={cameraStyles.camera}
                aspect={Camera.constants.Aspect.fill}
                type={this.state.cameraType}>

                </Camera>
        )
    }
}