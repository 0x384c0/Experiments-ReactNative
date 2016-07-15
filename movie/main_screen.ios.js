var React = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} = ReactNative;




var SearchScreen = require('./SearchScreen');


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