
import React from 'react';
import * as firebase from 'firebase';
import Firebase from '../includes/firebase';
import Canvas from 'react-native-canvas';
import {
  StackNavigator,
} from 'react-navigation';
import { AppRegistry, AppState, StyleSheet, Text, View, Image,TextInput} from 'react-native';
import { Button } from 'react-native-elements';
const styles = require('../includes/styles.js');
const locations = [['Google',150,80],['Nintendo',220,120],['Amazon',280,127]];
const colors = ['purple','red','green'];
var index = 0;
export default class ShowPlace extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loc: '',
      x: 0,
      y: 0,
      loaded: true
    };
  }
  static navigationOptions = {
    title: 'Company Location',
    headerBackTitle: 'Profile'
  }
  handleCanvas1 = (canvas) => {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.props.navigation.state.params.locx,this.props.navigation.state.params.locy, 20,20);
  }

  async loadmap(){
    const { navigate } = this.props.navigation;
    navigate('Applicant');
  }
  render() {
    const remote = 'https://firebasestorage.googleapis.com/v0/b/easy-hiring-57516.appspot.com/o/klauscareerfair.png?alt=media&token=c67ffdc5-123d-4a8e-b369-b35fc830962b';
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
          <TextInput
              style={{left: 17,top: 20, width: '90%'}}
              onChangeText={(text) => this.setState({loc: text})}
              value={this.state.loc}
            />
            <Button
                raised
                icon={{name: 'home', size: 26}}
                containerViewStyle={styles.buttoncontainer5}
                buttonStyle={styles.buttonhome}
                textStyle={{textAlign: 'center'}}
                onPress={this.loadmap.bind(this)}
                title="Back"
              />
              <Text style={{top: 36, fontSize: 14, color: 'red'}}> {locations[0][0]} </Text>
              <Text style={{top: 38, fontSize: 14, color: 'purple'}}> {locations[1][0]} </Text>
              <Text style={{top: 40, fontSize: 14, color: 'green'}}> {locations[2][0]} </Text>
        </View>
        <View>
            <Canvas ref={this.handleCanvas1}/>
        </View>
      </View>
    );
  }
}
