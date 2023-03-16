/**
 *
 *
 *  Middleware functions for the Pokemon object
 *
 */

const { getOnePokemon } = require("../services/pokemon");
const { BadRequestError, NotFoundError } = require("../utils/errors");

// Used by controllers that require a pokemon object.
// Found pokemon object is stored in req.body.pokemon
const validatePokemonId = (req, res, next) => {
  const { id } = req.params;
  if (!id) throw new BadRequestError("Pokemon id is required");

  const pokemon = getOnePokemon(id);
  if (!pokemon) throw new NotFoundError(`Pokemon with id ${id} not found`);

  req.body.pokemon = pokemon;
  next();
};

// This middleware function is used by "createPokemon" function. The function:
// 1. Checks each parameter and their validity: throws an error if the validity check fails
// 2. Creates a brand new object that contains correct data. For example, text data in this object is always trimmed.
// 3. Assigns each given and corrected variable to req.body.name, req.body.type and req.body.abilities elements
const validateCreateData = (req, _, next) => {
  let { name, type, abilities } = req.body;
  const newPokemonData = { name, type, abilities };
  const goodPokemonData = checkPokemonData(newPokemonData);

  req.body.name = goodPokemonData.name;
  req.body.type = goodPokemonData.type;
  req.body.abilities = goodPokemonData.abilities;

  next();
};

// Used for the put() function
// creates an object (updatedObj) to represent the final version of the pokemon obj. Then, checks its values:  if all the parameters  are correct, req.body.pokemon is updated
const validateReplaceData = (req, _, next) => {
  const { name, type, abilities } = req.body;
  const updatedObj = { ...req.body.pokemon, name, type, abilities };
  const goodPokemonData = checkPokemonData(updatedObj);
  req.body.pokemon = { ...req.body.pokemon, ...goodPokemonData };
  next();
};

// Used for patch() function
// create an object (updatedObj) to represent the final version of the object. And check its values
// if all the parameters  are correct, req.body.pokemon is updated
const validatePatchData = (req, _, next) => {
  const { name, type, abilities } = req.body;
  const updatedObj = { ...req.body.pokemon };

  if (name) updatedObj.name = name;
  if (type) updatedObj.type = type;
  if (abilities) updatedObj.abilities = abilities;

  const goodPokemonData = checkPokemonData(updatedObj);
  req.body.pokemon = { ...req.body.pokemon, ...goodPokemonData };
  next();
};

// This function checks name type abilities of a pokemon object
// In case of any serious problems, it throws an Error
const checkPokemonData = (pokemonData) => {
  let name = pokemonData?.name;
  let type = pokemonData?.type;
  let abilities = pokemonData?.abilities;

  if (name) name = name.trim(); //" abc " => "abc"
  if (type) type = type.trim();

  // if "abilities" is not an array, but a string, convert it into an array
  if (abilities && !Array.isArray(abilities)) {
    abilities = [abilities];
  }

  // check mandatory values
  if (!name || !type || !abilities) {
    throw new BadRequestError(
      `Name, type, and a list of abilities are required`
    );
  }

  if (abilities.length === 0) {
    throw new BadRequestError(`Provide a list of abilities`);
  }

  // Abilities array must contain "string" type only.
  // Each ability must be a non-blank string
  abilities.forEach((ability, index) => {
    if (typeof ability !== "string") {
      throw new BadRequestError(`Each ability must be a valid string.`);
    }
    ability = ability.trim();
    if (!ability) {
      throw new BadRequestError(`Each ability must be a valid string.`);
    }
    abilities[index] = ability;
  });

  // return an object that contains the well-formatted elements
  return {
    name,
    type,
    abilities,
  };
};

module.exports = {
  validatePokemonId,
  validateCreateData,
  validatePatchData,
  validateReplaceData,
};
