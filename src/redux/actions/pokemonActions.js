export const SEARCH = 'SEARCH';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';

const URL = "https://pokeapi.co/api/v2/pokemon/";
const DESC_URL = "https://pokeapi.co/api/v2/pokemon-species/";

export const searchByName = (name) => (dispatch) => {
  if (!name) {
    dispatch({
      type: SEARCH_ERROR,
      payload: {
        error: "Invalid pokemon name"
      }
    })
    return;
  }

  dispatch({ type: SEARCH })

  fetch(URL + name)
    .then(res => res.json())
    .then(pokemon => {
      fetch(DESC_URL + name)
        .then(res => res.json())
        .then(spicies => {
          let desc = spicies.flavor_text_entries.find((entry) => entry.language.name === 'en')
          console.log("description:");
          console.log(desc);
          if (desc) {
            pokemon.description = desc.flavor_text.replace(/(\r\n|\n|\r)/gm, " ");
          } else {
            pokemon.description = "No description provided";
          }
          dispatch({
            type: SEARCH_SUCCESS,
            payload: {
              pokemon
            }
          })
        })
    })
    .catch(error => {
      console.log("There was an error while searching: " + name);
      dispatch({
        type: SEARCH_ERROR,
        payload: {
          error: error.toString()
        }
      })
    })
}