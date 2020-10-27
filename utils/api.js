import AsyncStorage from '@react-native-async-storage/async-storage'

export const DECK_STORAGE_KEY = "@mobile-flashcards:decks";

// Just some initial data for demo purposes:
const INITIAL_DATA = {
  'fghns1lhvy4ik4nc5o90il': {
    title: 'React',
    id: 'fghns1lhvy4ik4nc5o90il',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  'w2w6c52os86hvpug7bb5n': {
    title: 'JavaScript',
    id: 'w2w6c52os86hvpug7bb5n',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.error("Error occurred: ", e)
  }
}

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.error("Error occurred: ", e)
  }
}

export function getDecks() {
  return getData(DECK_STORAGE_KEY)
    .then((data) => {
      if (data === null) {
        // Set initial data for demo purposes
        storeData(DECK_STORAGE_KEY, INITIAL_DATA)
        return INITIAL_DATA
      }
      return data
    })
}

export function addDeck(deck) {
  const jsonValue = JSON.stringify({ 
    [deck.id]: deck
  })
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, jsonValue)
}

export function addCardToDeck(card, id) {
  getDecks().then((data) => {
    if (!data[id]) {
      console.log('Deck with provided ID does not exist:', id)
      return
    }
    data[id].questions.push(card)
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(data))
  })
}
