const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      error: "You must be signed in to see this",
    });
    return;
  }
  next();
};

module.exports = isAuthenticated;
