var React = require('react');
var ReactNative = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  TouchableHighlight,
  View 
} = ReactNative
var {
  Component,
  PropTypes
} = React




var SearchScreen = require('./SearchScreen');

class MovieMainScreen extends Component {
//    static propTypes = {
//     onBack: PropTypes.func.isRequired
//   }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          backgroundColor: "rgba(74,144,226,1)",
        }}>
            <NavigatorIOS
              style = {styles.container}
              initialRoute = {{
                title: 'Movies',
                component: SearchScreen,
              }}
            />
      </View>
      
//             <TouchableHighlight
//               onPress={this.props.onBack}>
//               <Text>Back</Text>
//             </TouchableHighlight>
    )
  }
}

module.exports = MovieMainScreen//sent this component to import MovieMainScreen from './movie/main_screen'

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});