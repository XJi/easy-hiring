import React from 'react';
import * as firebase from 'firebase';
import Firebase from '../includes/firebase';
import { Permissions } from 'expo';
import {
  StackNavigator,
} from 'react-navigation';
import { Alert,AppRegistry, Linking, StyleSheet, Image, Text, View, ListView,TextInput,TouchableHighlight} from 'react-native';
import { Button } from 'react-native-elements';
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
    headerStyle: { backgroundColor: '#5F9EA0'},
    headerTitleStyle: { color: '#2F4F4F' },
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
          resumes.push(JSON.stringify(child.child('resume')));
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
    const remote = 'https://cdn.wallpapersafari.com/3/77/HARj7q.jpg';
    const resizeMode = 'stretch';
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#eee',
        }}
      >
        <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <Image
              style={{
                flex: 1,
                resizeMode,
              }}
              source={{ uri: remote }}
            />
        </View>
        <View style={styles.jobcontainer}>
          <Text style={{textAlign: 'center', top: 70, fontSize: 25, color: '#5F9EA0'}}>Person List </Text>
          <Text style={{textAlign: 'center', top: 560, fontSize: 14, color: '#2F4F4F'}}>Press the entry to download resume </Text>
          <ListView
            dataSource = {this.state.dataSource}
            renderRow={this._renderPersonItem.bind(this)}
            enableEmptySections={true}
            style={styles.joblistview}
          />
        </View>
      </View>
    );
  }
  _renderPersonItem(item) {
    const onPress = () => {
      console.log(resumes[people.indexOf(item.jobname)]);
      Alert.alert(
        'Open this URL?',
        encodeURI(resumes[people.indexOf(item.jobname)]),
        [
          {
            text: 'Yes',
            onPress: () => {
              var resumeUrl = resumes[people.indexOf(item.jobname)].replace(/"/g, "");
              Linking.canOpenURL(resumeUrl).then(supported => {
                  if (!supported) {
                    console.log('Can\'t handle url: ' + resumeUrl);
                  } else {
                    return Linking.openURL(resumeUrl);
                  }
                }).catch(err => console.error('An error occurred', err));
            }
          },
          { text: 'No', onPress: () => {} },
        ],
        { cancellable: false }
      );
    };

    return (
      <JobListItem item={item} onPress = {onPress}/>
    );
  }
}
