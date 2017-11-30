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
      jobTitle:'',
      jobDescription:'',
      skills:{},
      loaded: true
    };
  }

  static navigationOptions = {
    title: 'Job Description',
  };
  submitjob(){

    const { navigate } = this.props.navigation;
    //console.log('user is : ' + this.props.navigation.state.params.email);
    console.log('submitjob: '+this.props.navigation.state.params.name);
    console.log('backemail: ' + firebase.database().ref().child('company').child(this.props.navigation.state.params.name).child('email'));
    //Firebase.addNewJob('Nintendo', 'Software Developer', 'I am hungry',['C++', 'python']);
    //Firebase.addNewJob('Nintendo', 'Software DeveloperII', 'I am hungry too',['Java', 'python','C++']);
    //Firebase.addNewJob('Nintendo', 'Software DeveloperII', 'I am hungry too',['Java', 'python','C++']);
  //  navigate('Company');
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Job</Text>
        <TextInput
          onChangeText={(text) => this.setState({jobTitle: text})}
          value={this.state.jobTitle}
          placeholder={"Job Title"}
        />
        <Text>Description</Text>
        <TextInput
          onChangeText={(text) => this.setState({jobDescription: text})}
          value={this.state.jobDescription}
          placeholder={"Description"}
        />
        <Button
            onPress={this.submitjob.bind(this)}
            title="Submit"
        />
      </View>
    );
  }
}
