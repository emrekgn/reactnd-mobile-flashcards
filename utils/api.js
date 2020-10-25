import AsyncStorage from '@react-native-async-storage/async-storage'
import { generateUID } from './helpers'

export const DECK_STORAGE_KEY = "@mobile-flashcards:decks";

// Just some initial data for demo purposes:
const data = {
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

const initData = () => {
  getData(DECK_STORAGE_KEY).then((data) => {
    if (!data) {
      storeData(DECK_STORAGE_KEY, data)
    }
  })
}

export function getDecks() {
  return getData(DECK_STORAGE_KEY).then(JSON.parse)
}

export function getDeck(id) {
  return getData(DECK_STORAGE_KEY)
    .then((data) => JSON.parse(data)[id])
}

export function addDeck(title) {
  getDecks().then((data) => {
    const deckId = generateUID()
    data[deckId] = {
      title: title,
      id: deckId,
      questions: []
    }
    storeData(DECK_STORAGE_KEY, data)
    return deckId
  })
}

export function addCardToDeck(card, deckId) {
  getDecks().then((data) => {
    if (!data[deckId]) {
      return
    }
    data[deckId].questions.push(card)
    storeData(DECK_STORAGE_KEY, data)
  })
}

// Initialize with dummy data for demo
initData()