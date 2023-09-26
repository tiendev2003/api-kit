const mongoose = require("mongoose");

// Define the User Schema
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    uuid: { type: String, required: true },
    description: { type: String },
    phone: { type: String },
    address: { type: String },
    dateOfBirth: { type: Date },
    avartar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["ROLE_USER", "ROLE_ADMIN"],
      default: "ROLE_USER",
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
const User = mongoose.model("user", userSchema);

// Export the User model
module.exports = { User };
