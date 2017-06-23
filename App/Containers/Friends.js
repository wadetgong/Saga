import React from 'react'
import { Text, View, ListView, DatePickerIOS } from 'react-native'
import API from '../Services/FixtureApi' 
import FriendListItem from '../Components/FriendListItem'
import SearchBar from '../Components/SearchBar'
import RoundedButton from '../Components/Button/RoundedButton'

//there is a search bar at top but it's hard to see and also it doesn't work
// WARNING DATEPICKER is IOS only oh noes
// need logic for search
// need logic for not showing current user in this list
// need logic to disable switch if friend in different journey
// need logic for sending notifications to friends lol
//there is next button but not currently in scroller (ListView)

// import styles from './Styles/Friends' // not there
export default class Friends extends React.Component {
    static defaultProps = {
        date: new Date(),
        timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    }
    
    // state also holds all switchs inside FriendListItem
    state = {
        date: this.props.date,
        timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
    };
      
    onSearchSearchBar () {
        console.log('searching in Friends Searchbar')
    }
    
    onCancelSearchBar () {
        console.log('cancel search in Friends Searchbar')
    }
    
    addFriendToTeam (id, value) {
        console.log('addfriendtoteam in Friends container', id, value, typeof id)
        this.setState({[id] : value})
        console.log(this.state)
    }
    
    onDateChange(date) {
        this.setState({ date: date });
    };

    onTimezoneChange (event) {
        var offset = parseInt(event.nativeEvent.text, 10);
        if (isNaN(offset)) return;
        this.setState({ timeZoneOffsetInHours: offset });
    };
    
    render() {
        // data for all friends
        const friends = API.getFriends().data;        
        let data = new ListView.DataSource({rowHasChanged : (r1, r2) => r1 != r2})
        data = data.cloneWithRows(friends)
        
        const { navigate } = this.props.navigation
        
        return (
            <View>
                <View>
                    <Text>Add friends to your team</Text>
                    <SearchBar 
                        onSearch={this.onSearchSearchBar}
                        onCancel={this.onCancelSearchBar}
                    />
                </View>
                <View>
                    <ListView 
                        dataSource={data}
                        renderRow={(item) => <
                            FriendListItem 
                            item={item}
                            navigate={navigate}
                            addFriendToTeam={this.addFriendToTeam.bind(this)}
                            switchValue={this.state[item.id]}
                        />}
                    />
                </View>
                <DatePickerIOS
                    date={this.state.date}
                    mode="datetime"
                    timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                    onDateChange={this.onDateChange.bind(this)}
                />
                <RoundedButton onPress={() => navigate('TeamScreen')}>
                    Next
                </RoundedButton>
            </View>
        )
        
    }
}

