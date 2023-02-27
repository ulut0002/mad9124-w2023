"use strict";

const express = require("express");
const pokemonRouter = require("./router/pokemon");
const { errorHandler, NotFoundError } = require("./utils/errors");

const app = express();

require("dotenv").config();

app.use(express.json());

// app.use(morgan("tiny"));

app.get("/", (req, res) => {
  // throw new NotFoundError("uh oh");
  console.log("Server is running");
});

app.use("/api/pokemon", pokemonRouter);
// app.use("/api/trainer");

app.use(errorHandler);

const PORT = process.env.PORT | 3030;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
