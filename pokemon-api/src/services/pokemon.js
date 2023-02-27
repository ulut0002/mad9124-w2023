const data = require("../models/pokemon");
const pokemons = data?.pokemons;
if (!data.pokemons) data.pokemons = [];

const getAllPokemons = () => {
  return data;
};

const getOnePokemon = (id) => {
  if (!pokemons || !Array.isArray(pokemons)) return;

  const pokemon = pokemons.find((pokemon) => pokemon.id == id);
  return pokemon;
};

const createPokemon = (name, type, abilities) => {
  let id = 0;
  if (data.pokemons.length > 0) {
    id = data.pokemons.at(-1).id;
  }
  id++;
  const newPokemon = { id, name, type, abilities };
  data.pokemons.push(newPokemon);
  return newPokemon;
};

const createReplacePokemon = (id, name, type, abilities) => {
  const pokemon = { id, name, type, abilities };

  const idx = findPokemonIndex(pokemon.id);
  // Maybe a race-condition
  if (idx === -1) throw new NotFoundError(`Pokemon with id ${id} not found`);

  data.pokemons[idx] = pokemon;
  return pokemon;
};

const deleteOne = (id) => {
  const idx = findPokemonIndex(id);
  // Maybe a race-condition
  if (idx === -1) throw new NotFoundError(`Pokemon with id ${id} not found`);
  const objToDelete = { ...data.pokemons[idx] };
  data.pokemons.splice(idx, 1);
  return objToDelete;
};

const findPokemonIndex = (id) => {
  // == is used instead of === because I want text "1" being equal to integer 1
  return data.pokemons.findIndex((item) => item.id == id);
};

module.exports = {
  getAllPokemons,
  createPokemon,
  getOnePokemon,
  createReplacePokemon,
  deleteOne,
};
