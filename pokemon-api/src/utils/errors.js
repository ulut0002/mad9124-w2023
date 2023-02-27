"use strict";
const createDebug = require("debug");

const debug = createDebug("app:errorHandler");

class ApiError extends Error {
  status = 500;
  name = "ApiError";
  constructor(message) {
    super(message);
  }
}

class NotFoundError extends ApiError {
  status = 404;
  name = "NotFoundError";
}

class BadRequestError extends ApiError {
  status = 400;
  name = "BadRequestError";
}

class UnauthorizedError extends ApiError {
  status = 401;
  name = "UnauthorizedError";
}

class ForbiddenError extends ApiError {
  status = 403;
  name = "ForbiddenError";
}

const errorHandler = (error, req, res, _next) => {
  debug(error);

  if (error instanceof ApiError) {
    res.status(error.status).json({
      error: error.message,
    });
    return;
  }

  res.status(500).json({
    error: "Something went wrong",
  });
};

module.exports = {
  errorHandler,
  ApiError,
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
  NotFoundError,
};
