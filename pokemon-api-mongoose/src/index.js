/**
 *
 *  Entry point of the app: index.js
 *
 */

"use strict";

require("dotenv").config();

const express = require("express");
const pokemonRouter = require("./router/pokemon");
const { errorHandler } = require("./utils/errors");
const morgan = require("morgan");
const app = express();
require("./utils/db");

app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.status(200).json({ data: "Server is running" });
});

app.use("/api/pokemon", pokemonRouter);
app.use(errorHandler);

const PORT = process.env.PORT | 3030;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
