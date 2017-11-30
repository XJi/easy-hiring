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
      name:'Default',
      loaded: true
    };
  }
  componentDidMount() {
    this.fetchData().done()
  }
  static navigationOptions = {
    title: 'Profile',
  };
  async fetchData() {
    const response = await firebase.database().ref().child('company').orderByChild('email').equalTo(this.props.navigation.state.params.email).once("value").
    then(function(snapshot) {
      if(snapshot.exists()){
          var gg= '';
          snapshot.forEach((entry) => {
            gg = entry.val().name;
            console.log(entry.val().name);
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
    return (
      <View style={styles.container}>
        <Text>{this.state.name} Profile</Text>
        <Button
            onPress={this.addjob.bind(this)}
            title="Add a New Job"
          />
        <Button
            onPress={this.scanresume.bind(this)}
            title="Scan Resume"
          />
        <Button
            onPress={this.viewjobs.bind(this)}
            title="Posted Jobs"
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
