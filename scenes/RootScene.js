import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class RootScene extends Component {
  render() {
    return (
      <View style={{margin: 128}}>
        <Text onPress={Actions.movieScene}>Movies</Text>
        <Text onPress={Actions.GoogleImagesSearchScene}>Images Google</Text>
        <Text onPress={Actions.MapViewScene}>Map View</Text>
      </View>
    )
  }
}
