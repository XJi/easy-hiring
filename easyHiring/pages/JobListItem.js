import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../includes/styles.js')
const { View, TouchableHighlight, Text } = ReactNative;

class JobListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={styles.liText}>{this.props.item.jobname}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = JobListItem;
