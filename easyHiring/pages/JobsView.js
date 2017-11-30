import React from 'react';
import * as firebase from 'firebase';
import Firebase from '../includes/firebase';
import {
  StackNavigator,
} from 'react-navigation';
import { AppRegistry, StyleSheet, Text, View, Button, ListView,TextInput,TouchableHighlight} from 'react-native';
const styles = require('../includes/styles.js');
const ListItem = require('./ListItem');
const JobListItem = require('./JobListItem');
export default class JobsView extends React.Component {
  constructor(props){

    super(props);
    this.state = {
      dataSource2: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: true
    };
  //  this.itemsRef = firebase.database().ref().child('applicant').child('yongrui').child('skill')
    const { params } = this.props.navigation.state;
    this.companyRef = firebase.database().ref().child('company').child(this.props.navigation.state.params.name);
  }

  static navigationOptions = {
    title: 'Job Description',
  };

  async listenForJobItems(companyRef) {

    companyRef.on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        if(child.key == 'Jobs'){
          child.forEach((job) => {
              items.push({
                jobname:job.key
              });
          });
        }
      });
      this.setState({
        dataSource2: this.state.dataSource2.cloneWithRows(items)
      });
      console.log(this.state.dataSource2);
    });
  }
  componentDidMount() {
    //this.listenForItems(this.itemsRef);
    this.listenForJobItems(this.companyRef);
  }

  /**backtoprofile(){
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    navigate('Company',{email:this.props.navigation.state.params.email });
  }**/
  render() {
    return (
      <View style={styles.container}>
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
      <JobListItem item={item}/>
    );
  }
}
