
// var ReactNative = require('react-native')
// var {
//   AppRegistry
// } = ReactNative
import React,       { Component }        from 'react'
import ReactNative, { AppRegistry }      from 'react-native'
import              { Router, Scene }    from 'react-native-router-flux'

import RootScene                  from './scenes/RootScene'
import GoogleImagesSearchScene    from './scenes/network/GoogleImagesSearchScene'
import ImageScene                 from './scenes/network/ImageScene'
import MapViewScene               from './scenes/UI/MapViewScene'
import MovieScene                 from './movie/main_screen'

export default class ReactNativeExperiments extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="rootScene" component={RootScene} title="RootScene Title" initial={true} />
          <Scene key="movieScene" component={MovieScene} title="MovieScene Title" />
          <Scene key="GoogleImagesSearchScene" component={GoogleImagesSearchScene} title="Images Search" />
          <Scene key="ImageScene" component={ImageScene} title="Image" />
          <Scene key="MapViewScene" component={MapViewScene} title="Map View" />
        </Scene>
      </Router>
    )
  }
}
AppRegistry.registerComponent('ReactNativeExperiments', () => ReactNativeExperiments)
