/**
 *  Entry point of the app: index.js
 */

"use strict";

require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const pokemonRouter = require("./router/pokemon");
const authRouter = require("./router/auth");
const isAuthenticated = require("./middleware/isAuthenticated");
const { errorHandler } = require("./utils/errors");
require("./utils/db");

const app = express();
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.status(200).json({ data: "Server is running" });
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/pokemon", pokemonRouter);
app.use("/auth", authRouter);
app.get("/public", (req, res) => {
  res.send("Anyone can see this");
});
app.get("/private", isAuthenticated, (req, res) => {
  res.send("If you can see this, you are logged in");
});

app.use(errorHandler);

const PORT = process.env.PORT | 3030;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
