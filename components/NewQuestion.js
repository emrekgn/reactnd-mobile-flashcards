import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { handleAddCard } from '../actions/index'

class NewQuestion extends Component {
  state = {
    question: '',
    answer: '',
  }
  handleQuestionTextChange = (question) => {
    this.setState({
      question,
    })
  }
  handleAnswerTextChange = (answer) => {
    this.setState({
      answer,
    })
  }
  handleSubmit = () => {
    const { question, answer } = this.state
    const { dispatch, navigation, deckId } = this.props

    if (!question.trim() || !answer.trim()) {
      alert('Please enter both of your question and answer!')
      return
    }

    dispatch(handleAddCard({
      question, answer
    }, deckId))
    navigation.goBack()
  }
  render() {
    const { question, answer } = this.state

    return (
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={{ flexDirection: 'column', flex: 2, justifyContent: 'center', padding: 10 }}>
          <TextInput
            styles={styles.row}
            label="Question"
            value={question}
            onChangeText={this.handleQuestionTextChange}
          />
          <TextInput
            styles={[styles.row, { marginTop: 10 }]}
            label="Answer"
            value={answer}
            onChangeText={this.handleAnswerTextChange}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
          <Button 
            onPress={this.handleSubmit} 
            mode='contained'
            icon='content-save'
            >
              <Text>Submit</Text>
          </Button>
          </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    alignItems: 'center',
  }
})

function mapStateToProps (decks, { route }) {
  return {
    deckId: route.params.id,
  }
}

export default connect(mapStateToProps)(NewQuestion)