const data = require("../models/trainer");
const { NotFoundError } = require("../utils/errors");

const getAllTrainers = () => {
  return data;
};

const getOneTrainer = (id) => {
  data.find();
};

const createTrainer = (id, res) => {};

module.exports = {
  getAllTrainers,
  createTrainer,
};
