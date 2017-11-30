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
      skills:null,
      loaded: true
    };
  }

  static navigationOptions = {
    title: 'Job Description',
  };
  submitjob(){
    const { navigate } = this.props.navigation;
    Firebase.addNewJob(this.props.navigation.state.params.name, this.state.jobTitle, this.state.jobDescription,this.state.skills);
    navigate('Company',{email:this.props.navigation.state.params.email });
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
        <Text>Skills</Text>
        <TextInput
          placeholder="Seperate each skill by space"
          onChangeText={(text) => {res = text.split(',');
              this.setState({skills: res})}}
        />
        <Button
            onPress={this.submitjob.bind(this)}
            title="Submit"
        />
      </View>
    );
  }
}
