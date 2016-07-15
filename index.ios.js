'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} = ReactNative;




var SearchScreen = require('./movie/SearchScreen');


var ReactNativeExperiments = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style = {styles.container}
        initialRoute = {{
          title: 'Movies',
          component: SearchScreen,
        }}
      />
    );
  }
});

AppRegistry.registerComponent('ReactNativeExperiments', () => ReactNativeExperiments);

module.exports = ReactNativeExperiments;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// http://localhost:8081/debugger-ui
// import { AppRegistry } from 'react-native';
// import MainScreen from './main_screen';
// AppRegistry.registerComponent('MainScreen', () => MainScreen);