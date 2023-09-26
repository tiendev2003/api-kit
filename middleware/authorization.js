const express = require("express")
const jwt = require('jsonwebtoken');
const { User } = require("../models/userModel");
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;
const colors = require("colors");

exports.authorization = async (req, res, next) => {

    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied.');
   
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.userId);
    console.log(user)

    try {
        if (user && user.role === 'ROLE_ADMIN') {
            req.user = user; // Set the user in the request for further use
            next(); // User is authorized, proceed to the next middleware
        } else {
            return res.status(403).send('Forbidden: You do not have access to access this page');
        }
    } catch (error) {
        res.status(400).send('Invalid token.');
    }

  
}