const { StatusCodes } = require("http-status-codes");
const CustomError = require("./customError");

class UnprocessableEntityError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
  }
}

module.exports = UnprocessableEntityError;
