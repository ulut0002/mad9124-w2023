/**
 *
 *
 *  Entry point of the app: index.js
 *
 */

"use strict";

const express = require("express");
const pokemonRouter = require("./router/pokemon");
const trainerRouter = require("./router/trainer");
const { errorHandler, NotFoundError } = require("./utils/errors");
const morgan = require("morgan");
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.status(200).json({ data: "Server is running" });
});

app.use("/api/pokemon", pokemonRouter);
app.use("/api/trainer", trainerRouter);
app.use(errorHandler);

const PORT = process.env.PORT | 3030;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
