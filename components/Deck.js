import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, lightPurp } from '../utils/colors'

class Deck extends Component {
  render() {
    const { deck, navigation } = this.props
    const { title, id, questions } = deck

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>
              {questions.length > 1
                ? questions.length + ' Cards'
                : questions.length + ' Card'}
            </Text>
        </View>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Quiz', { id: id })}
            disabled={questions.length === 0}
            >
              <Text>Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('NewQuestion', { id: id })}
            >
            <Text>Add Card</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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