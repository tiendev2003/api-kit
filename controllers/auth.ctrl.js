require("dotenv").config();
const { User } = require("../models/userModel");

const { TokenUser } = require("../models/tokenModel");
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
const expressAsyncHandler = require("express-async-handler");

const register1 = async (req, res) => {
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
const login1 = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    throw new BadRequestError("please provide info!");
  }
  if (password.length < 5) {
    throw new UnprocessableEntityError(
      "password is required and must be at least 6 characters"
    );
  }
  const user = await User.findOne({ email: email });
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
const verifyEmail1 = async (req, res) => {
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

const register = expressAsyncHandler(async (req, res, next) => {
  let { name, email, password } = req.body;

  console.log(req.body);
  let isUserExits = await User.findOne({ email: req.body.email });

  if (isUserExits) {
    res.status(409).json({
      message: "Email already registered",
    });
    next();
  }
  password = (await hashPassword(password)).toString();
  console.log("password", password);
  const newUser = {
    name,
    password,
    email,
  };
  await User.create(newUser);
  const response = createResponse({
    message: "Đăng ký thành công",
    status: StatusCodes.CREATED,
  });
  res.status(response.status).json(response);
});
const login = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(401).json({
      message: "Email không tồn tại",
    });
    next();
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    res.status(401).json({
      message: "Mật khẩu không đúng",
    });
    next();
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
    res.status(401).json({
      message: "Vui lòng kiểm tra tin nhắn email để xác minh tài khoản.",
    });

    next();
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
  const tokenUser = await TokenUser.findOne({ userId: user.id });
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
});
const verifyEmail = expressAsyncHandler(async (req, res, next) => {
  const { token, email } = req.query;
  // if (!verificationToken || !email) {
  //   res.status(400).json({
  //     message: "Vui lòng cung cấp thông tin!",
  //   });
  //   next();
  // }
  const user = await User.findOne({ email: email });
  // if (!user) {
  //   res.status(404).json({
  //     message: "Không tìm thấy người dùng",
  //   });
  //   next();
  // }
  // if (verificationToken !== user.verificationToken) {
  //   res.status(403).json({
  //     message: "Cấm",
  //   });
  //   next();
  // }
  user.isVerified = true;
  user.verifiedDate = new Date();
  user.token = null;
  await user.save();
  const response = createResponse({
    message: "verified successfully",
    status: StatusCodes.OK,
  });
  res.status(response.status).json(response);
});

module.exports = {
  register,
  logout,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
