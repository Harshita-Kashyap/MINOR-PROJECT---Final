const Applicant = require("../models/Application"); // TEMP

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const userId = "test-user-id";

    const profile = await Applicant.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// SAVE PROFILE
exports.saveProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    let profile = await Applicant.findOne({ userId });

    if (profile) {
      profile = await Applicant.findOneAndUpdate(
        { userId },
        req.body,
        { new: true }
      );
    } else {
      profile = await Applicant.create({
        userId,
        ...req.body
      });
    }

    res.json({
      message: "Profile saved successfully",
      profile
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ SAVE PROFILE
exports.saveProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    let profile = await Applicant.findOne({ userId });

    if (profile) {
      // update
      profile = await Applicant.findOneAndUpdate(
        { userId },
        req.body,
        { new: true }
      );
    } else {
      // create
      profile = await Applicant.create({
        userId,
        ...req.body
      });
    }

    res.json({
      message: "Profile saved successfully",
      profile
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};