export const INIT = 'INIT';
export const SEARCH = 'SEARCH';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const CHANGE_NAME_TO_SEARCH = 'CHANGE_NAME_TO_SEARCH';
export const CHANGE_NAME_TO_COMPARE = 'CHANGE_NAME_TO_COMPARE';
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

export const changeNameToSearch = (name) => {
  return {
    type: CHANGE_NAME_TO_SEARCH,
    payload: {
      name
    }
  }
}

export const changeNameToCompare = (name) => {
  return {
    type: CHANGE_NAME_TO_COMPARE,
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

      let result = {};
      let desc = spicies.flavor_text_entries.find((entry) => entry.language.name === 'en')
      let gender = spicies.gender_rate;
      if (desc) {
        result.description = desc.flavor_text.replace(/(\r\n|\n|\r)/gm, ' ');
      } else {
        result.description = 'No description provided';
      }

      result.imageUrl = pokemon.sprites.front_default;
      if (gender >= 0) {
        if (gender > 4) {
          result.gender = 'Female';
          if (pokemon.sprites.front_female) {
            result.imageUrl = pokemon.sprites.front_female;
          }
        } else {
          result.gender = 'Male';
        }
      } else {
        result.gender = 'Genderless';
      }

      result.stats_data = pokemon.stats.map(stat => stat.base_stat);
      result.name = pokemon.name;
      result.height = pokemon.height;
      result.weight = pokemon.weight;
      result.abilities = pokemon.abilities;
      result.types = pokemon.types;
      dispatch({
        type: SEARCH_SUCCESS,
        payload: {
          pokemon: result
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