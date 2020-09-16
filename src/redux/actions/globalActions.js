import { getOnePokemon } from '../../Utils';
export const SHOW = 'SHOW';
export const STOP_SHOW = 'STOP_SHOW';
export const COMPARE = 'COMPARE';
export const STOP_COMPARE = 'STOP_COMPARE';
export const UPDATE_POKEMONS = 'UPDATE_POKEMONS';
export const LOADING = 'LOADING';

// Uses the pokemonToShow
export const show = () => {
  return {
    type: SHOW
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

export const updatePokemons = (nextURL) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
      payload: {
        isLoading: true,
        loadingError: null,
      }
    })
    let data = await fetch(nextURL).then(res => res.json());
    console.log(data.next);
    const pokemons = await Promise.all(
      data.results.map((result) => {
        return getOnePokemon(result.url);
      })
    )

    dispatch({
      type: UPDATE_POKEMONS,
      payload: {
        isLoading: false,
        loadingError: null,
        pokemons,
        nextURL: data.next
      }
    })
  } catch (error) {
    console.error('There was a problem in loading pokemons');
    console.error(error);

    dispatch({
      type: LOADING,
      payload: {
        isLoading: false,
        loadingError: error,
      }
    })
  }
}