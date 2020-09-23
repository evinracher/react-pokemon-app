import {
  INIT,
  SHOW,
  STOP_SHOW,
  COMPARE,
  STOP_COMPARE,
  UPDATE_POKEMONS,
  LOADING,
  SEARCH,
  STOP_SEARCH
} from '../actions/globalActions';

const initialURL = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20';

const initialState = {
  isInitializing: true,
  isShowing: false,
  isComparing: false,
  isLoading: false,
  isSearching: false,
  pokemonsList: [],
  pokemonsFiltered: [],
  pokemonToShow: null,
  pokemonToCompare: null,
  currURL: '',
  nextURL: initialURL
}

function global(state = initialState, action) {
  switch (action.type) {
    case INIT:
      if (state.pokemonsList.length === 0) {
        return {
          ...state,
          isLoading: true,
          isInitializing: false,
          currURL: state.nextURL,
        }
      } else {
        return {
          ...state,
          isLoading: false,
          isInitializing: false
        }
      }
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

    case SEARCH:
      return {
        ...state,
        isSearching: true,
        pokemonsFiltered: action.payload.pokemonsFiltered
      }

    case STOP_SEARCH:
      return {
        ...state,
        isSearching: false,
        pokemonsFiltered: []
      }
    default:
      return state;
  }
}

export default global