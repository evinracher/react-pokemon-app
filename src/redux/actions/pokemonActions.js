export const INIT = 'INIT';
export const SEARCH = 'SEARCH';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const CHANGE_NAME = 'CHANGE_NAME';
export const COMPARE = 'COMPARE';
export const STOP_COMPARE = 'STOP_COMPARE';

const URL = 'https://pokeapi.co/api/v2/pokemon/';

export const initPokemon = () => {
  return {
    type: INIT
  }
}


export const searchByName = (param) => (dispatch) => {
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

  console.log("Searching for: " + name);

  dispatch({
    type: SEARCH
  })

  fetch(URL + name)
    .then(res => res.json())
    .then(pokemon => {
      addPokemonDetails(pokemon, dispatch);
    })
    .catch(error => {
      console.log('%cThere was an error while searching: ' + name, "color: orange;");
      console.log('%c' + error, "color: orange;");
      dispatch({
        type: SEARCH_ERROR,
        payload: {
          error: error.toString()
        }
      })
    })
}

export const changeName = (name) => {
  return {
    type: CHANGE_NAME,
    payload: {
      name
    }
  }
}

export const compare = (name) => (dispatch) => {
  console.log("Searching to compare: " + name);
  searchByName(name)(dispatch);
  dispatch({
    type: COMPARE
  })
}

export const stopCompare = () => {
  return {
    type: STOP_COMPARE
  }
}

// helper functions
function addPokemonDetails(pokemon, dispatch) {
  fetch(pokemon.species.url)
    .then(res => res.json())
    .then(spicies => {
      let desc = spicies.flavor_text_entries.find((entry) => entry.language.name === 'en')
      let gender = spicies.gender_rate;
      if (desc) {
        pokemon.description = desc.flavor_text.replace(/(\r\n|\n|\r)/gm, ' ');
      } else {
        pokemon.description = 'No description provided';
      }

      pokemon.imageUrl = pokemon.sprites.front_default;
      if (gender >= 0) {
        if (gender > 4) {
          pokemon.gender = 'Female';
          if (pokemon.sprites.front_female) {
            pokemon.imageUrl = pokemon.sprites.front_female;
          }
        } else {
          pokemon.gender = 'Male';
        }
      } else {
        pokemon.gender = 'Genderless';
      }
      dispatch({
        type: SEARCH_SUCCESS,
        payload: {
          pokemon
        }
      })
    })
    .catch(error => {
      console.log('%cThere was an error while searching details for: ' + pokemon.name, "color: orangered;");
      console.log(pokemon.species.url);
      console.log(pokemon);
      dispatch({
        type: SEARCH_ERROR,
        payload: {
          error: error.toString()
        }
      })
    })
}