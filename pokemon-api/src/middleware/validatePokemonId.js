const { update } = require("../controller/pokemon");
const { getOnePokemon } = require("../services/pokemon");
const { BadRequestError, NotFoundError } = require("../utils/errors");

// this middleware function:
// - Validate the parameter exists
// - Find the given pokemon by id. Comparison is done with == operator
// - Updates req.pokemon object with the found pokemon entry
const validatePokemonId = (req, res, next) => {
  const { id } = req.params;
  if (!id) throw new BadRequestError("Pokemon id is required");

  const pokemon = getOnePokemon(id);
  if (!pokemon) throw new NotFoundError(`Pokemon with id ${id} not found`);

  req.body.pokemon = pokemon;
  next();
};

// This is used in "create" and "put" functions
const validateCreateData = (req, _, next) => {
  let { name, type, abilities } = req.body;
  const newPokemonData = { name, type, abilities };
  const goodPokemonData = checkPokemonData(newPokemonData);

  req.body.name = goodPokemonData.name;
  req.body.type = goodPokemonData.type;
  req.body.abilities = goodPokemonData.abilities;

  next();
};

const validatePatchData = (req, _, next) => {
  // we know that patch function validates the "id" first. so we have req.body.pokemon

  //req.body.pokemon = is the found pokemon object
  console.clear();
  const { name, type, abilities } = req.body;
  const updatedObj = { ...req.body.pokemon, name, type, abilities };
  const goodPokemonData = checkPokemonData(updatedObj);

  req.body.pokemon = { ...req.body.pokemon, ...goodPokemonData };
  // console.log("bb", req.body.pokemon);
  next();
};

// This function checks .name .type .abilities objects
const checkPokemonData = (pokemonData) => {
  let name = pokemonData?.name;
  let type = pokemonData?.type;
  let abilities = pokemonData?.abilities;

  if (name) name = name.trim();
  if (type) type = type.trim();

  // if the request has one text only, turn this into an array
  if (abilities && !Array.isArray(abilities)) {
    abilities = [abilities];
  }

  if (!name || !type || !abilities) {
    throw new BadRequestError(
      `Provide a valid name, type and a list of abilities`
    );
  }

  if (abilities.length === 0) {
    throw new BadRequestError(`Provide a list of abilities`);
  }

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
};
