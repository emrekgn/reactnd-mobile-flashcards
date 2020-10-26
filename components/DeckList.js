import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { connect } from "react-redux"
import { handleInitialData } from '../actions'
import Deck from './Deck'

class DeckList extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { decks, navigation } = this.props

    if (decks == null || Object.keys(decks).length === 0) {
      return (
        <View style={styles.container}>
          <Text>You don't have any decks yet! You can create new decks in New Deck tab...</Text>
        </View>
      )
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          { Object.keys(decks).map(key => (
            <View key={key}>
              <Deck 
                deck={decks[key]} 
                onPress={(deck) => navigation.navigate("Deck", { id: deck.id })} 
              />
            </View>
          ))}
        </View>
      </ScrollView>
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


function mapStateToProps(decks) {
  return {
    decks,
  }
}

export default connect(mapStateToProps)(DeckList)