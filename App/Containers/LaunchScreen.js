import React from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
// import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import RoundedButton from '../Components/Button/RoundedButton'
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends React.Component {
  render () {
    const { navigate } = this.props.navigation

    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>


          <View style={styles.section} >
            <Image source={Images.ready} />
            <Text style={styles.sectionText}>
              Text Here
            </Text>
          </View>

          <RoundedButton onPress={() => navigate('PhotoRecognition')}>
            PhotoRecognition
          </RoundedButton>
          <RoundedButton onPress={() => navigate('LoginScreen')}>
            Login
          </RoundedButton>
          <RoundedButton onPress={() => navigate('Chapter')}>
            Map
          </RoundedButton>
          <RoundedButton onPress={() => navigate('TextablesScreen')}>
            Textables
          </RoundedButton>
          <RoundedButton onPress={() => navigate('CameraScreen')}>
            Camera
          </RoundedButton>
      
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>


      
        </ScrollView>
      </View>
    )
  }
}
