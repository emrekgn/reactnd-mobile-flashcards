import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import NewDeck from './components/NewDeck'

const Tab = createBottomTabNavigator()

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="DeckList" component={DeckList} options={{ title: 'Decks' }} />
      <Tab.Screen name="NewDeck" component={NewDeck} options={{ title: 'New' }} />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator()

const store = createStore(reducer, middleware)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Tabs} options={{ title: 'Home' }} />
            <Stack.Screen name="Deck" component={Deck} options={{ title: 'Deck' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
