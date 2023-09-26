const express = require('express');
const fs = require('fs');


// Custom middleware to log request details
const requestLoggerMiddleware = (req, res, next) => {
  const startTime = Date.now();
  
  // Capture response finish to calculate response time
  res.on('finish', () => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    // Append the log to a file
    fs.appendFileSync(
      "./logger/path.txt",
      `Route Visited: ${req.url} | Method: ${req.method} | ResponseTime: ${responseTime} ms\n`
    );
  });

  // Call the next middleware in the stack
  next();
};

module.exports = {
    requestLoggerMiddleware
}