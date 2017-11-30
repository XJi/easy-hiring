import React from 'react';
import * as firebase from 'firebase';
import Firebase from '../includes/firebase';
import { Permissions } from 'expo';
import {
  StackNavigator,
} from 'react-navigation';
import { AppRegistry, Linking, StyleSheet, Text, View, Button, ListView,TextInput,TouchableHighlight} from 'react-native';
const styles = require('../includes/styles.js');
const ListItem = require('./ListItem');
const JobListItem = require('./JobListItem');
var people = [];
var resumes = [];
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
  //  console.log(this.props.navigation.state.params.name);
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
            jobname:child.key //TODO: CREATE CSS FOR THIS PART
          });
          /*Hard Coded just to get it working*/
          people.push(child.key);
          resumes.push(child.child('resume'));

          console.log('person :');
          console.log(child.child('resume'));
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }
  componentDidMount() {
    //this.listenForItems(this.itemsRef);
    this.listenForPersonItems(this.personRef);
  }
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
    const onPress = () => {
      console.log(resumes[people.indexOf(item.jobname)]);
      Alert.alert(
        'Open this URL?',
        JSON.stringify(resumes[people.indexOf(item.jobname)]),
        [
          {
            text: 'Yes',
            onPress: () => Linking.openURL(JSON.stringify(resumes[people.indexOf(item.jobname)])),
          },
          { text: 'No', onPress: () => {} },
        ],
        { cancellable: false }
      );

      //Linking.openURL(JSON.stringify(resumes[people.indexOf(item.jobname)]));
    //  navigate('Candidates',{name: this.props.navigation.state.params.name, job: item.jobname });
    };

    return (
      <JobListItem item={item} onPress = {onPress}/>
    );
  }
}
