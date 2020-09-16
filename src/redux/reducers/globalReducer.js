import {
  SHOW,
  STOP_SHOW,
  UPDATE_POKEMONS,
  LOADING
} from '../actions/globalActions';

const initialState = {
  isShowing: false,
  isComparing: false,
  isLoading: false,
  loadingError: null,
  nameToSearch: '',
  pokemonsList: [],
  nextURL: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
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
        isLoading: action.payload.isLoading,
        nextURL: action.payload.nextURL,
        pokemonsList: state.pokemonsList.concat(action.payload.pokemons)
      }

    case LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        loadingError: action.payload.loadingError
      }
    default:
      return state;
  }
}

export default global