import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

class NewDeck extends Component {
  render() {
    return (
      <View>
        <Text>New Deck</Text>
      </View>
    )
  }
}

export default connect()(NewDeck)
