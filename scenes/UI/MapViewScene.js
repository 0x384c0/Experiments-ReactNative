import React, { Component, } from 'react'
import { View,Text,StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

class MapViewScene extends Component {

  static propTypes = {}
  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
      <Text> Map View</Text>
      <MapView
      style={styles.container}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
    }}
  />
      </View>
    )
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:70,
    backgroundColor: 'white',
  },
});

export default MapViewScene
