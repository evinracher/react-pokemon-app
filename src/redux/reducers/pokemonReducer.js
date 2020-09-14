import { SEARCH, SEARCH_SUCCESS, SEARCH_ERROR } from '../actions/pokemonActions';

const initialState = {
  isSearching: false,
  // currPokemon: null,
  pokemonToShow: null,
  error: null
}

function pokemon(state = initialState, action) {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        isSearching: true,
        pokemonToShow: null,
        error: null
      }

    case SEARCH_SUCCESS:
      return {
        ...state,
        isSearching: false,
        pokemonToShow: action.payload.pokemon
      }

    case SEARCH_ERROR:
      return {
        ...state,
        isSearching: false,
        error: action.payload.error,
        pokemonToShow: null
      }
    default:
      return state;
  }
}

export default pokemon