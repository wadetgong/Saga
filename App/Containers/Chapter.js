import React from 'react'
import { View, Text, Button, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import TreasureHunt from '../Components/TreasureHunt'
import Tracker from '../Components/Tracker'
import ChapterDetails from '../Containers/ChapterDetails'
import ChapterScrollBar from '../Components/ChapterScrollBar'
import RoundedButton from '../Components/Button/RoundedButton'
import { ApplicationStyles } from '../Themes'
import geolib from 'geolib'

// Styles
import styles from './Styles/ChapterStyles'

class Chapter extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      // insideRange: false,
      selectedChap: 1,
    }
    // this.onLocation = this.onLocation.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // // console.log('componentDidMount in Chapter')
    // let polygon = [
    //   { latitude: 41.89, longitude: -87.66 },
    //   { latitude: 41.89, longitude: -87.68},
    //   { latitude: 41.92, longitude:  -87.68},
    //   { latitude: 41.92, longitude:  -87.66},
    //   { latitude: 41.89, longitude: -87.66 } // last point has to be same as first point
    // ]


    //   // console.log('long lat being set: ', point)

      // this.setState({
      //   latitude: crd.latitude,
      //   longitude: crd.longitude,
      //   insideRange: geolib.isPointInside(point, polygon),
      // })
    // })
  }

  onLocation(location) {
    // //My location passing: 41.90, -87.67
    // //My location failing 41.88, -87.67
    // let polygon = [
    //   { latitude: 41.89, longitude: -87.66 },
    //   { latitude: 41.89, longitude: -87.68},
    //   { latitude: 41.92, longitude:  -87.68},
    //   { latitude: 41.92, longitude:  -87.66},
    //   { latitude: 41.89, longitude: -87.66 } // last point has to be same as first point
    // ]

    // let point = {
    //   latitude: location.coords.latitude,
    //   longitude: location.coords.longitude,
    // }
  }

  handleClick(e) {
    // console.log('chapter button clicked, ', e)
    this.setState({
      selectedChap: e
    })
  }

  render () {
    const chapters = [
      {id: 1, puzzles: [{id: 1}, {id: 2}]},
      {id: 2, puzzles: [{id: 3}]},
      {id: 3, puzzles: [{id: 4},{id: 5},{id: 6}]},
      {id: 4, puzzles: [{id: 7},{id: 8},{id: 9}, {id: 10}]},
      {id: 5, puzzles: [{id: 11},{id: 12},{id: 13}]},
      {id: 6, puzzles: [{id: 14},{id: 15}]}
    ]
    const selectedChapInfo = chapters[this.state.selectedChap-1]

    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.boldLabel}>Batman - Chapter {this.state.selectedChap}</Text>
        </View>
        <ScrollView style={styles.container}>
          <View>
            <TreasureHunt/>
            <ChapterScrollBar
              chapters={chapters}
              handleClick={this.handleClick}
              selectedChap={this.state.selectedChap}
            />
          </View>
          {/*<Tracker />*/}
         {/* <View>
            {
              this.state.insideRange
              ? <Text>Inside range? Yes</Text>
              : <Text>Inside range? No</Text>
            }
          </View>*/}
          <ChapterDetails
            screenProps={{rootNavigation: this.props.navigation}}
            selectedChap={this.state.selectedChap}
            chapterInfo={selectedChapInfo}
            storyKey={'batman'}
          />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chapter)
