import React from 'react';
import * as firebase from 'firebase';
import Firebase from '../includes/firebase';
import QRCode from 'react-native-qrcode';
import {
  StackNavigator,
} from 'react-navigation';
import { AppRegistry, Image, StyleSheet, Text, View, Button, TextInput, ListView, TouchableHighlight,
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
    this.applicantSkill = []
    this.jobskill = []
  }
  loadmap(){
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    navigate('IndoorMap');
  }
  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      this.applicantSkill = [];
      snap.forEach((child) => {
        this.applicantSkill.push({
          skillname:child.val().skillname,
          _key:child.key
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.applicantSkill)
      });

    });
  }

  listenForJobItems(companyRef) {
    companyRef.on('value', (snap) => {
      // get children as an array
      var s = new Set();
      this.applicantSkill.forEach((line) => {
        if (line) {
          s.add(line.skillname);
        }
      });
      var jobs = []
      this.jobskill = []
      snap.forEach((child) => {
        child.forEach((childname) => {
          if (childname.key == 'Jobs') {
            childname.forEach((job) => {
              job.forEach((keyname) => {
                var flag = true;
                if (keyname.key == 'skills') {
                  keyname.forEach((name) => {
                    console.log(job.key)
                    if (s.has(name.val()) && flag) {
                      jobs.push({
                        jobname:child.key+'------'+job.key
                      });
                      flag = false
                    }
                  });
                }
              });
            });
          }
        });
      });
      this.setState({
        dataSource2: this.state.dataSource2.cloneWithRows(jobs)
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
    const remote = 'https://cdn.wallpapersafari.com/3/77/HARj7q.jpg';
    const resizeMode = 'stretch';
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#eee',
      }}>
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
        <Text style={styles.heading}>Yongrui Lin</Text>
        <View>
          <Button
            raised
            icon={{name: 'home', size: 12}}
            buttonStyle={styles.buttonhome}
            textStyle={{textAlign: 'center'}}
            onPress={this.loadmap.bind(this)}
            title="Map"
          />
        </View>

        <View style={styles.qrcode}>
        <QRCode
          value='https://firebasestorage.googleapis.com/v0/b/easy-hiring-57516.appspot.com/o/YongruiLin_Resume.pdf?alt=media&token=2ffcc534-44eb-4cc3-a4fb-c5a863b1ace1'
          size={150}
          bgColor='black'
          fgColor='white'/>
        </View>
        <Text style={styles.title}> Skill Set </Text>
        <ListView
        dataSource = {this.state.dataSource}
        renderRow={this._renderItem.bind(this)}
        enableEmptySections={true}
          style={styles.listview}
        />
        <Text style={styles.title}>Job List </Text>
        <ListView
        dataSource = {this.state.dataSource2}
        renderRow={this._renderJobItem.bind(this)}
        enableEmptySections={true}
          style={styles.listview}
        />

    </View>
    );
  }

  submitApplyJob(jobname, applicantname) {
    var idx = 0;
    for (idx = 0; idx < jobname.length; idx++) {
      if (jobname[idx] == '-') {
        break;
      }
    }
    var companyName = jobname.substring(0, idx);
    var jobName = jobname.substring(idx + 6);
    var ref = this.companyRef.child(companyName).child('Jobs').child(jobName);
    var flag = false;
    ref.once('value', (snap) => {
      flag = snap.child('applied').exists();
    });
    console.log(flag)
    if (flag) {
      var input = {
        yongrui: {
          resume:"https://firebasestorage.googleapis.com/v0/b/easy-hiring-57516.appspot.com/o/YongruiLin_Resume.pdf?alt=media&token=2ffcc534-44eb-4cc3-a4fb-c5a863b1ace1",
          skill:"java"
        }
      };
      ref.child('applied').update(input);
    }
    else {
      var input = {
        applied:{yongrui: {
          resume:"https://firebasestorage.googleapis.com/v0/b/easy-hiring-57516.appspot.com/o/YongruiLin_Resume.pdf?alt=media&token=2ffcc534-44eb-4cc3-a4fb-c5a863b1ace1",
          skill:"java"
        }
      }
      };
      ref.update(input);
    }

  }

  _renderJobItem(item) {
    const onPress = () => {
      AlertIOS.alert(
        'Apply',
        null,
        [
          {text: 'Apply', onPress: (text) => {this.submitApplyJob(item.jobname, 'yongrui')}},
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ]
        );
    };
    return (
      <JobListItem item={item} onPress = {onPress}/>
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
       <ListItem item={item}/>
       );
   }
}
