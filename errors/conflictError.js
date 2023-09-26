const { StatusCodes } = require("http-status-codes");
const CustomError = require("./customError");

class ConflictError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
  }
}

module.exports = ConflictError;
