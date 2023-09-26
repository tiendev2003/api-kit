require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { userRouter } = require("./routes/userRoute");
const { requestLoggerMiddleware } = require("./middleware/loggerMiddleware");

const colors = require("colors");
const PORT = process.env.PORT || 8080;

const { connection } = require("./configs/db");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      success: "Welcome to the home page of Triveous backend Ecommerce API",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "K-IT Backend API",
      version: "1.0.0",
      description:
        "This is K-IT API, user can register and login with valid credentials and after authentication user can see products and purchase any product with their category. If user wants to view the single product items etc. they can also view and if user wants to edit anything so they can also do this in the cart section and in order section they can either place and order and can see order history.",
    },
    servers: [
      {
        url: "http://localhost:8080/api",
      },
    ],
  },
  apis: ["./docs/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(requestLoggerMiddleware);
app.use("/api/users", userRouter);

app.listen(PORT, async () => {
  try {
    // Establishing database connection
    await connection;

    //
    console.log({ message: `Server is running at ${PORT}` });
  } catch (error) {
    console.log(error.message);
  }
});
