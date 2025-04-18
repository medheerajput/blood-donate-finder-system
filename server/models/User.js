const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  pincode: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  willingToDonate: { type: Boolean, default: false },
  usersIdWhoSendRequest: { type: Array, default: [] },
  lastDonate: { type: Date, default: null },
  donate_made: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);
