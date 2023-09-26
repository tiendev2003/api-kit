const { StatusCodes } = require("http-status-codes");
const CustomError = require("./customError");

class ForBiddenError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = ForBiddenError;
