import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import NewDeck from './components/NewDeck'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import NewQuestion from './components/NewQuestion'
import Quiz from './components/Quiz'
import { activeColor, inactiveColor, purple } from './utils/colors'
import { Provider as PaperProvider } from 'react-native-paper'
import UdaciStatusBar from './components/UdaciStatusBar'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const store = createStore(reducer, middleware)
const Stack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator()

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
      initialRouteName="DeckStack"
      activeColor={activeColor}
      inactiveColor={inactiveColor}
      barStyle={{ backgroundColor: '#694fad' }}
      >
        <Tab.Screen 
          name="DeckStack" 
          component={DeckStack}
          options={{ 
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }} 
        />
        <Tab.Screen 
          name="NewDeck" 
          component={NewDeck} 
          options={{ 
            tabBarLabel: 'New Deck',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="plus" color={color} size={26} />
            ),
          }} 
        />
    </Tab.Navigator>
  )
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PaperProvider>
          <View style={styles.container}>
            <UdaciStatusBar backgroundColor={purple} style="light" />
            <NavigationContainer>
              <Tabs />
            </NavigationContainer>
          </View>
        </PaperProvider>
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