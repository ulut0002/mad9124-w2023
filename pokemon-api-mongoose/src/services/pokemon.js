/**
 *
 * Service functions manipulates "pokemons" data object.
 * These functions are called by the "pokemon controller"
 * Data is stored in "pokemons" array object, which is sourced from the /models/pokemon.js file
 *
 */

const data = require("../models/pokemon");
const pokemons = data?.pokemons;

// init pokemon  array if necessary
if (!pokemons || !Array.isArray(pokemons)) pokemons = [];

const getAllPokemons = () => {
  return pokemons;
};

// Finds a pokemon object by id.
// "strict equality" is not used on purpose because I wanted "1" equal to integer 1
const getOnePokemon = (id) => {
  const pokemon = pokemons.find((pokemon) => pokemon.id == id);
  return pokemon;
};

// Creates a brand new Pokemon object and adds to the array
// for "id", id of last object is found and increased by one
const createPokemon = (name, type, abilities) => {
  let id = (pokemons.at(-1).id || 0) + 1;
  const newPokemon = { id, name, type, abilities };
  data.pokemons.push(newPokemon);
  return newPokemon;
};

// put() and patch() functions call this function to replace the object.
// this function accepts an existing pokemon, find the object in the array and replaces it with the new version
const createReplacePokemon = (id, name, type, abilities) => {
  const pokemon = { id, name, type, abilities };

  const idx = findPokemonIndex(pokemon.id);
  // Additional check is beneficial for race-conditions. Another process might have deleted the object already
  if (idx === -1) {
    throw new NotFoundError(`Pokemon with id ${id} not found`);
  }

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
