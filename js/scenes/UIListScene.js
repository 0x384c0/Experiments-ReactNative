import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Constants  from '../Constants'

export default class UIListScene extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle} onPress={Actions.MapViewScene}>Map View</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    paddingTop:Constants.getBarHeigh(),
    backgroundColor: 'white',
  },
  textStyle: {
    flex: 1,
    padding:20,
    paddingBottom:0,
    fontSize: 18,
    fontWeight: '500',
  },
})
