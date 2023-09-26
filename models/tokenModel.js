const mongoose = require("mongoose");

// Define the User Schema
const tokenSchema = mongoose.Schema(
  {
    ip: { type: String },
    userAgent: { type: String, default: null },

    refreshToken: {
      type: String,

      default: null,
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    userId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.tokenId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// Create a user model using schema
const Token = mongoose.model("Token", tokenSchema);

// Export the User model
module.exports = { Token };
