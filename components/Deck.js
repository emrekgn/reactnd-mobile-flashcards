import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, lightPurp } from '../utils/colors'

class Deck extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>TEST</Text>
      </View>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: purple,
    marginBottom: 10
  },
  text: {
    fontSize: 15,
    color: lightPurp
  }
});


function mapStateToProps (decks, { route }) {
  return {
    deck: decks[route.params.id],
  }
}

export default connect(mapStateToProps)(Deck)