const { StatusCodes } = require("http-status-codes");

const errorMiddleware = (err, req, res, next) => {
  const defaultError = {
    status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Internal Server Error",
    statusText: null,
    status: err.statusCode,
    ok: false,
  };
  switch (err.statusCode) {
    // Bad request
    case 400:
      defaultError.statusText = "Bad Request";
      break;
    case 401:
      defaultError.statusText = "Unauthorized";
      break;
    case 404:
      defaultError.statusText = "Not Found";
      break;

    case 409:
      defaultError.statusText = "Conflict";
      break;
    case 422:
      defaultError.statusText = "Unprocessable Entity";
      break;
  }
  if (err.name === "SequelizeValidationError") {
    defaultError.message =
      err.errors[0].path +
      " có giá trị " +
      err.errors[0].value +
      " không hợp lệ";
    defaultError.statusText = "Unprocessable Entity";
    defaultError.status = StatusCodes.UNPROCESSABLE_ENTITY;
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    defaultError.message = err.errors[0].message;
    defaultError.statusText = "Unprocessable Entity";
    defaultError.status = StatusCodes.UNPROCESSABLE_ENTITY;
  }
  res.status(defaultError.status).json(defaultError);
};

module.exports = errorMiddleware;
