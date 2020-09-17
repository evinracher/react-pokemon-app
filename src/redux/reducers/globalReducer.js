import {
  SHOW,
  STOP_SHOW,
  COMPARE,
  STOP_COMPARE,
  UPDATE_POKEMONS,
  LOADING
} from '../actions/globalActions';

// Start in this position to ilustrate something
// const initialURL = 'https://pokeapi.co/api/v2/pokemon/?offset=980&limit=20';
const initialURL = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20';

const initialState = {
  isShowing: false,
  isComparing: false,
  isLoading: false,
  pokemonsList: [],
  pokemonToShow: null,
  pokemonToCompare: null,
  currURL: initialURL,
  nextURL: initialURL
}

// Global reducer
function global(state = initialState, action) {
  switch (action.type) {
    case SHOW:
      return {
        ...state,
        isShowing: true,
        pokemonToShow: action.payload.pokemonToShow
          ? action.payload.pokemonToShow
          : state.pokemonToShow,
        pokemonToCompare: action.payload.pokemonToCompare
          ? action.payload.pokemonToCompare
          : null
      }

    case STOP_SHOW:
      return {
        ...state,
        isShowing: false,
      }

    case COMPARE:
      return {
        ...state,
        isShowing: false,
        isComparing: true,
      }
    
    case STOP_COMPARE:
      return {
        ...state,
        isShowing: false,
        isComparing: false
      }

    case UPDATE_POKEMONS:
      return {
        ...state,
        isLoading: false,
        pokemonsList: state.pokemonsList.concat(action.payload.pokemons),
        nextURL: action.payload.nextURL
      }

    case LOADING:
      return {
        ...state,
        isLoading: true,
        currURL: state.nextURL,
      }
    default:
      return state;
  }
}

export default global