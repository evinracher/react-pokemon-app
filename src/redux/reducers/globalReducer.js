import {
  SHOW,
  STOP_SHOW
} from '../actions/globalActions';

const initialState = {
  isShowing: false,
  isComparing: false,
  nameToSearch: '',
  pokemonsList: null
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

    default:
      return state;
  }
}

export default global