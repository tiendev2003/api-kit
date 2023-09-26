const { StatusCodes } = require("http-status-codes");

const notFoundMiddleware = async (req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json("Đường dẫn này hiện không tồn tại!");
};

module.exports = notFoundMiddleware;
