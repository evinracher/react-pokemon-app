export const SEARCH = 'SEARCH';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';

const URL = 'https://pokeapi.co/api/v2/pokemon/';

export const searchByName = (name) => (dispatch) => {
  if (!name) {
    dispatch({
      type: SEARCH_ERROR,
      payload: {
        error: 'Invalid pokemon name'
      }
    })
    return;
  }

  dispatch({ type: SEARCH })

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