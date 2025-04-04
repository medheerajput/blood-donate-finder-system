const Contact = require("../models/Contact");
const User = require("../models/User");

exports.requestContact = async (req, res) => {
  try {
    const { donorId, msg } = req.body;
    await User.updateOne(
      { _id: donorId },
      { $push: { usersIdWhoSendRequest: req.user.id } }
    );
    const newContact = new Contact({
      userId: req.user.id,
      requestedUserId: donorId,
      message:
        msg ||
        "I am facing an emergency and would truly appreciate it if you could consider donating your blood.",
    });

    await newContact.save();
    res.status(201).json({ message: "Contact request sent" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.IsRequestAccept = async (req, res) => {
  console.log("paramid:", req.params.id);
  console.log("checked:", req.params.checked);

  try {
    // Donate or not
    const res = await Contact.updateOne(
      { _id: req.params.id },
      { accepted: req.params.checked }
    );

    //last donation date updated
    if (req.params.checked === "true") {
      console.log("checked value:", req.params.checked);

      await User.updateOne(
        { _id: req.user.id },
        { $set: { lastDonate: new Date() } }
      );
    }

    if (res.acknowledged) {
      return res.status(201).json({ message: "Allowed" });
    }
    return res.status(500).json({ message: "Server error", error });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getContacts = async (req, res) => {
  console.log("userID:", req.user.id);

  try {
    const contacts = await Contact.find({ userId: req.user.id }).populate(
      "requestedUserId"
    );
    const receivedReqs = await Contact.find({
      requestedUserId: req.user.id,
    }).populate("userId");

    res.json({ contacts, receivedReqs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
