import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions/index'
import { generateUID } from '../utils/helpers'
import { Button } from 'react-native-paper'

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
      <View style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextInput
              styles={styles.row}
              onChangeText={this.handleChange}
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  }
})

export default connect()(NewDeck)
