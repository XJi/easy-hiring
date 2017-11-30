import React from 'react';
import * as firebase from 'firebase';
import Firebase from '../includes/firebase';
import QRCode from 'react-native-qrcode';
import {
  StackNavigator,
} from 'react-navigation';
import { AppRegistry, StyleSheet, Text, View, Button, TextInput, ListView, TouchableHighlight,
  AlertIOS,} from 'react-native';

const styles = require('../includes/styles.js')
const ListItem = require('./ListItem');
const JobListItem = require('./JobListItem')

export default class ApplicantProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      dataSource2: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: true
    };
    this.itemsRef = firebase.database().ref().child('applicant').child('yongrui').child('skill')
    this.companyRef = firebase.database().ref().child('company')
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

  listenForJobItems(companyRef) {
    companyRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        child.forEach((childname) => {
          if (childname.key == 'Jobs') {
            childname.forEach((job) => {
              items.push({
                jobname:child.key+'------'+job.key
              });
            });
          }
        });
      });
      this.setState({
        dataSource2: this.state.dataSource2.cloneWithRows(items)
      });

    });
  }
  componentDidMount() {
    this.listenForItems(this.itemsRef);
    this.listenForJobItems(this.companyRef);
  }

  static navigationOptions = {
    title: 'Profile',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>ApplicantProfile</Text>

        <ListView
        dataSource = {this.state.dataSource}
        renderRow={this._renderItem.bind(this)}
        enableEmptySections={true}
          style={styles.listview}
        />
        <Text>Job List </Text>
        <ListView
        dataSource = {this.state.dataSource2}
        renderRow={this._renderJobItem.bind(this)}
        enableEmptySections={true}
          style={styles.listview}
        />

    </View>
    );
  }
  _renderJobItem(item) {
    return (
      <JobListItem item={item} />
    );
  }
  _renderItem(item) {
     // const onPress = () => {
     //   AlertIOS.alert(
     //     'Complete',
     //     null,
     //     [
     //       {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
     //       {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
     //     ]
     //     );
     // };
     return (
       <ListItem item={item} />
       );
   }
}
