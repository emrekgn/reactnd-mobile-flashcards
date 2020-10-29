import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { purple, lightPurp, red } from '../utils/colors'
import { Avatar, Button, Card, Title, Paragraph, Badge } from 'react-native-paper'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import Constants from 'expo-constants'

const LeftContent = props => <Avatar.Icon {...props} icon="comment-question-outline" />

class Quiz extends Component {
  state = {
    counter: 0,
    showAnswer: false,
    score: 0,
  }
  handleShowAnswer = () => {
    this.setState({
      showAnswer: true,
    })
  }
  handleAnswer = (correct) => {
    const { counter, score } = this.state

    this.setState({
      showAnswer: false,
      counter: counter + 1,
      score: correct ? score + 1 : score,
    })
  }
  restartQuiz = () => {
    this.setState({
      showAnswer: false,
      counter: 0,
      score: 0,
    })
  }
  resetDailyNotification = () => {
    if (Constants.isDevice && Platform.OS !== 'web') {
      clearLocalNotification().then(setLocalNotification)
    }
  }
  render() {
    const { counter, showAnswer, score } = this.state
    const { deck, navigation } = this.props
    const { title, questions } = deck

    if (counter === questions.length) {
      this.resetDailyNotification()
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Paragraph>You finished the quiz! Your score:</Paragraph>
          <View>
            <Badge size={30}>
              {(score / questions.length * 100).toFixed(2) + '%'}
            </Badge>
          </View>
          <Button
            style={{ marginTop: 15 }}
            mode='contained'
            icon='restart'
            onPress={this.restartQuiz}
          >
            <Text>Restart</Text>
          </Button>
          <Button
            style={{ marginTop: 10 }}
            mode='contained'
            icon='arrow-left'
            onPress={() => navigation.goBack()}
          >
            <Text>Back to Deck</Text>
          </Button>
        </View>
      )
    }

    const { question, answer } = questions[counter]

    return (
      <View style={{ flex: 1 }}>
        <Card>
          <Card.Title 
            title={title + ' ' + (counter+1) + '/' + questions.length} 
            left={LeftContent} 
          />
          <Card.Content>
            <Title>{question}</Title>
            { showAnswer 
              && <Paragraph style={styles.text}>{answer}</Paragraph> }
          </Card.Content>
          <Card.Actions>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
              <View style={{ flexDirection: 'row' }} >
                <Button
                  mode='contained'
                  icon='check-outline'
                  style={{ marginRight: 1 }}
                  onPress={() => this.handleAnswer(true)}
                >
                  <Text>Correct</Text>
                </Button>
                <Button
                  mode='contained'
                  icon='skull-crossbones-outline'
                  onPress={() => this.handleAnswer(false)}
                >
                  <Text>Incorrect</Text>
                </Button>
              </View>
              <Button
                onPress={this.handleShowAnswer}
                style={{ marginTop: 10, color: red }}
                mode='text'
              >
                <Text>Show Answer</Text>
              </Button>
            </View>
          </Card.Actions>
        </Card>
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

export default connect(mapStateToProps)(Quiz)