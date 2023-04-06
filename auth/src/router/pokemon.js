/**
 *
 *  Router for the "Pokemon" object
 *
 */

const express = require("express");
const pokemonController = require("../controller/pokemon");
const isAuthenticated = require("../middleware/isAuthenticated");

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
  .post(isAuthenticated, validateCreateData, pokemonController.create);

router
  .route("/:id")
  .get(validatePokemonId, pokemonController.getOne)
  .put(
    isAuthenticated,
    validatePokemonId,
    validateReplaceData,
    pokemonController.replace
  )
  .patch(
    isAuthenticated,
    validatePokemonId,
    validatePatchData,
    pokemonController.update
  )
  .delete(isAuthenticated, validatePokemonId, pokemonController.deleteOne);

module.exports = router;
