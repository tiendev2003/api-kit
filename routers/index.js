const routerAuth = require("./auth.router");
// const routerUsers = require("./user.router");
// const routerProducts = require("./products.router");
// const routerUpload = require("./upload.router");
// const routerCategories = require("./category.router");


const createRouters = (app) => {
  app.use("/api/v1/auth", routerAuth);
 
  // app.use("/api/v1/products", routerProducts);
  // app.use("/api/v1/categories", routerCategories);
  // app.use("/api/v1/upload", routerUpload);
};

module.exports = createRouters;
