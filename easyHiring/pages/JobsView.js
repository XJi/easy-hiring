import React from 'react';
import * as firebase from 'firebase';
import Firebase from '../includes/firebase';
import {
  StackNavigator,
} from 'react-navigation';
import { AppRegistry, StyleSheet, Text, View, Image, ListView,TextInput,TouchableHighlight} from 'react-native';
const styles = require('../includes/styles.js');
import { Button } from 'react-native-elements';
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
    headerStyle: { backgroundColor: '#5F9EA0'},
    headerTitleStyle: { color: '#2F4F4F' },
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
    });
  }
  componentDidMount() {
    //this.listenForItems(this.itemsRef);
    this.listenForJobItems(this.companyRef);
  }
  addjob(){
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    console.log('addjob(): ' + this.state.name);
    navigate('Job',{name: this.state.name, email: this.props.navigation.state.params.email});

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
          <Text style={{textAlign: 'center', top: 50, fontSize: 25, color: '#5F9EA0'}}>Job List </Text>
          <ListView
            dataSource = {this.state.dataSource2}
            renderRow={this._renderJobItem.bind(this)}
            enableEmptySections={true}
            style={styles.joblistview}
          />
          <Button
              raised
              icon={{name: 'description', size: 26}}
              containerViewStyle={styles.buttoncontainer4}
              buttonStyle={styles.buttonhome}
              onPress={this.addjob.bind(this)}
              textStyle={{textAlign: 'center'}}
              title="Add a New Job"
            />
        </View>
      </View>
    );
  }
  _renderJobItem(item) {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const onPress = () => {
      //console.log('item is: ' +item.jobname);
      navigate('Candidates',{name: this.props.navigation.state.params.name, job: item.jobname });
    };
    return (
      <JobListItem item={item} onPress = {onPress}/>
    );
  }
}
