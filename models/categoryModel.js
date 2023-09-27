const mongoose = require("mongoose");

const categorySchema =new  mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.categoryId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Category = new mongoose.model("category", categorySchema);

module.exports = {
  Category,
};
