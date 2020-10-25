import { GET_DECKS, 
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD,
  REMOVE_CARD
} from '../actions'

export default function decks (state = {}, action) {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK: {
      const { id, title } = action
      return {
        ...state,
        [id]: {
          title: title,
          id: id,
          questions: []
        }
      }
    }
    case REMOVE_DECK: {
      const { id } = action
      const newState = {
        ...state,
      }
      newState[id] = undefined
      delete newState[id]
      return newState
    }
    case ADD_CARD: {
      const { id, card } = action
      return {
        ...state,
        [id]: {
          ...state[id],
          questions: state[id].questions.push(card)
        }
      }
    }
    case REMOVE_CARD: {
      const { id, card } = action
      return {
        ...state,
        [id]: {
          ...state[id],
          questions: state[id].questions.filter(item => item.question !== card.question)
        }
      }
    }
    default:
      return state
  }
}