import React from 'react'
import firebaseApp from '../../../Firebase'
import { View, StyleSheet } from 'react-native'
import Camera from 'react-native-camera'
import { connect } from 'react-redux'
import RoundedButton from '../Button/RoundedButton'
import RNFetchBlob from 'react-native-fetch-blob'
/* global Blob */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
})

class Vision extends React.Component {
  constructor () {
    super()

    this.uid = firebaseApp.auth().currentUser.uid
    this.takePictureAndClose = this.takePictureAndClose.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
  }

  uploadImage (uri, imageRef) {
    const mime = 'image/jpeg'
    return new Promise((resolve, reject) => {
      // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null

      return RNFetchBlob.fs.readFile(uri, 'base64')
        .then(data => Blob.build(data, { type: `${mime};BASE64` }))
        .then(blob => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          return url
        })
        .catch(err => console.error('File not uploaded to Storage', err))
    })
  }

  takePictureAndClose () {
    const options = {}
    const { puzzleUrl, screenProps } = this.props
    const { close } = screenProps

    const Blob = RNFetchBlob.polyfill.Blob
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob

    this.camera.capture({ metadata: options })
      .then(data => {
        // path/mediaUri: assets-library://asset/asset.JPG?id=C071D9B5-3410-43AB-9B00-2528C9E57FEF&ext=JPG
        console.log('takePicture, save to google storage, and photorecognition', data)
        const imageRef = firebaseApp.storage().ref(puzzleUrl)
        return this.uploadImage(data.path, imageRef)
      })
      .catch(err => console.error('Taking Picture in PhotoRecog failed', err))
    close() // close modal
  }

  render () {
    return (
      <View style={styles.container}>
        <Camera
          ref={cam => { this.camera = cam }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
        >
          <RoundedButton
            text='CAPTURE'
            onPress={() => this.takePictureAndClose()}
          />
        </Camera>
      </View>
    )
  }
}

const mapState = state => ({
  puzzleUrl: state.currentStory.puzzleUrl
})

export default connect(mapState)(Vision)
