import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions/index'
import { purple, white } from '../utils/colors'

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

    dispatch(handleAddDeck(title))
    navigation.goBack()
  }
  render() {
    const { title } = this.state
    return (
      <View styles={styles.container}>
          <TextInput
            styles={styles.row}
            onChangeText={this.handleChange}
            placeholder="What is the title of your new deck?"
            value={title}
            onChangeText={this.handleTextChange}
          />
          <TouchableOpacity 
            onPress={this.handleSubmit} 
            style={styles.submitBtn}>
              <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
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
  },
  submitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
})

export default connect()(NewDeck)
