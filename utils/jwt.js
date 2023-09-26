const jwt = require("jsonwebtoken");

const createJWT = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

const attachCookiesToResponse = (res, infoUser, refreshToken) => {
  const token = createJWT(infoUser);
  const refreshTokenJWT = createJWT({ infoUser, refreshToken });
  res.cookie("access_token", token, {
    httpOnly: true,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
    secure: process.env.NODE_ENV === "production",
  });
  res.cookie("refresh_token", refreshTokenJWT, {
    httpOnly: true,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 30,
    secure: process.env.NODE_ENV === "production",
  });
};

const verifyValue = (token) => {
  const value = jwt.verify(token, process.env.JWT_SECRET);
  return value;
};
module.exports = { createJWT, attachCookiesToResponse, verifyValue };
