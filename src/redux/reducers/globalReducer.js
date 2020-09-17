import {
  SHOW,
  STOP_SHOW,
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
  currURL: initialURL,
  nextURL: initialURL
}

// Global reducer
function global(state = initialState, action) {
  switch (action.type) {
    case SHOW:
      return {
        ...state,
        isShowing: true
      }

    case STOP_SHOW:
      return {
        ...state,
        isShowing: false,
        name: ''
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