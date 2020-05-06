import React, { Component, }              from 'react'
import { View,Text,StyleSheet,Platform }  from 'react-native'
import MapView                            from 'react-native-maps'

import Constants  from '../../Constants'

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
    paddingTop:Constants.getBarHeigh(), //nav bar height
    backgroundColor: 'white',
  },
});

export default MapViewScene
