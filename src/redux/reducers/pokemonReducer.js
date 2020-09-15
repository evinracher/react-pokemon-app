import {
  // SEARCH,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  CHANGE_NAME,
  COMPARE,
  STOP_COMPARE
} from '../actions/pokemonActions';

const initialState = {
  nameToSearch: '',
  pokemonToShow: null,
  pokemonToCompare: null,
  isComparing: false,
  isSearching: true,
  error: null
}

function pokemon(state = initialState, action) {
  switch (action.type) {
    case CHANGE_NAME:
      return {
        ...state,
        pokemonToCompare: state.pokemonToShow,
        error: null,
        isSearching: true,
        nameToSearch: action.payload.name
      }

    case SEARCH_SUCCESS:
      return {
        ...state,
        isSearching: false,
        pokemonToCompare: state.pokemonToShow,
        pokemonToShow: action.payload.pokemon,
      }

    case SEARCH_ERROR:
      return {
        ...state,
        error: action.payload.error,
      }

    case COMPARE:
      console.log("to compare:");
      console.log(state.pokemonToCompare);
      return {
        ...state,
        isComparing: true
      }
    
    case STOP_COMPARE:
      return {
        ...state,
        isComparing: false,
        pokemonToShow: state.pokemonToCompare,
        pokemonToCompare: null
      }

    default:
      return state;
  }
}

export default pokemon