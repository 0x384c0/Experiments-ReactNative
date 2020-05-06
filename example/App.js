/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import * as React from 'react';
import { Button, View, Text, FlatList, StyleSheet,TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
          data={[
            {key: 'NavigationScreen1'},
            {key: 'Rest api wiki'},
            {key: 'Rest api google images'},
            {key: 'Map'},
          ]}
          renderItem={({item}) => <TouchableHighlight onPress={() => navigation.navigate(item.key)}>
            <Text style={styles.item}>{item.key}</Text>
            </TouchableHighlight>
            }
        />
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})


function NavigationScreen1({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>NavigationScreen1 Screen</Text>
      <Button
        title="Go to NavigationScreen2"
        onPress={() => navigation.navigate('NavigationScreen2')}
      />
      </View>
      );
}

function NavigationScreen2({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>NavigationScreen2 Screen</Text>
      <Button
        title="Go to NavigationScreen2... again"
        onPress={() => navigation.push('NavigationScreen2')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NavigationScreen1" component={NavigationScreen1} options={{headerBackTitleVisible:false}} />
        <Stack.Screen name="NavigationScreen2" component={NavigationScreen2} options={{headerBackTitleVisible:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;