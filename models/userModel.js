const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    uuid: { type: String },
    description: { type: String },
    phone: { type: String },
    address: { type: String },
    dateOfBirth: { type: Date },
    avartar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "client"],
      default: "client",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedDate: {
      type: Date,
      default: null,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    passwordToken: {
      type: String,
      default: null,
    },
    passwordTokenExpire: {
      type: Date,
      default: null,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.userId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

// Create a user model using schema
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = { User };
