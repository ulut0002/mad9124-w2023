const express = require("express");
const pokemonController = require("../controller/pokemon");
const {
  validatePokemonId,
  validateCreateData,
  validatePatchData,
} = require("../middleware/validatePokemonId");

const router = express.Router();

router.get("/", pokemonController.getAll);
router.get("/:id", validatePokemonId, pokemonController.getOne);
router.post("/", validateCreateData, pokemonController.create);
router.put(
  "/:id",
  validatePokemonId,
  validatePatchData,
  pokemonController.replace
);
router.patch(
  "/:id",
  validatePokemonId,
  validatePatchData,
  pokemonController.update
);
router.delete("/:id", validatePokemonId, pokemonController.deleteOne);

module.exports = router;
