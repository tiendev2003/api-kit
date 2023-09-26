const NotFoundError = require("./notFoundError");
const BadRequestError = require("./badRequestError");
const UnauthorizedError = require("./unauthorizedError");
const ConflictError = require("./conflictError");
const UnprocessableEntityError = require("./unprocessableEntityError");
const ForBiddenError = require("./forBiddenError");
module.exports = {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ConflictError,
  UnprocessableEntityError,ForBiddenError
};
