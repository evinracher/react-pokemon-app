import {
  // SEARCH,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  CHANGE_NAME
} from '../actions/pokemonActions';

const initialState = {
  // isSearching: false,
  // currPokemon: null,
  nameToSearch: '',
  pokemonToShow: null,
  error: null
}

function pokemon(state = initialState, action) {
  switch (action.type) {
    case CHANGE_NAME:
      return {
        ...state,
        pokemonToShow: null,
        pokemonToCompare: null,
        error: null,
        nameToSearch: action.payload.name
      }

    case SEARCH_SUCCESS:
      return {
        ...state,
        pokemonToCompare: state.pokemonToShow,
        pokemonToShow: action.payload.pokemon
      }

    case SEARCH_ERROR:
      return {
        ...state,
        error: action.payload.error,
      }


    default:
      return state;
  }
}

export default pokemon