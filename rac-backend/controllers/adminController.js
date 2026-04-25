const Vacancy = require("../models/Vacancy");
const Application = require("../models/Application");

exports.getAdminAnalytics = async (req, res) => {
  try {
    const activeVacancies = await Vacancy.countDocuments({ status: "OPEN" });
    const totalVacancies = await Vacancy.countDocuments();
    const totalApplications = await Application.countDocuments();

    const verificationPending = await Application.countDocuments({
      verificationStatus: "PENDING",
    });

    const verificationReview = await Application.countDocuments({
      verificationStatus: "REVIEW",
    });

    const verificationEligible = await Application.countDocuments({
      verificationStatus: "ELIGIBLE",
    });

    const verificationRejected = await Application.countDocuments({
      verificationStatus: "REJECTED",
    });

    const technicalAssigned = await Application.countDocuments({
      technicalTestStatus: "ASSIGNED",
    });

    const shortlisted = await Application.countDocuments({
      technicalTestStatus: "SHORTLISTED",
    });

    const technicalRejected = await Application.countDocuments({
      technicalTestStatus: "REJECTED",
    });

    const finalReviewPending = await Application.countDocuments({
      currentStage: "FINAL_REVIEW",
    });

    const selected = await Application.countDocuments({
      finalStatus: "SELECTED",
    });

    const waitlisted = await Application.countDocuments({
      finalStatus: "WAITLISTED",
    });

    const finalRejected = await Application.countDocuments({
      finalStatus: "REJECTED",
    });

    const selectionRate =
      totalApplications > 0
        ? Math.round((selected / totalApplications) * 100)
        : 0;

    const shortlistedRate =
      totalApplications > 0
        ? Math.round((shortlisted / totalApplications) * 100)
        : 0;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentApplications = await Application.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    const applicationsPerDay = Math.round(recentApplications / 7);

    const vacancyWiseApplications = await Application.aggregate([
      {
        $group: {
          _id: "$vacancyId",
          totalApplications: { $sum: 1 },
          selected: {
            $sum: {
              $cond: [{ $eq: ["$finalStatus", "SELECTED"] }, 1, 0],
            },
          },
          shortlisted: {
            $sum: {
              $cond: [{ $eq: ["$technicalTestStatus", "SHORTLISTED"] }, 1, 0],
            },
          },
        },
      },
      {
        $lookup: {
          from: "vacancies",
          localField: "_id",
          foreignField: "_id",
          as: "vacancy",
        },
      },
      { $unwind: "$vacancy" },
      {
        $project: {
          vacancyId: "$_id",
          title: "$vacancy.title",
          department: "$vacancy.department",
          status: "$vacancy.status",
          totalApplications: 1,
          shortlisted: 1,
          selected: 1,
          _id: 0,
        },
      },
      { $sort: { totalApplications: -1 } },
    ]);

    const weeklyApplications = await Application.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$createdAt" },
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          applications: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
        },
      },
      {
        $project: {
          date: {
            $concat: [
              { $toString: "$_id.day" },
              "-",
              { $toString: "$_id.month" },
              "-",
              { $toString: "$_id.year" },
            ],
          },
          applications: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        activeVacancies,
        totalVacancies,
        totalApplications,

        verificationPending,
        verificationReview,
        verificationEligible,
        verificationRejected,

        technicalAssigned,
        shortlisted,
        technicalRejected,

        finalReviewPending,
        selected,
        waitlisted,
        finalRejected,

        selectionRate,
        shortlistedRate,
        applicationsPerDay,

        funnel: {
          applied: totalApplications,
          verificationPending,
          verificationReview,
          verificationEligible,
          technicalAssigned,
          shortlisted,
          finalReviewPending,
          selected,
          waitlisted,
          rejected: verificationRejected + technicalRejected + finalRejected,
        },

        vacancyWiseApplications,
        weeklyApplications,
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