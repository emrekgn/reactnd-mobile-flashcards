import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, lightPurp } from '../utils/colors'

class Deck extends Component {
  render() {
    const { deck, onPress } = this.props

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress(deck)}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>
            {questions.length > 1 || questions.length < 1
              ? `${questions.length} Cards`
              : `${questions.length} Card`}
          </Text>
        </TouchableOpacity>
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

export default Deck