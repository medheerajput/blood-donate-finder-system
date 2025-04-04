const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requestedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accepted: { type: Boolean, default: false },
    message: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
