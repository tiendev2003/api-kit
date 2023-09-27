const { User } = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const expressAsyncHandler = require("express-async-handler");
const { createResponse } = require("../utils/createResponse");
const cloudinary = require("cloudinary");
const fs = require("fs");

const getAllUsers = expressAsyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(StatusCodes.OK).json(createResponse(users));
});

const getUserById = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(StatusCodes.OK).json(createResponse(user));
});

const updateUserById = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.userId);

  let { name, phone, description } = req.body;

  let avartar = req.files.avartar.tempFilePath;
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (description) user.description = description;
  if (avartar) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    let mycloud = {};
    await cloudinary.v2.uploader
      .upload(req.files.avartar.tempFilePath, {
        folder: "avatars",
        resource_type: "image",
      })
      .then((result) => {
        mycloud = result;
      })
      .catch((error) => {
        console.log(error);
      });
    fs.rmSync("./tmp", { recursive: true });
    avartar = mycloud.url;
  }
  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile Updated",
  });
  await user.save();
});

module.exports = {
    getAllUsers,
    getUserById,
    updateUserById,
}