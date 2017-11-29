import React from 'react';
import * as firebase from 'firebase';
import Firebase from '../includes/firebase';
import {
  StackNavigator,
} from 'react-navigation';
import { AppRegistry, StyleSheet, Text, View, Button, TextInput} from 'react-native';

export default class CompanyProfile extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loaded: true
    };
  }

  static navigationOptions = {
    title: 'Profile',
  };
  render() {
    return (
      <View>
        <Text>Profile</Text>

      </View>
    );
  }
}
