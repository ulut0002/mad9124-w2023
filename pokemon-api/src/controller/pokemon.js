const pokemonService = require("../services/pokemon");

// Return all existing pokemons
const getAll = (_, res) => {
  const data = pokemonService.getAllPokemons();
  res.status(200).json({ data: data });
};

// Return one pokemon entry only.
// Note that the pokemon entry is found within the middleware.
// This function is still called (via next()) in order to all extra operations, such as keeping track of statistics.
const getOne = (req, res) => {
  res.status(200).json({ data: req.body.pokemon });
};

// Creates a new pokemon entry
// Returns the created object
const create = (req, res) => {
  const { name, type, abilities } = req.body;
  const newPokemon = pokemonService.createPokemon(name, type, abilities);
  res.status(201).json({ data: newPokemon });
};

// put() function: Replaces an entire pokemon object
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

// patch() function. This function is exactly same as the replace() function above.
// This is because both functions accepts the desired versions of the Pokemon object. So in a sense, both functions call the "replace" function
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

// deletes a Pokemon object from the array and returns the deleted object
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
