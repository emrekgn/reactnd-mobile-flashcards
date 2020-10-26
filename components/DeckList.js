import React, { Component } from 'react'
import { SafeAreaView, View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions'
import { purple, lightPurp } from '../utils/colors'

class DeckList extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { decks, navigation } = this.props

    const renderItem = ({ item }) => (
      <TouchableOpacity 
        onPress={() => navigation.navigate('Deck', { id: item.id })}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>
            {item.questions.length > 1
              ? item.questions.length + ' Cards'
              : item.questions.length + ' Card'}
          </Text>
      </TouchableOpacity>
    )

    if (decks == null || Object.keys(decks).length === 0) {
      return (
        <View style={styles.container}>
          <Text>You don't have any decks yet! You can create new decks in New Deck tab...</Text>
        </View>
      )
    }

    return (
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={Object.values(decks)}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
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
})


function mapStateToProps(decks) {
  return {
    decks,
  }
}

export default connect(mapStateToProps)(DeckList)