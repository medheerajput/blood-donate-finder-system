const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const Contact = require("../models/Contact");

exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      pincode,
      country,
      state,
      city,
      blood,
      donate,
    } = req.body;
    console.log({
      name,
      email,
      password,
      phone,
      pincode,
      country,
      state,
      city,
      blood,
      donate,
    });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      pincode,
      country,
      state,
      city,
      bloodGroup: blood,
      willingToDonate: donate,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });

    let user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Generate Token (Use env variable for security)
    const token = jwt.sign({ id: user._id }, "medheerajput", {
      expiresIn: "1d",
    });

    // ✅ Set Token in HTTP-only Cookie
    res.cookie("token", token, {
      httpOnly: true, // Secure against XSS
      sameSite: "strict", // CSRF Protection
      secure: process.env.NODE_ENV === "production", // Set to true in production
      maxAge: 24 * 60 * 60 * 1000, // Expires in 1 day
    });

    const count = await Contact.countDocuments({
      requestedUserId: user._id,
      accepted: true,
    });

    await User.updateOne({ _id: user._id }, { $set: { donate_made: count } });

    res.status(200).json({ message: "Login successful", user, token, count });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getDonors = async (req, res) => {
  try {
    const donors = await User.find({
      pincode: req.params.id,
      willingToDonate: true,
    }); // Fetch all donors from DB

    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// logout
exports.logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logout successful" });
};
