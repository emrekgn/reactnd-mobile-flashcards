import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { purple, lightPurp, red } from '../utils/colors'
import { Button, Card, Title, Paragraph } from 'react-native-paper'
import { handleRemoveDeck } from '../actions/index'

class Deck extends Component {
  handleRemoveDeck = () => {
    const { deck, dispatch, navigation } = this.props

    dispatch(handleRemoveDeck(deck.id))
    navigation.goBack()
  }
  render() {
    const { deck, navigation } = this.props

    if (!deck) {
      return (
        <View style={{ flex: 1 }}>
          <Text>Processing...</Text>
        </View>
      )
    }

    const { title, id, questions } = deck

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          <Card>
            <Card.Content style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
              <View>
                <Title style={styles.title}>{title}</Title>
              </View>
              <View>
                <Paragraph style={styles.text}>
                  {questions.length > 1
                    ? questions.length + ' Cards'
                    : questions.length + ' Card'}
                </Paragraph>
              </View>
            </Card.Content>
          </Card>
        </View>
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            onPress={() => navigation.navigate('Quiz', { id: id })}
            disabled={questions.length === 0}
            mode='contained'
            icon='comment-question'
            >
              <Text>Start Quiz</Text>
          </Button>
          <Button
            style={{ marginTop: 10 }}
            onPress={() => navigation.navigate('NewQuestion', { id: id })}
            mode='contained'
            icon='plus'
            >
              <Text>Add Card</Text>
          </Button>
          <Button
            style={{ marginTop: 10 }}
            theme={{ color: red }}
            onPress={this.handleRemoveDeck}
            mode='text'
            icon='delete'
            >
              <Text>Remove Deck</Text>
          </Button>
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
    fontSize: 25,
    fontWeight: "bold",
    color: purple,
    marginBottom: 10
  },
  text: {
    fontSize: 15,
    color: lightPurp,
  }
});


function mapStateToProps (decks, { route }) {
  return {
    deck: decks[route.params.id],
  }
}

export default connect(mapStateToProps)(Deck)