import { getDecks, addDeck, removeDeck, addCardToDeck } from '../utils/api'

export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_CARD = 'ADD_CARD'

function getDecksAction (data) {
  return {
    type: GET_DECKS,
    decks: data
  }
}

function addDeckAction (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

function removeDeckAction (id) {
  return {
    type: REMOVE_DECK,
    id,
  }
}

function addCardAction (card, id) {
  return {
    type: ADD_CARD,
    card,
    id,
  }
}

export function handleInitialData () {
  return (dispatch) => {
    return getDecks()
      .then(data => {
        dispatch(getDecksAction(data)) 
      }).catch(err => console.log(err))
  }
}

export function handleAddDeck (deck) {
  return (dispatch) => {
    return addDeck(deck)
      .then(() => {
        dispatch(addDeckAction(deck))
      })
      .catch(err => console.log(err))
  }
}

export function handleRemoveDeck (id) {
  return (dispatch) => {
    return removeDeck(id)
      .then(() => { 
        dispatch(removeDeckAction(id)) 
      })
      .catch(err => console.log(err))
  }
}

export function handleAddCard (card, id) {
  return (dispatch) => {
    return addCardToDeck(card, id)
      .then(() => {
        dispatch(addCardAction(card, id))
      })
      .catch(err => console.log(err))
  }
}