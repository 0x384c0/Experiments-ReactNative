/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  Text,
} from 'react-native'

class ReactNativeExperiments extends Component {
  render() {
    
    
    fetch('https://api.github.com/orgs/octokit/repos')
      .then((response) => response.json())
      .then((responseJson) => responseJson.forEach((item) => console.log(item.description)))
      .catch((error) => console.warn(error));
    
    
    fetch('http://besmart.kg/api/v2/events')
      .then((response) => response.json() )
      .then((responseJson) => console.log(responseJson.status))
      .catch((error) => console.warn(error));
    
    return (
      <Text
        style={{
          color: 'black',
          fontSize: 65,
          fontWeight: "200",
          fontFamily: 'Helvetica Neue',
        }}>
        My Text
      </Text>
    );
  }
}

AppRegistry.registerComponent('ReactNativeExperiments', () => ReactNativeExperiments);
