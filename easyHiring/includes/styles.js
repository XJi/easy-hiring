const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    // justifyContent:'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  buttonhome: {
    borderRadius: 7,
    backgroundColor: '#5F9EA0',
  },
  buttoncontainer: {
    borderRadius: 10,
    width: '56%',
    left: '17%',
    top: '195%',
  },
  buttoncontainer1: {
    borderRadius: 10,
    width: '56%',
    left: '17%',
    top: '202%',
  },
  buttoncontainer3: {
    borderRadius: 10,
    width: '56%',
    left: '17%',
    top: '140%',
  },
  buttoncontainer4: {
    borderRadius: 10,
    width: '56%',
    left: '17%',

  },
  listview: {
    flex: 1,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 22,
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  heading: {
    textAlign:"center",
    padding:5,
    fontSize: 24,
  },
  qrcode: {
    alignItems: 'center',
    padding: 5,
  },
  title: {
    backgroundColor:'#68a0cf',
    overflow: 'hidden',
    color: '#fff',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  tomapbutton:{
    backgroundColor:'#68a0cf',
  }
})

module.exports = styles
module.exports.constants = constants;
