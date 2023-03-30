"use strict";

/**
 *
 * Service functions manipulates "pokemons" data object.
 * These functions are called by the "pokemon controller"
 * It connects to Atlas Mongo db..
 *
 */

const Pokemon = require("../models/Pokemon");
const { NotFoundError } = require("../utils/errors");

// list of fields to return back with response
const selectFields = "_id name type abilities";

const getAllPokemons = async () => {
  const pokemons = await Pokemon.find({}).select(selectFields);
  return pokemons;
};

// Finds a pokemon object by id.
const getOnePokemon = async (id) => {
  const pokemon = await Pokemon.findById(id).select(selectFields);
  return pokemon;
};

// Creates a brand new Pokemon object
const createPokemon = async (name, type, abilities) => {
  const newPokemon = new Pokemon({
    name,
    type,
    abilities,
  });
  const savedPokemon = await newPokemon.save();
  return await getOnePokemon(savedPokemon._id);
};

// put() and patch() functions call this function to replace the object.
// this function accepts an existing pokemon, find the object in the array and replaces it with the new version
const createReplacePokemon = async (id, name, type, abilities) => {
  const params = {};
  if (name) params.name = name;
  if (type) params.type = type;
  if (abilities) params.abilities = abilities;

  const pokemonEntry = await Pokemon.findById(id);
  if (!pokemonEntry) {
    throw new NotFoundError(`Pokemon with id ${id} not found`);
  }

  const updatedEntry = { ...params };

  return await Pokemon.findByIdAndUpdate(id, updatedEntry, {
    returnOriginal: false,
  }).select(selectFields);
};

//delete a pokemon entry by id.
const deleteOne = async (id) => {
  const deletedPokemon = await Pokemon.findByIdAndDelete(id, {
    returnOriginal: true,
  });

  if (!deletedPokemon)
    throw new NotFoundError(`Pokemon with id ${id} not found`);
  return deletedPokemon;
};

module.exports = {
  getAllPokemons,
  createPokemon,
  getOnePokemon,
  createReplacePokemon,
  deleteOne,
};
