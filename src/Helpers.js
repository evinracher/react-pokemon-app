export async function addPokemonDetails(pokemon) {
  const pokemonSpicies = await fetch(pokemon.species.url).then(res => res.json());
  const desc = pokemonSpicies.flavor_text_entries.find((entry) => entry.language.name === 'en')
  if (desc) {
    pokemon.description = desc.flavor_text.replace(/(\r\n|\n|\r)/gm, ' ');
  } else {
    pokemon.description = 'No description provided';
  }

  let gender = pokemonSpicies.gender_rate;

  if (gender > 4) {
    pokemon.gender = 'Female';
    if (pokemon.sprites.front_female) {
      pokemon.imageUrl = pokemon.sprites.front_female;
    }
  } else if (gender >= 0) {
    pokemon.gender = 'Male';
  } else {
    pokemon.gender = 'Genderless';
  }

  pokemon.stats_data = pokemon.stats.map(stat => stat.base_stat);
}

export async function fetchOnePokemon(url) {
  try {
    let rawPokemon = await fetch(url).then(res => res.json());
    if (rawPokemon.forms[0]) {
      const formRes = await fetch(rawPokemon.forms[0].url).then(res => res.json());
      if (formRes.sprites.front_default) {
        rawPokemon.imageUrl = formRes.sprites.front_default;
      } else {
        rawPokemon.imageUrl = require('./images/whos_that_pokemon.png');
      }
    } else {
      rawPokemon.imageUrl = require('./images/whos_that_pokemon.png');
    }
    return rawPokemon;
  } catch (error) {
    console.error('%cThere was an error fecthing one pokemon at: ' + url, 'color: orange;');
    console.error(error);
  }
}