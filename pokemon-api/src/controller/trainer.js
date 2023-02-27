const trainerService = require("../services/trainer");

// Return all existing trainer
const getAll = (_, res) => {
  const data = trainerService.getAllTrainers();
  res.status(200).json({ data: data });
};

// Return one trainer entry only.
// Note that the trainer entry is found within the middleware.
// This function is still called (via next()) in order to all extra operations, such as keeping track of statistics.
const getOne = (req, res) => {
  res.status(200).json({ data: req.body.trainer });
};

// Creates a new trainer entry
// Returns the created object
const create = (req, res) => {
  const { firstName, lastName, role, badges } = req.body;
  const newTrainer = trainerService.createTrainer(
    firstName,
    lastName,
    role,
    badges
  );
  res.status(201).json({ data: newTrainer });
};

// put() function: Replaces an entire trainer object
const replace = (req, res) => {
  const { id, firstName, lastName, role, badges } = req.body.trainer;
  const trainer = trainerService.createReplaceTrainer(
    id,
    firstName,
    lastName,
    role,
    badges
  );
  res.status(200).json({ data: trainer });
};

// patch() function. This function is exactly same as the replace() function above.
// This is because both functions accepts the desired versions of the Trainer object. So in a sense, both functions call the "replace" function
const update = (req, res) => {
  const { id, firstName, lastName, role, badges } = req.body.trainer;
  const trainer = trainerService.createReplaceTrainer(
    id,
    firstName,
    lastName,
    role,
    badges
  );
  res.status(200).json({ data: trainer });
};

// deletes a Trainer object from the array and returns the deleted object

const deleteOne = (req, res) => {
  const { id } = req.body.trainer;
  deletedObj = trainerService.deleteOne(id);
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
