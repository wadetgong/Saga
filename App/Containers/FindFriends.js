import React from 'react'
import { View, Text, Image, ListView, ScrollView } from 'react-native'
import SearchBar from '../Components/SearchBar'
import FriendUserRow from '../Components/FriendUserRow'

import styles from './Styles/FriendsStyles'

import API from '../Services/FixtureApi'

export default class FindFriends extends React.Component {

  onSearchSearchBar () {
      console.log('searching in Friends Searchbar')
  }

  render() {
    const friends = API.getFriends().data;
    let data = new ListView.DataSource({rowHasChanged : (r1, r2) => r1 != r2})
    data = data.cloneWithRows(friends)

    return (
      <View style={[styles.container, {paddingTop: 10}]}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
          <SearchBar onSearch={this.onSearchSearchBar}/>
        </View>
        <ScrollView style={{paddingHorizontal: 10}}>
              <ListView
                dataSource={data}
                removeClippedSubviews={false}
                renderRow={(user) => <
                  FriendUserRow
                  user={user}
                  /*navigate={navigate}
                  addFriendToTeam={this.addFriendToTeam.bind(this)}
                  switchValue={this.state[item.id]}*/
                />}
              />
        </ScrollView>
      </View>
    )
  }
}
