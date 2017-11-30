import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../includes/styles.js')
const { View, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={styles.liText}>{this.props.item.skillname}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;
