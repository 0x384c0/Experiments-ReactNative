'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Navigator,
  BackAndroid,
  ToolbarAndroid,
  View,
} = ReactNative;

var SearchScreen = require('./movie/SearchScreen');
var MovieScreen = require('./movie/MovieScreen');

var ReactNativeExperiments = React.createClass({
  render: function() {
    var initialRoute = {name: 'search'};
    return (
      <Navigator
        style={styles.container}
        initialRoute={initialRoute}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={RouteMapper}
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
  toolbar: {
    backgroundColor: '#a9a9a9',
    height: 56,
  },
});


var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
  if (route.name === 'search') {
    return (
      <SearchScreen navigator={navigationOperations} />
    );
  } else if (route.name === 'movie') {
    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid
          actions={[]}
          navIcon={require('image!android_back_white')}
          onIconClicked={navigationOperations.pop}
          style={styles.toolbar}
          titleColor="white"
          title={route.movie.title} />
        <MovieScreen
          style={{flex: 1}}
          navigator={navigationOperations}
          movie={route.movie}
        />
      </View>
    );
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// http://localhost:8081/debugger-ui
// import { AppRegistry } from 'react-native';
// import MainScreen from './main_screen';
// AppRegistry.registerComponent('MainScreen', () => MainScreen);