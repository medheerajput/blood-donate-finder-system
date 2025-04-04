const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // ✅ Get token from cookies
  // console.log("Received Token:", token); // ✅ Confirm token is received

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // ✅ Verify token properly
    const decoded = jwt.verify(token, "medheerajput");
    // console.log("Decoded Token:", decoded); // ✅ Check what the decoded data looks like

    req.user = decoded; // ✅ Attach user data to request
    // console.log("User Data:", req.user);

    next(); // ✅ Proceed to the next middleware
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
