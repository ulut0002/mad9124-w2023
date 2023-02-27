/**
 *
 * Service functions manipulates "trainers" data object.
 * These functions are called by the "trainer controller"
 * Data is stored in "trainers" array object, which is sourced from the /models/trainer.js file
 *
 */

const data = require("../models/trainer");
const trainers = data?.trainers;

// init trainer array if necessary
if (!trainers || !Array.isArray(trainers)) trainers = [];

// Returns the entire data array.
const getAllTrainers = () => {
  return trainers;
};

// Finds a trainer object by id.
// "strict equality" is not used on purpose because I wanted "1" equal to integer 1
const getOneTrainer = (id) => {
  const trainer = trainers.find((trainer) => trainer.id == id);
  return trainer;
};

// Creates a brand new Trainer object and adds to the array
// for "id", id of last object is found and increased by one
const createTrainer = (firstName, lastName, role, badges) => {
  let id = (trainers.at(-1).id || 0) + 1;
  const newTrainer = { id, firstName, lastName, role, badges };
  trainers.push(newTrainer);
  return newTrainer;
};

// put() and patch() functions call this function to replace the object.
// this function accepts an existing trainer, find the object in the array and replaces it with the new version
const createReplaceTrainer = (id, firstName, lastName, role, badges) => {
  const trainer = { id, firstName, lastName, role, badges };

  const idx = findTrainerIndex(trainer.id);
  // Additional check is beneficial for race-conditions. Another process might have deleted the object already
  if (idx === -1) {
    throw new NotFoundError(`Trainer with id ${id} not found`);
  }

  trainers[idx] = trainer;
  return trainer;
};

const deleteOne = (id) => {
  const idx = findTrainerIndex(id);
  // Additional check is beneficial for race-conditions. Another process might have deleted the object already

  if (idx === -1) throw new NotFoundError(`Trainer with id ${id} not found`);
  const objToDelete = { ...trainers[idx] };
  trainers.splice(idx, 1);
  return objToDelete;
};

const findTrainerIndex = (id) => {
  // == is used instead of === because I want text "1" being equal to integer 1
  return trainers.findIndex((item) => item.id == id);
};

module.exports = {
  getAllTrainers,
  createTrainer,
  getOneTrainer,
  createReplaceTrainer,
  deleteOne,
};
