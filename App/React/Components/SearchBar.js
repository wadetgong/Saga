import React from 'react'
import { View, TextInput } from 'react-native'
import styles from './Styles/SearchBarStyles'
import { Colors, Metrics } from '../../Themes/'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

export default class SearchBar extends React.Component {
  static propTypes = {
    onSearch: React.PropTypes.func.isRequired,
    searchTerm: React.PropTypes.string
  }

  render () {
    const { onSearch, searchTerm } = this.props
    const onSubmitEditing = () => onSearch(searchTerm)
    return (
      <View style={styles.container}>
        <Icon name='magnifier' size={Metrics.icons.tiny} style={styles.searchIcon} />
        <TextInput
          ref='searchText'
          placeholder='Search'
          placeholderTextColor={Colors.charcoal}
          underlineColorAndroid='transparent'
          style={styles.searchInput}
          value={this.props.searchTerm}
          onChangeText={onSearch}
          autoCapitalize='none'
          onSubmitEditing={onSubmitEditing}
          returnKeyType={'search'}
          autoCorrect={false}
          selectionColor={Colors.charcoal}
        />
      </View>
    )
  }
}
