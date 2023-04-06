"use strict";

const { Schema, model } = require("mongoose");

const userModel = new Schema(
  {
    name: { type: String, required: true },
    googleId: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("user", userModel);
