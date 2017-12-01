
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
const colors = ['red','purple','green'];
var index = 0;
export default class FloorMap extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      appState: FloorMap.currentState,
      loc: '',
      x: 0,
      y: 0,
      loaded: true
    };
  }

  static navigationOptions = {
    title: 'Floor Map',
    headerBackTitle: 'Profile',
    headerStyle: { backgroundColor: '#5F9EA0'},
    headerTitleStyle: { color: '#2F4F4F' },
  };
  componentDidMount() {
    this.findloc().done()
  }
  handleCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.fillRect(locations[0][1],locations[0][2],15, 15);
    ctx.fillStyle = 'purple';
    ctx.fillRect(locations[1][1],locations[1][2],15, 15);
    ctx.fillStyle = 'green';
    ctx.fillRect(locations[2][1],locations[2][2],15, 15);
  }

  async findloc(){
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    for(index = 0; index < locations.length; index++){
      if(locations[index][0].localeCompare(this.state.loc) == 0){
        await this.setState({x:locations[index][1] })
        await this.setState({y:locations[index][2] })
        navigate('IndoorLocation',{locx: this.state.x, locy: this.state.y});
      }
    }
  }
  backhome(){
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    navigate('Applicant');
  }
  render() {
    const { navigate } = this.props.navigation;
    const remote = 'https://lh3.googleusercontent.com/wKVps7t0hq9d_IjK5ImrkTXnzRZW1AEfzYe-AeQPXG721plaCyhrcPJVyUCQCZx36jR_EMEIPfdCI44lAn9m=w2356-h1076-rw';
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
              placeholder={"Company"}
            />
            <Button
                raised
                icon={{name: 'youtube-searched-for', size: 26}}
                containerViewStyle={styles.buttoncontainer5}
                buttonStyle={styles.buttonhome}
                onPress={this.findloc.bind(this)}
                textStyle={{textAlign: 'center'}}
                title="Search"
              />
              <Text style={{top: 36, fontSize: 14, color: 'red'}}> {locations[0][0]} </Text>
              <Text style={{top: 38, fontSize: 14, color: 'purple'}}> {locations[1][0]} </Text>
              <Text style={{top: 40, fontSize: 14, color: 'green'}}> {locations[2][0]} </Text>
        </View>
        <View>
            <Canvas ref={this.handleCanvas}/>
        </View>
      </View>
    );
  }
}
