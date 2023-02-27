/**
 *
 *
 *  Middleware functions for the Pokemon object
 *
 */

const { getOneTrainer } = require("../services/trainer");
const { BadRequestError, NotFoundError } = require("../utils/errors");

// Used by controllers that require a pokemon object.
// Found pokemon object is stored in req.body.pokemon
const validateTrainerId = (req, res, next) => {
  const { id } = req.params;
  if (!id) throw new BadRequestError("Trainer id is required");

  const trainer = getOneTrainer(id);
  if (!trainer) throw new NotFoundError(`Trainer with id ${id} not found`);

  req.body.trainer = trainer;
  next();
};

// Used for patch() function
const validateCreateData = (req, _, next) => {
  let { firstName, lastName, role, badges } = req.body;
  const newTrainerData = { firstName, lastName, role, badges };
  const goodTrainerData = checkTrainerData(newTrainerData);

  req.body.firstName = goodTrainerData.firstName;
  req.body.lastName = goodTrainerData.lastName;
  req.body.role = goodTrainerData.role;
  req.body.badges = goodTrainerData.badges;

  next();
};

// Used for the put() function
// creates an object (updatedObj) to represent the final version of the trainer obj. Then, checks its values:  if all the parameters  are correct, req.body.trainer is updated
const validateReplaceData = (req, _, next) => {
  let { firstName, lastName, role, badges } = req.body;
  const updatedObj = { ...req.body.trainer, firstName, lastName, role, badges };
  const goodTrainerData = checkTrainerData(updatedObj);
  req.body.trainer = { ...req.body.trainer, ...goodTrainerData };
  next();
};

// Used for patch() function
// create an object (updatedObj) to represent the final version of the object. And check its values
// if all the parameters  are correct, req.body.pokemon is updated
const validatePatchData = (req, _, next) => {
  let { firstName, lastName, role, badges } = req.body;
  const updatedObj = { ...req.body.trainer };

  if (firstName) updatedObj.firstName = firstName;
  if (lastName) updatedObj.lastName = lastName;
  if (role) updatedObj.role = role;
  if (badges) updatedObj.badges = badges;

  const goodTrainerData = checkTrainerData(updatedObj);
  req.body.trainer = { ...req.body.trainer, ...goodTrainerData };
  next();
};

// This function checks firstName, lastName, role and badges values
// In case of any serious problems, it throws an Error
const checkTrainerData = (trainerData) => {
  let firstName = trainerData?.firstName;
  let lastName = trainerData?.lastName;
  let role = trainerData?.role;
  let badges = trainerData?.badges;

  if (firstName) firstName = firstName.trim();
  if (lastName) lastName = lastName.trim();
  if (role) role = role.trim();

  // if "badges" is not an array, but a string, convert it into an array
  if (badges && !Array.isArray(badges)) {
    badges = [badges];
  }

  // check mandatory values
  if (!firstName || !lastName || !role || !badges) {
    throw new BadRequestError(
      `First name, last name, role and a list of badges are required`
    );
  }

  if (badges.length === 0) {
    throw new BadRequestError(`Provide a list of badges`);
  }

  // Badges array must contain "string" type only.
  // Each budge must be a non-blank string
  badges.forEach((badge, index) => {
    if (typeof badge !== "string") {
      throw new BadRequestError(`Each badge must be a valid string.`);
    }
    badge = badge.trim();
    if (!badge) {
      throw new BadRequestError(`Each badge must be a valid string.`);
    }
    badges[index] = badge;
  });

  // return an object that contains the well-formatted elements

  return {
    firstName,
    lastName,
    role,
    badges,
  };
};

module.exports = {
  validateTrainerId,
  validateCreateData,
  validatePatchData,
  validateReplaceData,
};
