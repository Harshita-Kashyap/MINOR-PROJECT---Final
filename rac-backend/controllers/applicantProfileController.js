const ApplicantProfile = require("../models/ApplicantProfile");

// ✅ SAVE PROFILE
exports.saveProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await ApplicantProfile.findOneAndUpdate(
      { userId },
      {
        ...req.body,
        userId,
        profileStatus: "COMPLETE",
        profileCompletionPercent: 100,
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      message: "Profile saved successfully",
      profile,
    });
  } catch (err) {
    console.error("PROFILE SAVE ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ GET PROFILE
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await ApplicantProfile.findOne({
      userId: req.user.id,
    });

    res.json({
      success: true,
      profile,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};