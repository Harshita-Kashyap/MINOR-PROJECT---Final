const Vacancy = require("../models/Vacancy");
const Application = require("../models/Application");

exports.getAdminAnalytics = async (req, res) => {
  try {
    const activeVacancies = await Vacancy.countDocuments({ status: "OPEN" });
    const totalApplications = await Application.countDocuments();

    const verificationReview = await Application.countDocuments({
      verificationStatus: "REVIEW",
    });

    const finalReviewPending = await Application.countDocuments({
      currentStage: "FINAL_REVIEW",
    });

    const shortlisted = await Application.countDocuments({
      technicalTestStatus: "SHORTLISTED",
    });

    const selected = await Application.countDocuments({
      finalStatus: "SELECTED",
    });

    const selectionRate =
      totalApplications > 0
        ? Math.round((selected / totalApplications) * 100)
        : 0;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentApplications = await Application.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    const applicationsPerDay = Math.round(recentApplications / 7);

    res.status(200).json({
      success: true,
      analytics: {
        activeVacancies,
        totalApplications,
        verificationReview,
        finalReviewPending,
        selectionRate,
        applicationsPerDay,
        shortlisted,
        selected,
      },
    });
  } catch (error) {
    console.error("Admin analytics error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};