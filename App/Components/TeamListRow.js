import React from 'react'
import { View, Text, Image, TouchableOpacity, ListView, ScrollView} from 'react-native'
import styles from './Styles/FriendListItemStyles'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import FriendTeamTile from '../Components/FriendTeamTile'

import { Fonts, Colors, Metrics } from '../Themes/'

const TeamListRow = ({id, team}) => {


  let friendsSource = team.team && new ListView
    .DataSource({rowHasChanged : (r1, r2) => r1 != r2})
    .cloneWithRows(Object.keys(team.team))

  return (
    <View style={{flexDirection: 'row', paddingVertical: 1}}>
      <View style={{flex: 1, paddingHorizontal: 5}}>
        <Text style={{}}>{parseInt(id)+1}</Text>
      </View>
      <View style={{flex: 4}}>
        <Text style={{}}>{msToTime(team.time)}</Text>
      </View>
      <View style={{flex: 10}}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <ListView
            contentContainerStyle={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}
            dataSource={friendsSource}
            removeClippedSubviews={false}
            enableEmptySections={true}
            renderRow={(user) => <FriendTeamTile user={user} styles={{
              width: 50,
              height: 50,
            }}/>}
          />
        </ScrollView>
      </View>
    </View>
  )
}
const msToTime = (duration) => {
    var seconds = parseInt((duration/1000)%60)
      , minutes = parseInt((duration/(1000*60))%60)
      , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds;
}

export default TeamListRow
