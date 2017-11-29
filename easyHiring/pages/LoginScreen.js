import React from 'react';
import * as firebase from 'firebase';
import Firebase from '../includes/firebase';
import {
  StackNavigator,
} from 'react-navigation';
import { AppRegistry, StyleSheet, Text, View, Button, TextInput} from 'react-native';

export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      loaded: true
    };
  }

  static navigationOptions = {
    title: 'Login',
  };
  login(){
    const { navigate } = this.props.navigation;
    this.setState({
      loaded: false
    });
    //Firebase.createUser('yo','yo@a.com','yyyyyy');
    if(Firebase.authUser(this.state.email,this.state.password)){
      navigate('Company');
    }
    //TODO: UPDATE loaded status


  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}> 
        <Text>Login</Text>
        <Text>Email Address</Text>
        <TextInput
            //style={styles.textinput}
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
            //onPress={() => navigate('Applicant')}
            onPress={this.login.bind(this)}
            title="Login"


          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
