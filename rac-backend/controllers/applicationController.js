// controllers\applicationController.js

const Application = require("../models/Application");
const ApplicantProfile = require("../models/ApplicantProfile");
const Vacancy = require("../models/Vacancy");

// ================= APPLY =================
exports.apply = async (req, res) => {
  try {
    const userId = req.user.id;
    const { vacancyId } = req.body;

    if (!vacancyId) {
      return res.status(400).json({
        success: false,
        message: "vacancyId is required",
      });
    }

    // 1. duplicate check
    const existing = await Application.findOne({ userId, vacancyId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Already applied for this vacancy",
      });
    }

    // 2. profile check
    const profile = await ApplicantProfile.findOne({ userId });

    if (!profile || profile.profileStatus !== "COMPLETE") {
      return res.status(400).json({
        success: false,
        message: "Please complete your profile before applying",
      });
    }

    // 3. vacancy check
    const vacancy = await Vacancy.findById(vacancyId);
    if (!vacancy) {
      return res.status(404).json({
        success: false,
        message: "Vacancy not found",
      });
    }

    // optional: prevent applying to closed vacancy
    if (vacancy.status && vacancy.status.toUpperCase() !== "OPEN") {
      return res.status(400).json({
        success: false,
        message: "This vacancy is not open for applications",
      });
    }

    // 4. create application
    const application = await Application.create({
      applicationId: `APP-${Date.now()}`,
      userId,
      profileId: profile._id,
      vacancyId: vacancy._id,
      vacancyTitle: vacancy.title,
      department: vacancy.department,
      appliedAt: new Date(),

      currentStage: "APPLIED",
      verificationStatus: "PENDING",

      technicalTestStatus: "NOT_ASSIGNED",
      technicalScore: null,
      technicalRemarks: "",

      personalityTestStatus: "NOT_ASSIGNED",
      personalityScore: null,
      personalityRemarks: "",

      finalStatus: "NOT_DECIDED",
      finalRemarks: "",
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (err) {
    console.error("APPLY ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET MY APPLICATIONS =================
exports.getMyApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await Application.find({ userId })
      .sort({ createdAt: -1 })
      .populate("vacancyId", "title department status");

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (err) {
    console.error("FETCH MY APPLICATIONS ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET SINGLE APPLICATION =================
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("userId", "name email phone")
      .populate("profileId")
      .populate("vacancyId", "title department status");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // applicant can only access own application
    if (
      req.user.role === "applicant" &&
      application.userId &&
      application.userId._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (err) {
    console.error("GET APPLICATION ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET ALL APPLICATIONS (ADMIN / SELECTOR) =================
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email phone")
      .populate("vacancyId", "title department");

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (err) {
    console.error("GET ALL APPLICATIONS ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};