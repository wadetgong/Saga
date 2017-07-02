import React from 'react'
import { View, Text } from 'react-native'
import RoundedButton from '../Components/Button/RoundedButton'
import { NavigationActions } from 'react-navigation'

class TeamScreen extends React.Component {
  constructor() {
    super()
    this.generateStory = this.generateStory.bind(this)
  }
  
  generateStory() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'StoryScreen'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View>
        <Text>Your Team:</Text>
        <RoundedButton onPress={() => navigate('CurrentStory')}>
        {/*<RoundedButton onPress={this.generateStory}>*/}
          begin journey
        </RoundedButton>
      </View>
    )
  }
}

export default TeamScreen
