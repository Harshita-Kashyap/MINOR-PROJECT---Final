const ApplicantProfile = require("../models/ApplicantProfile");

// ✅ SAVE PROFILE
exports.saveProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user.id;

    // ✅ FIX BOOLEAN FIELDS
    const cleanData = {
      ...req.body,
      userId,
      isPwd: req.body.isPwd === "Yes",
      isExServiceman: req.body.isExServiceman === "Yes",
      isGovtEmployee: req.body.isGovtEmployee === "Yes",
      hasPostGraduation: req.body.hasPostGraduation === "Yes",
      hasPhd: req.body.hasPhd === "Yes",
    };

    const profile = await ApplicantProfile.findOneAndUpdate(
  { userId },
  {
    ...req.body,
    userId,
    profileStatus: "COMPLETE", // 🔥 ADD THIS
  },
  {
    upsert: true,
    returnDocument: "after",
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