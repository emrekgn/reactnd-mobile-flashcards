import React, { Component } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions/index'
import { generateUID } from '../utils/helpers'

class NewDeck extends Component {
  state = {
    title: '',
  }
  handleTextChange = (title) => {
    this.setState({
      title,
    })
  }
  handleSubmit = () => {
    const { title } = this.state
    const { dispatch, navigation } = this.props

    if (!title.trim()) {
      alert('Please enter title of your new deck!')
      return
    }

    const id = generateUID()
    dispatch(handleAddDeck({
      id,
      title,
      questions: []
    }))
    navigation.navigate('Deck', {
      id
    })
  }
  render() {
    const { title } = this.state

    return (
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
          <TextInput
            styles={styles.row}
            label="What is the title of your new deck?"
            value={title}
            onChangeText={this.handleTextChange}
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
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  }
})

export default connect()(NewDeck)
