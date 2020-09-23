import { fetchOnePokemon, addPokemonDetails } from './Helpers';

export function getClassNames(styles, classList) {
  let res = '';
  classList.forEach(classname => {
    if (styles[classname]) {
      res += ' ' + styles[classname];
    }
  });
  return res;
}

export async function getPokemonImageUrl(url) {
  try {
    let imageUrl = require('./images/whos_that_pokemon.png');
    let pokemonForm = await fetch(url).then(res => res.json());
    if (pokemonForm) {
      if (pokemonForm.sprites.front_default) {
        imageUrl = pokemonForm.sprites.front_default;
      }
    }
    return imageUrl;
  } catch (error) {
    console.error('%cThere was an error fecthing one pokemon at: ' + url, 'color: orange;');
    console.error(error);
  }
}

export async function getOnePokemon(url) {
  let pokemon = await fetchOnePokemon(url);
  await addPokemonDetails(pokemon);
  return pokemon;
}
