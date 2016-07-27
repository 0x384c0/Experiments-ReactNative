
// var ReactNative = require('react-native')
// var {
//   AppRegistry
// } = ReactNative
import React,       { Component }         from 'react'
import ReactNative, { AppRegistry, Text } from 'react-native'
import              { Router, Scene }     from 'react-native-router-flux'

import NetworkListScene           from './scenes/NetworkListScene'
import UIListScene                from './scenes/UIListScene'

import GoogleImagesSearchScene    from './scenes/network/GoogleImagesSearchScene'
import ImageScene                 from './scenes/network/ImageScene'
import MapViewScene               from './scenes/UI/MapViewScene'
import MovieScene                 from './movie/main_screen'

export default class ReactNativeExperiments extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="tabbar" tabs={true} initial={true}>
            <Scene key="network_tab"  title="Network" icon={TabIcon} titleStyle={{color:'red'}}>
              <Scene key="network_list"             component={NetworkListScene}        title="Network list"        onRight={()=>alert("Right button tap")} rightTitle="Right" />
              <Scene key="movieScene"               component={MovieScene}              title="MovieScene Title"    hideTabBar={true}   />
              <Scene key="GoogleImagesSearchScene"  component={GoogleImagesSearchScene} title="Images Search"       hideTabBar={true}   />
              <Scene key="ImageScene"               component={ImageScene}              title="Image"               hideTabBar={true}   />
            </Scene>
            <Scene key="ui_tab"  title="UI" icon={TabIcon}>
              <Scene key="ui_list"                  component={UIListScene}             title="UI list"             onRight={()=>alert("Right button tap")} rightTitle="Right" />
              <Scene key="MapViewScene"             component={MapViewScene}            title="Map View"            hideTabBar={true}/>
            </Scene>
          </Scene>
        </Scene>
      </Router>
    )
  }
}
AppRegistry.registerComponent('ReactNativeExperiments', () => ReactNativeExperiments)


class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}
