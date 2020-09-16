import {
  INIT,
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  CHANGE_NAME_TO_SEARCH
} from '../actions/pokemonActions';

const initialState = {
  nameToSearch: null,
  pokemonSearched: null,
  isSearching: true,
  error: null
}

function pokemon(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        pokemonSearched: null
      }

    case CHANGE_NAME_TO_SEARCH:
      return {
        ...state,
        error: null,
        isSearching: true,
        nameToSearch: action.payload.name
      }

    case SEARCH:
      return {
        ...state,
        isSearching: true,
      }

    case SEARCH_SUCCESS:
      return {
        ...state,
        isSearching: false,
        nameToSearch: null,
        pokemonSearched: action.payload.pokemon,
      }

    case SEARCH_ERROR:
      return {
        ...state,
        nameToSearch: null,
        error: action.payload.error,
      }

    default:
      return state;
  }
}

export default pokemon