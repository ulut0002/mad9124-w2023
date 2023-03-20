/**
 *
 *  Middleware functions for the Pokemon object
 *
 */

const { default: mongoose } = require("mongoose");
const { BadRequestError } = require("../utils/errors");

// Just a simple check for incoming id
const validatePokemonId = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("Pokemon id is required");
  }

  // Source: ChatGPT
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError(`Enter a valid id`);
  }
  next();
};

// This middleware function is used by "createPokemon" function. The function:
// 1. Checks each parameter and their validity: throws an error if the validity check fails
// 2. Creates a brand new object that contains correct data. For example, 'text' data in this object is always trimmed.
// 3. Assigns each given and corrected variable to req.body.name, req.body.type and req.body.abilities elements
const validateCreateData = (req, _, next) => {
  let { name, type, abilities } = req.body;
  const goodPokemonData = validatePokemonData({ name, type, abilities });

  req.body.name = goodPokemonData.name;
  req.body.type = goodPokemonData.type;
  req.body.abilities = goodPokemonData.abilities;
  next();
};

// Used for the put() function
// creates an object (updatedObj) to represent the final version of the pokemon obj.
// Then, checks its values:  if all the parameters  are correct, req.body.pokemon is updated
const validateReplaceData = (req, _, next) => {
  const { name, type, abilities } = req.body;

  const updatedObj = { name, type, abilities };
  const goodPokemonData = validatePokemonData(updatedObj);
  goodPokemonData.id = req.params.id;
  req.body.pokemon = goodPokemonData;
  next();
};

// Used for patch() function
// System only checks existing data
// if all the parameters  are correct, req.body.pokemon is updated
const validatePatchData = (req, _, next) => {
  const { name, type, abilities } = req.body;
  const updatedObj = { name, type, abilities };

  const goodPokemonData = fixIncomingData(updatedObj);
  goodPokemonData.id = req.params.id;
  req.body.pokemon = goodPokemonData;
  next();
};

// checks and fixes available data only if it exists in the incoming request
const fixIncomingData = (pokemonData) => {
  let name = pokemonData?.name;
  let type = pokemonData?.type;
  let abilities = pokemonData?.abilities;

  if (name) name = name.trim(); //" abc " => "abc"
  if (type) type = type.trim();

  // if "abilities" is not an array, but a string, convert it into an array
  if (abilities && !Array.isArray(abilities)) {
    abilities = [abilities];
  }
  if (abilities) {
    validateAbilitiesArray(abilities);
  }

  const returnObj = {};
  if (name) returnObj.name = name;
  if (type) returnObj.type = type;
  if (abilities) returnObj.abilities = abilities;
  return returnObj;
};

// This function is used by PUT router. Name, Type and Abilities are all mandatory fields.
const validatePokemonData = (pokemonData) => {
  const fixedData = fixIncomingData(pokemonData);

  let name = fixedData?.name;
  let type = fixedData?.type;
  let abilities = fixedData?.abilities;

  // check mandatory values
  if (!name || !type || !abilities) {
    throw new BadRequestError(
      `Name, type, and a list of abilities are required`
    );
  }

  // Abilities array must contain "string" type only.
  // Each ability must be a non-blank string
  validateAbilitiesArray(abilities);

  // return an object that contains the well-formatted elements
  return {
    name,
    type,
    abilities,
  };
};

// validates the array only if it is given
const validateAbilitiesArray = (abilities) => {
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
};

module.exports = {
  validatePokemonId,
  validateCreateData,
  validatePatchData,
  validateReplaceData,
};
