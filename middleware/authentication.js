const { UnauthorizedError, ForBiddenError } = require("../errors");
const { verifyValue } = require("../utils/jwt");

const authenticateUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) throw new UnauthorizedError("unauthorized");
  try {
    const { data } = verifyValue(token);
    req.userInfo = data;
    next();
  } catch (error) {
    next(error);
  }
};

const authenticatePermission = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.userInfo.role)) {
      next();
    } else {
      throw new ForBiddenError("forbidden permission");
    }
  };
};

module.exports = {
  authenticateUser,
  authenticatePermission,
};
