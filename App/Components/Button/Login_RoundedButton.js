import React from 'react'
import { Text, View } from 'react-native'
import RoundedButton from './RoundedButton'

export default class Login_RoundedButton extends React.Component {

    render () {
        console.log('props in Login button', this.props)
        const { navigate } = this.props
        console.log(navigate);
        return (
          <RoundedButton onPress={() => navigate('LoginScreen')}>
            Login
          </RoundedButton>
        )
    }
}

