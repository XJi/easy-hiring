import React from 'react';
import * as firebase from 'firebase';
import Firebase from '../includes/firebase';
import {
  StackNavigator,
} from 'react-navigation';
import { AppRegistry, StyleSheet, Text, View, Image,TextInput} from 'react-native';
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
    headerTitleStyle: { color: '#2F4F4F' },
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
      </View>
    );
  }
}
