export function getClassNames(styles, classList) {
  let res = "";
  classList.forEach(classname => {
    if (styles[classname]) {
      res += " " + styles[classname];
    }
  });
  return res;
}

// This function returns a full pokemon with all the needed details for display it into the app
export async function getOnePokemon(name) {
  let pokemon = await fetchOnePokemon(name);
  await addPokemonDetails(pokemon);
  return pokemon;
}

// Helper functions:

// This function add the required details to a pokemon
async function addPokemonDetails(pokemon) {
  const pokemonSpicies = await fetch(pokemon.species.url).then(res => res.json());
  const desc = pokemonSpicies.flavor_text_entries.find((entry) => entry.language.name === 'en')
  if (desc) {
    pokemon.description = desc.flavor_text.replace(/(\r\n|\n|\r)/gm, ' ');
  } else {
    pokemon.description = 'No description provided';
  }

  let gender = pokemonSpicies.gender_rate;
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

  pokemon.stats_data = pokemon.stats.map(stat => stat.base_stat);
}


// This function fetch a single pokemon, with the raw content plus imageUrl
async function fetchOnePokemon(url) {
  let rawPokemon = await fetch(url).then(res => res.json());
  const formRes = await fetch(rawPokemon.forms[0].url).then(res => res.json());
  rawPokemon.imageUrl = formRes.sprites.front_default;
  return rawPokemon;
}