import React, { Component } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
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

    dispatch(handleAddDeck({
      id: generateUID(),
      title,
      questions: []
    }))
    navigation.goBack()
  }
  render() {
    const { title } = this.state

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TextInput
            styles={styles.row}
            label="What is the title of your new deck?"
            value={title}
            onChangeText={this.handleTextChange}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button 
            onPress={this.handleSubmit} 
            style={{ marginTop: 10 }}
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
