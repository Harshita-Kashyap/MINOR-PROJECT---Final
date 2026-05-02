const Vacancy = require("../models/Vacancy");
const Application = require("../models/Application");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const buildApplicationFilter = (query) => {
  const filter = {};

  if (query.vacancyId) filter.vacancyId = query.vacancyId;
  if (query.stage) filter.currentStage = query.stage;
  if (query.verificationStatus) {
    filter.verificationStatus = query.verificationStatus;
  }
  if (query.finalStatus) filter.finalStatus = query.finalStatus;
  if (query.technicalTestStatus) {
    filter.technicalTestStatus = query.technicalTestStatus;
  }
  if (query.personalityTestStatus) {
    filter.personalityTestStatus = query.personalityTestStatus;
  }

  return filter;
};

exports.getAdminDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalApplicants,
      totalSelectors,
      totalAdmins,

      totalVacancies,
      activeVacancies,
      closedVacancies,
      draftVacancies,

      totalApplications,

      verificationPending,
      verificationEligible,
      verificationReview,
      verificationRejected,

      technicalAssigned,
      technicalSubmitted,
      technicalQualified,
      technicalRejected,

      personalityAssigned,
      personalitySubmitted,

      finalReview,
      selected,
      waitlisted,
      finalRejected,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "applicant" }),
      User.countDocuments({ role: "selector" }),
      User.countDocuments({ role: "admin" }),

      Vacancy.countDocuments(),
      Vacancy.countDocuments({ status: "OPEN" }),
      Vacancy.countDocuments({ status: "CLOSED" }),
      Vacancy.countDocuments({ status: "DRAFT" }),

      Application.countDocuments(),

      Application.countDocuments({ verificationStatus: "PENDING" }),
      Application.countDocuments({ verificationStatus: "ELIGIBLE" }),
      Application.countDocuments({ verificationStatus: "REVIEW" }),
      Application.countDocuments({ verificationStatus: "REJECTED" }),

      Application.countDocuments({ technicalTestStatus: "ASSIGNED" }),
      Application.countDocuments({ technicalTestStatus: "SUBMITTED" }),
      Application.countDocuments({ technicalTestStatus: "QUALIFIED" }),
      Application.countDocuments({ technicalTestStatus: "REJECTED" }),

      Application.countDocuments({ personalityTestStatus: "ASSIGNED" }),
      Application.countDocuments({ personalityTestStatus: "SUBMITTED" }),

      Application.countDocuments({ currentStage: "FINAL_REVIEW" }),
      Application.countDocuments({ finalStatus: "SELECTED" }),
      Application.countDocuments({ finalStatus: "WAITLISTED" }),
      Application.countDocuments({ finalStatus: "REJECTED" }),
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        users: {
          totalUsers,
          totalApplicants,
          totalSelectors,
          totalAdmins,
        },

        vacancies: {
          totalVacancies,
          activeVacancies,
          closedVacancies,
          draftVacancies,
        },

        applications: {
          totalApplications,

          verificationPending,
          verificationEligible,
          verificationReview,
          verificationRejected,

          technicalAssigned,
          technicalSubmitted,
          technicalQualified,
          technicalRejected,

          personalityAssigned,
          personalitySubmitted,

          finalReview,
          selected,
          waitlisted,
          finalRejected,
        },
      },
    });
  } catch (error) {
    console.error("Admin dashboard stats error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAdminApplications = async (req, res) => {
  try {
    const filter = buildApplicationFilter(req.query);

    const applications = await Application.find(filter)
      .populate("userId", "name email phone role")
      .populate("vacancyId", "title department advertisementNo status deadline")
      .populate("selectorId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Admin applications monitoring error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAdminApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("userId", "name email phone role")
      .populate("profileId")
      .populate("vacancyId", "title department advertisementNo status deadline")
      .populate("selectorId", "name email");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("Admin application detail error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAdminAnalytics = async (req, res) => {
  try {
    const [
      activeVacancies,
      closedVacancies,
      draftVacancies,
      totalVacancies,
      totalApplications,

      verificationPending,
      verificationReview,
      verificationEligible,
      verificationRejected,

      technicalAssigned,
      technicalSubmitted,
      technicalQualified,
      technicalRejected,

      personalityAssigned,
      personalitySubmitted,

      finalReviewPending,
      selected,
      waitlisted,
      finalRejected,
    ] = await Promise.all([
      Vacancy.countDocuments({ status: "OPEN" }),
      Vacancy.countDocuments({ status: "CLOSED" }),
      Vacancy.countDocuments({ status: "DRAFT" }),
      Vacancy.countDocuments(),
      Application.countDocuments(),

      Application.countDocuments({ verificationStatus: "PENDING" }),
      Application.countDocuments({ verificationStatus: "REVIEW" }),
      Application.countDocuments({ verificationStatus: "ELIGIBLE" }),
      Application.countDocuments({ verificationStatus: "REJECTED" }),

      Application.countDocuments({ technicalTestStatus: "ASSIGNED" }),
      Application.countDocuments({ technicalTestStatus: "SUBMITTED" }),
      Application.countDocuments({ technicalTestStatus: "QUALIFIED" }),
      Application.countDocuments({ technicalTestStatus: "REJECTED" }),

      Application.countDocuments({ personalityTestStatus: "ASSIGNED" }),
      Application.countDocuments({ personalityTestStatus: "SUBMITTED" }),

      Application.countDocuments({ currentStage: "FINAL_REVIEW" }),
      Application.countDocuments({ finalStatus: "SELECTED" }),
      Application.countDocuments({ finalStatus: "WAITLISTED" }),
      Application.countDocuments({ finalStatus: "REJECTED" }),
    ]);

    const selectionRate =
      totalApplications > 0
        ? Math.round((selected / totalApplications) * 100)
        : 0;

    const technicalQualificationRate =
      totalApplications > 0
        ? Math.round((technicalQualified / totalApplications) * 100)
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
          technicalQualified: {
            $sum: {
              $cond: [{ $eq: ["$technicalTestStatus", "QUALIFIED"] }, 1, 0],
            },
          },
          selected: {
            $sum: {
              $cond: [{ $eq: ["$finalStatus", "SELECTED"] }, 1, 0],
            },
          },
          waitlisted: {
            $sum: {
              $cond: [{ $eq: ["$finalStatus", "WAITLISTED"] }, 1, 0],
            },
          },
          rejected: {
            $sum: {
              $cond: [{ $eq: ["$finalStatus", "REJECTED"] }, 1, 0],
            },
          },
          avgTechnicalScore: { $avg: "$technicalScore" },
          avgPersonalityScore: { $avg: "$personalityScore" },
          avgOverallScore: { $avg: "$overallScore" },
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
          _id: 0,
          vacancyId: "$_id",
          title: "$vacancy.title",
          department: "$vacancy.department",
          status: "$vacancy.status",
          totalApplications: 1,
          technicalQualified: 1,
          selected: 1,
          waitlisted: 1,
          rejected: 1,
          avgTechnicalScore: { $round: ["$avgTechnicalScore", 2] },
          avgPersonalityScore: { $round: ["$avgPersonalityScore", 2] },
          avgOverallScore: { $round: ["$avgOverallScore", 2] },
        },
      },
      { $sort: { totalApplications: -1 } },
    ]);

    const stageWiseDistribution = await Application.aggregate([
      {
        $group: {
          _id: "$currentStage",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          stage: "$_id",
          count: 1,
          _id: 0,
        },
      },
      { $sort: { count: -1 } },
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

    return res.status(200).json({
      success: true,
      analytics: {
        activeVacancies,
        closedVacancies,
        draftVacancies,
        totalVacancies,
        totalApplications,

        verificationPending,
        verificationReview,
        verificationEligible,
        verificationRejected,

        technicalAssigned,
        technicalSubmitted,
        technicalQualified,
        technicalRejected,

        personalityAssigned,
        personalitySubmitted,

        finalReviewPending,
        selected,
        waitlisted,
        finalRejected,

        selectionRate,
        technicalQualificationRate,
        applicationsPerDay,

        funnel: {
          applied: totalApplications,
          verificationPending,
          verificationReview,
          verificationEligible,
          technicalAssigned,
          technicalSubmitted,
          technicalQualified,
          personalityAssigned,
          personalitySubmitted,
          finalReviewPending,
          selected,
          waitlisted,
          rejected: verificationRejected + technicalRejected + finalRejected,
        },

        finalOutcomeSummary: {
          selected,
          waitlisted,
          rejected: finalRejected,
          notDecided:
            totalApplications - selected - waitlisted - finalRejected,
        },

        vacancyWiseApplications,
        stageWiseDistribution,
        weeklyApplications,
      },
    });
  } catch (error) {
    console.error("Admin analytics error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const sanitizeUser = (user) => {
  const userObj = user.toObject ? user.toObject() : user;
  delete userObj.passwordHash;
  return userObj;
};

exports.getAdminUsers = async (req, res) => {
  try {
    const filter = {};

    if (req.query.role) filter.role = req.query.role;

    if (req.query.status === "active") filter.isActive = true;
    if (req.query.status === "inactive") filter.isActive = false;

    const users = await User.find(filter)
      .select("-passwordHash")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get admin users error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAdminUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get admin user detail error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createAdminUser = async (req, res) => {
  try {
    const {
      name,
      email = "",
      phone = "",
      password,
      role = "applicant",
    } = req.body;

    const normalizedName = name?.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.trim();

    if (!normalizedName || !password) {
      return res.status(400).json({
        success: false,
        message: "Name and password are required",
      });
    }

    if (!normalizedEmail || !normalizedPhone) {
      return res.status(400).json({
        success: false,
        message: "Email and phone are required",
      });
    }

    if (!["applicant", "admin", "selector"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user role",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { phone: normalizedPhone }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or phone already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      phone: normalizedPhone,
      passwordHash,
      role,
      isActive: true,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Create admin user error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false",
      });
    }

    if (req.params.id === req.user.id && isActive === false) {
      return res.status(400).json({
        success: false,
        message: "You cannot deactivate your own account",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true, runValidators: true }
    ).select("-passwordHash");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: isActive ? "User activated successfully" : "User deactivated successfully",
      user,
    });
  } catch (error) {
    console.error("Update user status error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["applicant", "admin", "selector"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user role",
      });
    }

    if (req.params.id === req.user.id && role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "You cannot remove your own admin role",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select("-passwordHash");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update user role error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAdminUser = async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};