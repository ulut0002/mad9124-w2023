const express = require("express");

express.Router();
const pokemonService = require("../services/pokemon");

const getAll = (_, res) => {
  const data = pokemonService.getAllPokemons();
  res.status(200).json({ data });
};

const getOne = (req, res) => {
  res.status(200).json({ data: req.body.pokemon });
};

const create = (req, res) => {
  const { name, type, abilities } = req.body;
  const newPokemon = pokemonService.createPokemon(name, type, abilities);
  res.status(200).json({ data: newPokemon });
};

const replace = (req, res) => {
  const { id, name, type, abilities } = req.body.pokemon;
  const pokemon = pokemonService.createReplacePokemon(
    id,
    name,
    type,
    abilities
  );
  res.status(200).json({ data: pokemon });
};

const update = (req, res) => {
  const { id, name, type, abilities } = req.body.pokemon;
  const pokemon = pokemonService.createReplacePokemon(
    id,
    name,
    type,
    abilities
  );
  res.status(200).json({ data: pokemon });
};

const deleteOne = (req, res) => {
  const { id } = req.body.pokemon;
  deletedObj = pokemonService.deleteOne(id);
  res.status(200).json({ data: deletedObj });
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
