import React from 'react';
import * as firebase from 'firebase';
import Firebase from '../includes/firebase';
import {
  StackNavigator,
} from 'react-navigation';
import { AppRegistry, StyleSheet, Text, View, Button, TextInput, ListView, TouchableHighlight,
  AlertIOS,} from 'react-native';
const styles = require('../includes/styles.js')
const ListItem = require('./ListItem');

export default class ApplicantProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: true
    };
    this.itemsRef = firebase.database().ref().child('applicant').child('yongrui').child('skill')
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          skillname:child.val().skillname,
          _key:child.key
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  static navigationOptions = {
    title: 'Profile',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>ApplicantProfile</Text>
        <Text>{String(this.itemsRef)}</Text>

        <ListView
        dataSource = {this.state.dataSource}
        renderRow={this._renderItem.bind(this)}
        enableEmptySections={true}
          style={styles.listview}
        />
    </View>
    );
  }

  _renderItem(item) {
     const onPress = () => {
       AlertIOS.alert(
         'Complete',
         null,
         [
           {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
           {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
         ]
         );
     };
     return (
       <ListItem item={item} onPress={onPress} />
       );
   }
}
