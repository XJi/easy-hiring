import React from 'react';
import * as firebase from 'firebase';
import Firebase from '../includes/firebase';
import {
  StackNavigator,
} from 'react-navigation';
import { AppRegistry, StyleSheet, Image,Text, View, TextInput} from 'react-native';
import { Button } from 'react-native-elements';
const styles = require('../includes/styles.js');
export default class CompanyProfile extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      name:'Default',
      loaded: true
    };
  }
  componentDidMount() {
    this.fetchData().done()
  }
  static navigationOptions = {
    title: 'Profile',
    headerStyle: { backgroundColor: '#5F9EA0'},
  };
  async fetchData() {
    const response = await firebase.database().ref().child('company').orderByChild('email').equalTo(this.props.navigation.state.params.email).once("value").
    then(function(snapshot) {
      if(snapshot.exists()){
          var gg= '';
          snapshot.forEach((entry) => {
            gg = entry.val().name;
            return gg;
          });
          return gg;
      }
      else{
          console.log('Account doesnt exist');
      }
    }).catch(function(error){console.log('Cant retrieve account', error)});
    this.setState({name: response});
  }
  addjob(){
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    console.log('addjob(): ' + this.state.name);
    navigate('Job',{name: this.state.name, email: this.props.navigation.state.params.email});

  }
  scanresume(){
    const { navigate } = this.props.navigation;
    navigate('QRScanner');
  }
  viewjobs(){
    const { navigate } = this.props.navigation;
    navigate('ViewJobs',{name: this.state.name, email: this.props.navigation.state.params.email} );
  }
  render() {
    const { navigate } = this.props.navigation;
    const remote = 'https://cdn.wallpapersafari.com/3/77/HARj7q.jpg';
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
          <Text style={{textAlign: 'center', top: 70, fontSize: 25, color: '#5F9EA0'}}>{this.state.name} Profile</Text>
          <Button
              raised
              icon={{name: 'description', size: 26}}
              containerViewStyle={{borderRadius: 10, top: 176}}
              buttonStyle={styles.buttonhome}
              onPress={this.addjob.bind(this)}
              title="Add a New Job"
            />
          <Button
              raised
              icon={{name: 'camera-enhance', size: 26}}
              containerViewStyle={{borderRadius: 10, top: 183}}
              buttonStyle={styles.buttonhome}
              onPress={this.scanresume.bind(this)}
              title="Scan Resume"
            />
          <Button
              raised
              icon={{name: 'work', size: 26}}
              containerViewStyle={{borderRadius: 10, top: 190}}
              buttonStyle={styles.buttonhome}
              onPress={this.viewjobs.bind(this)}
              title="Posted Jobs"
            />
          </View>
      </View>
    );
  }
}
AppRegistry.registerComponent('BackgroundImage', () => BackgroundImage);
