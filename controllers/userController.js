const { User } = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require("../helper/successAndError");
const saltRounds = Number(process.env.saltRounds) || 10;
const colors = require("colors")
const jwtSecret = process.env.JWT_SECRET || 'masai';


// Getting all Users
async function getAllUsers(req, res) {
  console.log("get")
    try {
        // Retrieve all users from the database
        const users = await User.find();
        console.log(users)
        // Respond with the list of users
        res.status(200).json(successResponse(201, "Retrieved all Users successfully", users));
    } catch (error) {
        // Handle server error
        res.status(400).json(errorResponse(400, "Error Fetching User"));
    }
}

//Registering all Users
async function registerUser(req, res) {
    const { name, email, password, role,uuid } = req.body;
    try {
      const userExist = await User.findOne({ email: email });
  
      if (userExist) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "User already exists",
        });
      }
      const uuidExist = await User.findOne({ uuid: uuid });
  
      if (uuidExist) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "User already exists",
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);

      if (!hashedPassword) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Error in hashing password",
        });
      }
  
      const userData = new User({
        name,
        email,
        password: hashedPassword,
        role,
        uuid,
      });
      await userData.save();
  
      return res.status(201).json({
        status: 201,
        success: true,
        message: "Registration successful",
        data: userData,
      });
    } catch (error) {
      console.error(colors.red("Error: ", error.message));
      res.status(400).json({ status: 400, error: "Registration failed" });
    }
}
// Login User
const loginUser = async (req, res) => {
    try {
        // Extract user information from the request body
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        // If user doesn't exist or password is incorrect
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1day" });

        // Respond with a success message and the JWT token
        res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        // Handle server error
        res.status(400).json({ error: "Bad Request" });
    }
}




// Export the functions
module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
};