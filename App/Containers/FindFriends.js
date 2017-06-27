import React from 'react'
import { View, Text, Image } from 'react-native'
import SearchBar from '../Components/SearchBar'

import styles from './Styles/FriendsStyles'

export default class FindFriends extends React.Component {

  onSearchSearchBar () {
      console.log('searching in Friends Searchbar')
  }

  render() {
    return (
      <View style={[styles.container, {paddingTop: 10}]}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
          <SearchBar onSearch={this.onSearchSearchBar}/>
        </View>
        <Text>Stuff about adding friends</Text>
      </View>
    )
  }
}
