import { getOnePokemon } from '../../Utils';
export const SHOW = 'SHOW';
export const STOP_SHOW = 'STOP_SHOW';
export const COMPARE = 'COMPARE';
export const STOP_COMPARE = 'STOP_COMPARE';
export const UPDATE_POKEMONS = 'UPDATE_POKEMONS';

const imageURL = 'https://pokeapi.co/api/v2/pokemon-form/';

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
    let data = await fetch(nextURL).then(res => res.json());
    console.log(data.next);
    const pokemons = await Promise.all(
      data.results.map((result) => {
        return getOnePokemon(result.url);
      })
    )

    dispatch(
      {
        type: UPDATE_POKEMONS,
        payload: {
          pokemons,
          nextURL: data.next
        }
      }
    )
  } catch (error) {
    console.error('There was a problem in loading pokemons');
    console.error(error);
  }
}

// export const updatePokemons = (nextURL) => async (dispatch) => {
//   let addPokemons = [];
//   let results =  await fetch(nextURL).then(res => res.json());
//     .then((data) => {
//       console.log(data.results);
//       const pokemonPromises = Promise.all(
//         data.results.map( async (result) => {
//           return await fetch(result.url)
//           .then(res => res.json())
//         })
//       )
//       console.log(pokemonPromises)
//       pokemonPromises.then((data) => {
//         console.log(data)
//       })
//     })
// }


export const updatePokemonsOld2 = (nextURL) => async (dispatch) => {
  let addPokemons = [];
  try {
    const response = await fetch(nextURL);
    const data = await response.json();
    console.log(data);
    addPokemons = data.results.map(async (res) => {
      try {
        const imageResponse = await fetch(imageURL + res.name);
        const imageData = await imageResponse.json();
        console.log(imageData.sprites.front_default);
        return {
          name: res.name,
          image: imageData.sprites.front_default
        }
      } catch (error) {
        console.log('Error while searching image: ' + error);
      }
    })
  } catch (error) {
    console.log('Error while searching for pokemons: ' + error);
  } finally {
    console.log('Pokemons: ');
    console.log(addPokemons);
  }
}

export const updatePokemonsOld = (nextURL) => (dispatch) => {
  console.log("Updating pokemon list...");
  const addPokemons = [];
  fetch(nextURL)
    .then(res => res.json())
    .then(data => {
      console.log(data.next);
      data.results.forEach(async (res) => {
        await fetch(imageURL + res.name)
          .then(res => res.json())
          .then(data => {
            addPokemons.push({
              name: res.name,
              imageUrl: data.sprites.front_default
            })
          })
          .catch(error => {
            console.log('Error while searching image');
          })
      })
      // Toca que cada card haga su render...
      console.log(addPokemons);
      addPokemons.forEach((item) => {
        console.log(item);
      })
      dispatch({
        type: UPDATE_POKEMONS,
        payload: {
          pokemons: addPokemons,
          nextURL: data.next
        }
      })
    })
    .catch(error => {
      console.log("There was an error loading the pokemons");
      console.log(error);
    })
}