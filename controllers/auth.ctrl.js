const { User, TokenUser } = require("../database/models");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ConflictError,
  UnprocessableEntityError,
  ForBiddenError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { comparePassword, hashPassword } = require("../utils/bcrypt");
const { createString } = require("../utils/crypto");
const {
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../utils/email");
const { attachCookiesToResponse } = require("../utils/jwt");
const { createResponse } = require("../utils/createResponse");
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email) {
    throw new BadRequestError("information is required");
  }
  if (password.length < 5) {
    throw new UnprocessableEntityError(
      "password is required and must be at least 5 characters"
    );
  }
  const user = await User.findOne({ where: { email } });
  if (user) {
    throw new ConflictError("email is already in use");
  }
  const newUser = {
    name,
    password,
    email,
  };
  await User.create(newUser);
  const response = createResponse({
    message: "add new user success",
    status: StatusCodes.CREATED,
  });
  res.status(response.status).json(response);
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    throw new BadRequestError("please provide info!");
  }
  if (password.length < 5) {
    throw new UnprocessableEntityError(
      "password is required and must be at least 6 characters"
    );
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError("user not found");
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedError("unauthorized");
  }
  if (!user.isVerified) {
    const origin = process.env.FRONTEND_CLIENT_URL;
    const verificationToken = createString();
    user.verificationToken = verificationToken;
    sendVerificationEmail({
      name: user.name,
      email: user.email,
      verificationToken,
      origin,
    });
    await user.save();
    throw new UnauthorizedError(
      "please check your email to verify your account."
    );
  }
  let userShow = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const response = createResponse({
    message: "success",
    status: StatusCodes.OK,
    data: userShow,
  });
  const tokenUser = await TokenUser.findOne({ where: { userId: user.id } });
  if (!tokenUser) {
    const refreshToken = createString();
    const newTokenUser = {
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      refreshToken,
      isValid: true,
      userId: user.id,
    };
    await TokenUser.create(newTokenUser);
    attachCookiesToResponse(
      res,
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      refreshToken
    );
    return res.status(response.status).json(response);
  }
  const refreshToken = tokenUser.refreshToken;
  attachCookiesToResponse(
    res,
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    refreshToken
  );
  res.status(response.status).json(response);
};
const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  if (!verificationToken || !email) {
    throw new BadRequestError("please provide infor!");
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError("user not found");
  }
  if (verificationToken !== user.verificationToken) {
    throw new ForBiddenError("forbidden");
  }
  user.isVerified = true;
  user.verifiedDate = new Date();
  user.verificationToken = null;
  await user.save();
  const response = createResponse({
    message: "verified successfully",
    status: StatusCodes.OK,
  });
  res.status(response.status).json(response);
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("please provide email!");
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError("email not found");
  }
  user.passwordToken = createString();
  user.passwordTokenExpire = new Date(Date.now() + 1000 * 60 * 1); // Thời gian hiện tại + 10 phút
  await user.save();
  sendResetPasswordEmail({
    name: user.name,
    email: user.email,
    token: user.passwordToken,
    origin: process.env.FRONTEND_CLIENT_URL,
  });
  const response = createResponse({
    message: "check your email to reset your password in 10 minutes",

    status: StatusCodes.ACCEPTED,
  });
  res.status(response.status).json(response);
};
const resetPassword = async (req, res) => {
  const { passwordToken, email, password, confirmPassword } = req.body;
  if (!passwordToken || !email) {
    throw new BadRequestError("please provide info");
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError("user not found");
  }

  const currentDate = new Date(Date.now());
  if (
    !(
      user.passwordTokenExpire > currentDate &&
      passwordToken === user.passwordToken
    )
  ) {
    throw new UnauthorizedError("token is invalid");
  }

  if (password !== confirmPassword) {
    throw new BadRequestError("password is incorrect");
  }
  user.password = await hashPassword(password);
  user.passwordToken = null;
  user.passwordTokenExpire = null;
  await user.save();
  const response = createResponse({
    message: "reset password successfully",
    status: StatusCodes.OK,
  });
  res.status(response.status).json(response);
};
const logout = async (req, res) => {
  await TokenUser.destroy({ where: { userId: req.userInfo.userId } });
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  const response = createResponse({
    message: "logout successfully",
    status: StatusCodes.OK,
  });
  res.status(response.status).json(response);
};

module.exports = {
  register,
  logout,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
