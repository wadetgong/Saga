import React from 'react'
import { View, Text } from 'react-native'

import styles from './Styles/JourneySummaryStyles'


class JourneySummary extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.boldLabel}>Journey Conclusion</Text>
        </View>
      </View>
    )
  }
}

export default JourneySummary
