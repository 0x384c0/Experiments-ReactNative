
//dependencies
var React = require('react');
var ReactNative = require('react-native');

var {
  AppRegistry,
  Image,
  Text,
  View,
  Navigator,
  TouchableHighlight,
} = ReactNative
var {
  Component,
  PropTypes
} = React

//imports
import MovieMainScreen from './movie/main_screen';

//Root component
class ReactNativeExperiments extends Component {
  render() {
    return (
      <Navigator
        initialRoute={ { title: 'My Initial Scene', index: 0 } }
        renderScene={RouteMapper}
      />
    )
  }
}


//navigation
var MOVIES_SCREEN_ROUTE_ID = "Routes.movieScreen";
var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations
    console.log("index - "+route.index)
    console.log("title - "+route.title)
  switch (route.title) {
    case MOVIES_SCREEN_ROUTE_ID:
          return (<MovieMainScreen
                     onBack={() => { if (route.index > 0) { _navigator.pop(); } }}
                    />);
      default: 
          return (
               <RootScene
                    title={route.title}
                    // Function to call when a new scene should be displayed           
                    //onForward={(routeTitle) => { const nextIndex = route.index + 1; _navigator.push({ title: routeTitle || 'Scene ' + nextIndex, index: nextIndex, }); }}
                     onForward={(routeTitle) => { const nextIndex = route.index + 1; _navigator.push({ title: routeTitle || 'Scene ' + nextIndex, index: nextIndex, }); }}
                    // Function to call to go back to the previous scene
                    onBack1={() => { if (route.index > 0) { _navigator.pop(); } }}
                    index={route.index}
                  />
          );
  }
  
}

//root scene
class RootScene extends Component {
  static propTypes = {//interface
    title: PropTypes.string.isRequired,
    onForward: PropTypes.func.isRequired,
    onBack1: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
  }
  render() { //realization
    var text = "text"
    return (
      <View>
        <Text style={TextStyle}>Root screen </Text>
        <Text style={TextStyle}>Current Scene: {this.props.title }</Text>
        <TouchableHighlight onPress={() => {this.props.onForward(null)}}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.onBack1}>
          <Text>Tap me to go back</Text>
        </TouchableHighlight>
        
        <TouchableHighlight onPress={() => {this.props.onForward(MOVIES_SCREEN_ROUTE_ID)}}>
          <Text>Movies</Text>
        </TouchableHighlight>
      </View>
    )
  }
}



//init
AppRegistry.registerComponent('ReactNativeExperiments', () => ReactNativeExperiments);

//styles
var TextStyle = {
            color: 'black',
            fontSize: 18,
            fontWeight: 'normal',
            fontFamily: 'Helvetica Neue',
          }
