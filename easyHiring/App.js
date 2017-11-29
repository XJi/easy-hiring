import React from 'react';
import * as firebase from 'firebase';
import Firebase from './includes/firebase';
import LoginScreen from './pages/LoginScreen'
import CompanyProfile from './pages/CompanyProfile'
import {
  StackNavigator,
} from 'react-navigation';
import { AppRegistry, StyleSheet, Text, View, Button} from 'react-native';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Are you an applicant or a recruiter?</Text>
        <Button
          onPress={() => navigate('Login')}
          title="Applicant"
        />
        <Button
          onPress={() => navigate('Login')}
          title="Recruiter"
        />
      </View>
    );
  }
}

export const AppPages = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Login: {
    screen: LoginScreen,
  },
  Company: {
    screen: CompanyProfile,
  },
});

export default class App extends React.Component {//export default
  constructor(props) {
    super(props);
    Firebase.initialise();

    this.state = {
      userLoaded: false,
      initialView: null
    };
  }
  render() {
      return <AppPages />;
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
