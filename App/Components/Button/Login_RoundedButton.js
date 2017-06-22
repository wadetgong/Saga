import React from 'react'
import { Text, View } from 'react-native'
import RoundedButton from './RoundedButton'

export default class Login_RoundedButton extends React.Component {

    render () {
        const { navigate } = this.props
        return (
          <RoundedButton onPress={() => navigate('LoginScreen')}>
            Login
          </RoundedButton>
        )
    }
}

