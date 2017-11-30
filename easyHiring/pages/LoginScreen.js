import React from 'react';
import * as firebase from 'firebase';
import Firebase from '../includes/firebase';
import {
  StackNavigator,
} from 'react-navigation';
import { AppRegistry, StyleSheet, Text, View, Button, TextInput} from 'react-native';
const loginstyle = require('../includes/loginstyle');
export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMsg:'',
      loaded: true
    };
  }

  static navigationOptions = {
    title: 'Login',
  };
  async login(){
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    this.setState({
      loaded: false
    });
    var checked= await Firebase.authUser(this.state.email,this.state.password);
    if(checked){
      navigate('Company',  {email: this.state.email});
      this.setState({
        loaded: true
      });
      this.setState({
        errorMsg: ''
      });
    }
    else{
      this.setState({
        errorMsg: 'Incorrect Login Information'
      });
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={loginstyle.container}>
        <Text>Login</Text>
        <Text>{this.state.errorMsg}</Text>
        <Text>Email Address</Text>
        <TextInput
            //style={styles.textinput} this.setState({arrayvar:[...this.state.arrayvar, newelement]});
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={"Email Address"}
          />
        <Text>Password</Text>
        <TextInput
            //style={styles.textinput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
          />
        <Button
            onPress={this.login.bind(this)}
            title="Login"
            style={loginstyle.primaryButton}
          />
      </View>
    );
  }
}
/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
