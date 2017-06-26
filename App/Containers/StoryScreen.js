import React from 'react'
import { ListView, View, Text } from 'react-native'
import API from '../Services/FixtureApi'
import StoryListItem from '../Components/StoryListItem'

import styles from './Styles/StoryScreenStyles'

// Initialize Firebase
import firebaseApp from '../Firebase'

// import styles from './Styles/StoryScreen' // not there
export default class StoryScreen extends React.Component {
    state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),
    }
    
    componentDidMount() {
        // this.setState({
        //     dataSource: this.state.dataSource.cloneWithRows([])
        // });
        
        this.listenForItems(this.itemsRef);
    }
    
    // firebase
    itemsRef = firebaseApp.database().ref('test/list');
    
    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {

          // get children as an array
          var items = [];
          snap.forEach((child) => {
            // items.push({
            //   title: child.val().title,
            //   _key: child.key
            // });
            items.push(child.val())
            console.log('child here in StoryScreen', child.val())
          });

          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items)
          });

        });
      }


    render () {
        // data for all stories
        const stories = API.getStories().data;
        let data = new ListView.DataSource({rowHasChanged : (r1, r2) => r1 != r2})
        data = data.cloneWithRows(stories)

        const { navigate } = this.props.navigation

        return (
          <View style={styles.container}>
            <View style={styles.sectionHeader}>
              <Text style={styles.boldLabel}>Stories</Text>
            </View>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(item) => <
                    StoryListItem
                    item={item}
                    navigate={navigate}
                />}
            />
          </View>
        )
    }
}
