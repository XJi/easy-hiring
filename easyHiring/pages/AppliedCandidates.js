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
export default class AppliedCandidates extends React.Component {
  constructor(props){

    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: true
    };
  //  this.itemsRef = firebase.database().ref().child('applicant').child('yongrui').child('skill')
    const { params } = this.props.navigation.state;
    console.log(this.props.navigation.state.params.name);
    this.personRef = firebase.database().ref().child('company').child(this.props.navigation.state.params.name).child('Jobs').child(this.props.navigation.state.params.job);
  }

  static navigationOptions = {
    title: 'Applied Candidates',
  };

  async listenForPersonItems(personRef) {

    personRef.child('applied').on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
          items.push({
            jobname:child.key
          });
          console.log('person :' + child.skill + ' ' +child.key);
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
      console.log(this.state.dataSource);
    });
  }
  componentDidMount() {
    //this.listenForItems(this.itemsRef);
    this.listenForPersonItems(this.personRef);
  }

  /**backtoprofile(){
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    navigate('Company',{email:this.props.navigation.state.params.email });
  }**/
  render() {
    return (
      <View style={styles.container}>
        <Text>Person List </Text>
        <ListView
          dataSource = {this.state.dataSource}
          renderRow={this._renderPersonItem.bind(this)}
          enableEmptySections={true}
            style={styles.listview}
        />
      </View>
    );
  }
  _renderPersonItem(item) {
    return (
      <JobListItem item={item}/>
    );
  }
}
