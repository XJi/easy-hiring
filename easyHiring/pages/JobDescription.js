import React from 'react';
import * as firebase from 'firebase';
import Firebase from '../includes/firebase';
import {
  StackNavigator,
} from 'react-navigation';
import { AppRegistry, StyleSheet, Text, View, Image, TextInput} from 'react-native';
import { Button } from 'react-native-elements';
const styles = require('../includes/styles.js');
export default class CompanyProfile extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      jobTitle:'',
      jobDescription:'',
      skills:null,
      loaded: true
    };
  }

  static navigationOptions = {
    title: 'Job Description',
    headerStyle: { backgroundColor: '#5F9EA0'},
    headerTitleStyle: { color: '#2F4F4F' },
  };
  submitjob(){
    const { navigate } = this.props.navigation;
    Firebase.addNewJob(this.props.navigation.state.params.name, this.state.jobTitle, this.state.jobDescription,this.state.skills);
    navigate('Company',{email:this.props.navigation.state.params.email });
  }
  render() {
    const { navigate } = this.props.navigation;
    const remote = 'http://www2.lanecove.nsw.gov.au/mobileapp/Content/images/backgrounds/bg2.jpg';
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
        <View>
          <Text style={{left: 25, top: 60, fontSize: 18, color: '#5F9EA0'}}>Job</Text>
          <TextInput
            style={{left: 20,top: 70, width: '85%'}}
            onChangeText={(text) => this.setState({jobTitle: text})}
            value={this.state.jobTitle}
            placeholder={"Job Title"}
          />
          <Text style={{left: 25, top: 85, fontSize: 18, color: '#5F9EA0'}}>Description</Text>
          <TextInput
            style={{left: 20,top: 95, width: '85%'}}
            onChangeText={(text) => this.setState({jobDescription: text})}
            value={this.state.jobDescription}
            placeholder={"Description"}
          />
          <Text style={{left: 25, top: 150, fontSize: 18, color: '#5F9EA0'}}>Skills</Text>
          <TextInput
            style={{left: 20,top: 160, width: '85%'}}
            placeholder="Seperate each skill by space"
            onChangeText={(text) => {res = text.split(',');
                this.setState({skills: res})}}
          />
          <Button
              raised
              icon={{name: 'description', size: 26}}
              containerViewStyle={styles.buttoncontainer3}
              buttonStyle={styles.buttonhome}
              onPress={this.submitjob.bind(this)}
              title="Submit"
          />
        </View>
      </View>
    );
  }
}
