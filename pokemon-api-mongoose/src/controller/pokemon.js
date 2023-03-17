const pokemonService = require("../services/pokemon");

// Return all existing pokemons
const getAll = async (_, res) => {
  const data = await pokemonService.getAllPokemons();
  res.status(200).json({ data: data });
};

// Return one pokemon entry only.
// Note that the pokemon entry is found within the middleware.
// This function is still called (via next()) in order to all extra operations, such as keeping track of statistics.
const getOne = async (req, res) => {
  const pokemon = await pokemonService.getOnePokemon(req.params.id);
  res.status(200).json({ pokemon });
};

// Creates a new pokemon entry
// Returns the created object
const create = async (req, res, next) => {
  const { name, type, abilities } = req.body;
  try {
    const newPokemon = await pokemonService.createPokemon(
      name,
      type,
      abilities
    );
    res.status(201).json({ data: newPokemon });
  } catch (error) {
    next(error);
  }
};

// put() function: Replaces an entire pokemon object
const replace = async (req, res, next) => {
  const { id, name, type, abilities } = req.body.pokemon;

  try {
    const pokemon = await pokemonService.createReplacePokemon(
      id,
      name,
      type,
      abilities
    );
    res.status(200).json({ data: pokemon });
  } catch (error) {
    next(error);
  }
};

// patch() function. This function is exactly same as the replace() function above.
// This is because both functions accepts the desired versions of the Pokemon object. So in a sense, both functions call the "replace" function
const update = async (req, res, next) => {
  const { id, name, type, abilities } = req.body.pokemon;
  console.log("pokemon", req.body.pokemon);
  try {
    const pokemon = await pokemonService.createReplacePokemon(
      id,
      name,
      type,
      abilities
    );
    res.status(200).json({ data: pokemon });
  } catch (error) {
    next(error);
  }
};

// deletes a Pokemon object from the array and returns the deleted object
const deleteOne = async (req, res, next) => {
  const id = req.body.id;
  try {
    deletedObj = await pokemonService.deleteOne(id);
    res.status(200).json({ data: deletedObj });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
