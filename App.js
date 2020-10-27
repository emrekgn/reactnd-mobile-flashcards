import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import NewDeck from './components/NewDeck'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import NewQuestion from './components/NewQuestion'
import Quiz from './components/Quiz'
import { white, purple, lightPurp } from './utils/colors'
import { StatusBar } from 'expo-status-bar'

const store = createStore(reducer, middleware)
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function DeckStack() {
  return (
    <Stack.Navigator initialRouteName="DeckList">
      <Stack.Screen name="DeckList" component={DeckList} options={{ title: 'Home' }} />
      <Stack.Screen name="Deck" component={Deck} options={{ title: 'Deck' }} />
      <Stack.Screen name="NewQuestion" component={NewQuestion} options={{ title: 'Add Card' }} />
      <Stack.Screen name="Quiz" component={Quiz} options={{ title: 'Quiz' }} />
    </Stack.Navigator>
  )
}

function Tabs() {
  return (
    <Tab.Navigator 
      initialRouteName="Stack"
      tabBarOptions={{
        activeTintColor: purple,
        inactiveTintColor: lightPurp,
      }}
      >
        <Tab.Screen name="DeckStack" component={DeckStack} options={{ title: 'Home' }} />
        <Tab.Screen name="NewDeck" component={NewDeck} options={{ title: 'New Deck' }} />
    </Tab.Navigator>
  )
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar style="light" />
          <NavigationContainer>
            <Tabs />
          </NavigationContainer>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})