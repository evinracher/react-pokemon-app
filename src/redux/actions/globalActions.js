import { getOnePokemon } from '../../Utils';
export const SHOW = 'SHOW';
export const STOP_SHOW = 'STOP_SHOW';
export const COMPARE = 'COMPARE';
export const STOP_COMPARE = 'STOP_COMPARE';
export const UPDATE_POKEMONS = 'UPDATE_POKEMONS';
export const LOADING = 'LOADING';

// Uses the pokemonToShow
export const show = (pokemonToShow, pokemonToCompare) => {
  return {
    type: SHOW,
    payload: {
      pokemonToShow,
      pokemonToCompare
    }
  }
}

export const stopShow = () => {
  return {
    type: STOP_SHOW
  }
}

export const compare = () => {
  return {
    type: COMPARE
  }
}

export const stopCompare = () => {
  return {
    type: STOP_COMPARE
  }
}

export const load = () => {
  return {
    type: LOADING
  }
}

export const updatePokemons = (URL) => async (dispatch) => {
  try {

    let data = await fetch(URL).then(res => res.json());
    const pokemons = await Promise.all(
      data.results.map((result) => {
        return getOnePokemon(result.url);
      })
    )

    dispatch({
      type: UPDATE_POKEMONS,
      payload: {
        isLoading: false,
        nextURL: data.next,
        pokemons
      }
    })
  } catch (error) {
    console.error('There was a problem in loading pokemons');
    console.error(error);
  }
}