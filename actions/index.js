import { getDecks, addDeck, addCardToDeck } from '../utils/api'

export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'

function getDecksAction (data) {
  return {
    type: GET_DECKS,
    decks: data
  }
}

function addDeckAction (id, title) {
  return {
    type: ADD_DECK,
    id,
    title,
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
    return getDecks().then(data => {
      console.log("DATAAA:", data)
      dispatch(getDecksAction(data)) 
    })
  }
}

export function handleAddDeck(title) {
  return (dispatch) => {
    return addDeck(title).then((id) => {
      dispatch(addDeckAction(id, title))
    })
  }
}

export function handleAddCard(card, id) {
  return (dispatch) => {
    return dispatch(addCardToDeck(card, id))
      .then(() => {
        dispatch(addCardAction(card, id))
      })
  }
}