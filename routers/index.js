const routerAuth = require("./auth.router");
const routerProducts = require("./products.router");
const routerUpload = require("./upload.router");
const routerCategories = require("./category.router");
const routerProviders = require("./provider.router");
const routerColors = require("./color.router");
const routerUsers = require("./user.router");
const routerAddresses = require("./address.router");
const routerReviews = require("./userReview.router");

const createRouters = (app) => {
  app.use("/api/v1/auth", routerAuth);
  app.use("/api/v1/products", routerProducts);
  app.use("/api/v1/categories", routerCategories);
  app.use("/api/v1/providers", routerProviders);
  app.use("/api/v1/colors", routerColors);
  app.use("/api/v1/upload", routerUpload);
  app.use("/api/v1/users", routerUsers);
  app.use("/api/v1/addresses", routerAddresses);
  app.use("/api/v1/reviews", routerReviews);
};

module.exports = createRouters;
