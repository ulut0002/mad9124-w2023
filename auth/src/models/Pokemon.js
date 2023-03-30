"use strict";

const { Schema, model } = require("mongoose");

const pokemonSchema = new Schema({
  name: {
    type: String,
    required: [true, "Enter a valid pokemon name"],
  },
  type: {
    type: String,
    required: [true, "Enter a valid type"],
  },
  abilities: {
    type: [String],
    required: [true, "Abilities must be a string array"],
  },
});

module.exports = model("pokemon", pokemonSchema);
