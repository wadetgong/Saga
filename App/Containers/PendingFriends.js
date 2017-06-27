import React from 'react'
import { View, Text, Image, ListView, ScrollView } from 'react-native'
import ApproveFriendRow from '../Components/ApproveFriendRow'
import PendingFriendRow from '../Components/PendingFriendRow'

import styles from './Styles/FriendsStyles'

import API from '../Services/FixtureApi'
import { Colors } from '../Themes'

export default class ApproveFriends extends React.Component {

  render() {
    const pendingFriends = API.getFriends().data.slice(3);
    let data = new ListView.DataSource({rowHasChanged : (r1, r2) => r1 != r2})
    data = data.cloneWithRows(pendingFriends)

    const approveFriends = API.getFriends().data.slice(0, 3);
    let dataApprove = new ListView.DataSource({rowHasChanged : (r1, r2) => r1 != r2})
    dataApprove = dataApprove.cloneWithRows(approveFriends)

    return (
      <View style={[styles.container, {paddingTop: 10}]}>
        <ScrollView style={{paddingHorizontal: 10}}>
          <View style={{borderBottomWidth: 1, borderColor: 'gray', marginHorizontal: '25%', justifyContent: 'center', marginBottom: 10}}>
            <Text style={[styles.boldLabel, {color: 'gray'}]}>Your Requests</Text>
          </View>
          <ListView
            dataSource={data}
            removeClippedSubviews={false}
            renderRow={(user) => <
              PendingFriendRow
              user={user}
              /*navigate={navigate}
              addFriendToTeam={this.addFriendToTeam.bind(this)}
              switchValue={this.state[item.id]}*/
            />}
          />
          <View style={{borderBottomWidth: 1, borderColor: 'gray', marginHorizontal: '25%', justifyContent: 'center', marginTop: 20, marginBottom: 10}}>
            <Text style={[styles.boldLabel, {color: 'gray'}]}>Pending Friend Requests</Text>
          </View>
          <ListView
            dataSource={dataApprove}
            removeClippedSubviews={false}
            renderRow={(user) => <
              ApproveFriendRow
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
