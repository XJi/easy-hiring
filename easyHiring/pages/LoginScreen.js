import React from 'react';
import * as firebase from 'firebase';
import Firebase from '../includes/firebase';
import {
  StackNavigator,
} from 'react-navigation';
import { AppRegistry, StyleSheet, Text, View, TextInput} from 'react-native';
import { Button } from 'react-native-elements';
const styles = require('../includes/styles.js');
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
    headerStyle: { backgroundColor: '#5F9EA0'},
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
      <View>
        <Text style={{textAlign: 'center', top: 100, fontSize: 25, color: '#5F9EA0'}}>Login</Text>
        <Text style={{textAlign: 'center', top: 110, fontSize: 12, color: 'red'}}>{this.state.errorMsg}</Text>
        <Text style={{left: 20, top: 130, fontSize: 16, color: '#5F9EA0'}}>Email Address</Text>
        <TextInput
            style={{left: 17,top: 140, width: '85%'}}
            onChangeText={(text) => this.setState({email: 'google@google.com'})}//text})}
            value={this.state.email}
            placeholder={"Email Address"}
          />
        <Text style={{left: 20, top: 145, fontSize: 16, color: '#5F9EA0'}}>Password</Text>
        <TextInput
            style={{left: 17,top: 155, width: '85%'}}
            onChangeText={(text) => this.setState({password:'google' })}//text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
          />
        <Button
            raised
            icon={{name: 'home', size: 26}}
            containerViewStyle={styles.buttoncontainer3}
            buttonStyle={styles.buttonhome}
            onPress={this.login.bind(this)}
            textStyle={{textAlign: 'center'}}
            title="Login"
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
