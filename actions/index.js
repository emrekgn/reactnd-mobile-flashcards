import { getDecks } from '../utils/api'

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

export function handleInitialData () {
  return (dispatch) => {
    return getDecks().then(data => {
      dispatch(getDecksAction(data)) 
    })
  }
}