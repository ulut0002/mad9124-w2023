const express = require("express");
const router = express.Router();
// const pokemonServices = require("../services/");

const getAll = (_, res) => {
  const data = pokemonServices.getAllPokemons();
  res.status(200).json({ data });
};

const getOne = (req, res) => {};

const create = (req, res) => {};

const replace = (req, res) => {};

const update = (req, res) => {};

const deleteOne = (req, res) => {};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
