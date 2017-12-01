import React from 'react';
import * as firebase from 'firebase';
import Firebase from './includes/firebase';
import LoginScreen from './pages/LoginScreen'
import CompanyProfile from './pages/CompanyProfile'
import JobDescription from './pages/JobDescription'
import ApplicantProfile from './pages/ApplicantProfile'
import QRCodeScanner from './pages/QRCodeScanner'
import AppliedCandidates from  './pages/AppliedCandidates'
import FloorMap from './pages/FloorMap'
import ShowPlace from './pages/ShowPlace'
import JobsView from './pages/JobsView'
import {
  StackNavigator,
} from 'react-navigation';
import { Button } from 'react-native-elements';
import { AppRegistry, Image, StyleSheet, Text, View} from 'react-native';
const styles = require('./includes/styles.js');
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
    headerStyle: { backgroundColor: '#5F9EA0'},
    headerTitleStyle: { color: 'white' },
  };
  render() {
    const remote = 'https://s-media-cache-ak0.pinimg.com/originals/39/2e/42/392e42ae5ba5bcca92536371b1e566d2.jpg';
    const { navigate } = this.props.navigation;
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
          <Text style={{textAlign: 'center', top: 200, fontSize: 20, color: '#B0C4DE'}}>Are you an applicant or a recruiter?</Text>
              <Button
                raised
                icon={{name: 'account-circle', size: 26}}
                containerViewStyle={styles.buttoncontainer}
                buttonStyle={styles.buttonhome}
                textStyle={{textAlign: 'center'}}
                onPress={() => navigate('Applicant')}
                title="Applicant"
            />

            <Button
              raised
              icon={{name: 'assignment-ind', size: 26}}
              containerViewStyle={styles.buttoncontainer1}
              buttonStyle={styles.buttonhome}
              textStyle={{textAlign: 'center'}}
              onPress={() => navigate('Login')}
              title="Recruiter"
            />
        </View>
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
  Job: {
    screen: JobDescription,
  },
  Applicant: {
    screen: ApplicantProfile,
  },
  QRScanner: {
    screen: QRCodeScanner,
  },
  ViewJobs: {
    screen: JobsView,
  },
  Candidates: {
    screen: AppliedCandidates,
  },
  IndoorMap: {
    screen: FloorMap,
  },
  IndoorLocation: {
    screen: ShowPlace,
  },
});

export default class App extends React.Component {//export default
  constructor(props) {
    super(props);
    Firebase.initialise();
    //Firebase.createUser('Nintendo', 'nintendo@nintendo.com', 'nintendo');
    //Firebase.createUser('Google', 'google@google.com', 'google');
    this.state = {
      userLoaded: false,
      initialView: null
    };
  }
  render() {
    console.ignoredYellowBox = ['Setting a timer','FIREBASE WARNING'];
      return <AppPages />;
  }
}

AppRegistry.registerComponent('BackgroundImage', () => BackgroundImage);

/**const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  <View
      style={{
        position: 'absolute',
        top: '1150%',
        left: '20%',
        width: '60%',
        height: '60%',
        overflow: 'hidden',
      }}
    >
});**/
