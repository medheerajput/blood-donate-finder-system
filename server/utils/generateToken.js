const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  // Create JWT Token
  const token = jwt.sign({ id: userId }, "shubhangi123", {
    expiresIn: "1d",
  });

  // Set Token in HTTP-only Cookie
  res.cookie("token", token, {
    httpOnly: true, // Secure against XSS
    sameSite: "strict", // CSRF Protection
    maxAge: 24 * 60 * 60 * 1000, // Expires in 1 day
  });
};

module.exports = generateToken;
