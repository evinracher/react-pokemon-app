export const SHOW = 'SHOW';
export const STOP_SHOW = 'STOP_SHOW';

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

// export const searchPokemonByID = (id) => {}
