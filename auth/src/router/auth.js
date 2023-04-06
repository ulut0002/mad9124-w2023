"use strict";

const { Router } = require("express");
const passport = require("passport");
require("../utils/passport");

const authRouter = Router();

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/private");
  }
);

authRouter.get("/logout", (req, res) => {
  req.logout({}, () => {
    res.redirect("/");
  });
});

module.exports = authRouter;
