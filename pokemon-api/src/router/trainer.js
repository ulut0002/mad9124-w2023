/**
 *
 *  Router for the "Trainer" object
 *
 */

const express = require("express");
const trainerController = require("../controller/trainer");
const {
  validateTrainerId,
  validateCreateData,
  validatePatchData,
  validateReplaceData,
} = require("../middleware/validateTrainer");

const router = express.Router();
router
  .route("/")
  .get(trainerController.getAll)
  .post(validateCreateData, trainerController.create);

router
  .route("/:id")
  .get(validateTrainerId, trainerController.getOne)
  .put(validateTrainerId, validateReplaceData, trainerController.replace)
  .patch(validateTrainerId, validatePatchData, trainerController.update)
  .delete(validateTrainerId, trainerController.deleteOne);

module.exports = router;
