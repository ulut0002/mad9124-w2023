/**
 *
 *  Router for the "Pokemon" object
 *
 */

const express = require("express");
const pokemonController = require("../controller/pokemon");
const {
  validatePokemonId,
  validateCreateData,
  validatePatchData,
  validateReplaceData,
} = require("../middleware/validatePokemon");

const router = express.Router();

router
  .route("/")
  .get(pokemonController.getAll)
  .post(validateCreateData, pokemonController.create);

router
  .route("/:id")
  .get(validatePokemonId, pokemonController.getOne)
  .put(validatePokemonId, validateReplaceData, pokemonController.replace)
  .patch(validatePokemonId, validatePatchData, pokemonController.update)
  .delete(validatePokemonId, pokemonController.deleteOne);

module.exports = router;
