import { getOnePokemon } from '../../Utils';
export const INIT = 'INIT';
export const SEARCH = 'SEARCH';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const CHANGE_NAME_TO_SEARCH = 'CHANGE_NAME_TO_SEARCH';

const URL = 'https://pokeapi.co/api/v2/pokemon/';

export const initPokemon = () => {
  return {
    type: INIT
  }
}

export const searchByName = (param) => async (dispatch) => {
  const name = param.trim().replace(/\s+/g, "-");
  if (!name) {
    console.log("Invalid pokemon name");
    dispatch({
      type: SEARCH_ERROR,
      payload: {
        error: 'Invalid pokemon name'
      }
    })
    return;
  }

  dispatch({
    type: SEARCH
  })

  try {
    const pokemon = await getOnePokemon(URL+name);
    dispatch({
      type: SEARCH_SUCCESS,
      payload: {
        pokemon
      }
    })
  } catch (error) {
    console.log('%cThere was an error while searching: ' + name, "color: orange;");
    console.log('%c' + error, "color: orange;");
    dispatch({
      type: SEARCH_ERROR,
      payload: {
        error: error.toString()
      }
    })
  }
}

export const changeNameToSearch = (name) => {
  return {
    type: CHANGE_NAME_TO_SEARCH,
    payload: {
      name
    }
  }
}