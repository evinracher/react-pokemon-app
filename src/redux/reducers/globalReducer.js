import {
  SHOW,
  STOP_SHOW,
  UPDATE_POKEMONS
} from '../actions/globalActions';

const initialState = {
  isShowing: false,
  isComparing: false,
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
      console.log(state.pokemonsList);
      console.log([].concat(action.payload.pokemons));
      console.log(action.payload.pokemons);
      action.payload.pokemons.forEach((element) => {
        console.log("Entra")
        console.log(element.name)
      }
      )
      return {
        nextURL: action.payload.nextURL,
        pokemonsList: [...state.pokemonsList, ...action.payload.pokemons]
      }
    default:
      return state;
  }
}

export default global