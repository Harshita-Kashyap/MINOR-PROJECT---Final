// controllers\applicationController.js

const Application = require("../models/Application");
const ApplicantProfile = require("../models/ApplicantProfile");
const Vacancy = require("../models/Vacancy");
const VerificationRecord = require("../models/VerificationRecord");

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
    let application = await Application.create({
      applicationId: `APP-${Date.now()}`,
      userId,
      profileId: profile._id,
      vacancyId: vacancy._id,
      vacancyTitle: vacancy.title,
      department: vacancy.department,
      appliedAt: new Date(),

      currentStage: "VERIFICATION_PENDING",
      verificationStatus: "PENDING",
      timeline: [
        {
          stage: "APPLIED",
          note: "Application submitted successfully.",
          date: new Date(),
        },
        {
          stage: "VERIFICATION_PENDING",
          note: "Profile verification started automatically.",
          date: new Date(),
        },
      ],

      technicalTestStatus: "NOT_ASSIGNED",
      technicalScore: null,
      technicalRemarks: "",

      personalityTestStatus: "NOT_ASSIGNED",
      personalityScore: null,
      personalityRemarks: "",

      finalStatus: "NOT_DECIDED",
      finalRemarks: "",
    });
    // ================= AUTO VERIFICATION =================
    const clean = (str) => (str || "").toString().toLowerCase().trim();

    const record = await VerificationRecord.findOne({
      aadhaarNumber: clean(profile.govtIdNumber),
    });

    let totalFields = 0;
    let matchedFields = 0;

    const check = (a, b) => {
      totalFields++;
      if (clean(a) === clean(b)) matchedFields++;
    };

    if (record) {
      // BASIC
      check(record.fullName, profile.fullName);
      check(record.dob, profile.dob);
      check(record.aadhaarNumber, profile.govtIdNumber);

      // 10th
      check(record.tenth?.board, profile.tenthBoard);
      check(record.tenth?.school, profile.tenthSchool);
      check(record.tenth?.rollNumber, profile.tenthRollNumber);
      check(record.tenth?.percentage, profile.tenthPercentage);
      check(record.tenth?.year, profile.tenthYear);

      // 12th
      check(record.twelfth?.board, profile.twelfthBoard);
      check(record.twelfth?.school, profile.twelfthSchool);
      check(record.twelfth?.rollNumber, profile.twelfthRollNumber);
      check(record.twelfth?.stream, profile.twelfthStream);
      check(record.twelfth?.percentage, profile.twelfthPercentage);
      check(record.twelfth?.year, profile.twelfthYear);

      // Graduation
      check(record.graduation?.degree, profile.graduationDegree);
      check(record.graduation?.discipline, profile.graduationDiscipline);
      check(record.graduation?.specialization, profile.graduationSpecialization);
      check(record.graduation?.institute, profile.graduationInstitute);
      check(record.graduation?.university, profile.graduationUniversity);
      check(record.graduation?.percentage, profile.graduationPercentage);
      check(record.graduation?.year, profile.graduationYear);

      // GATE
      check(record.gate?.paper, profile.gatePaper);
      check(record.gate?.score, profile.gateScore);
      check(record.gate?.rank, profile.gateRank);
      check(record.gate?.year, profile.gateYear);
    }

    const matchPercent = totalFields
      ? (matchedFields / totalFields) * 100
      : 0;

    // RESULT
    if (matchPercent >= 75) {
      application.verificationStatus = "ELIGIBLE";
      application.currentStage = "VERIFICATION_ELIGIBLE";
      application.technicalTestStatus = "NOT_ASSIGNED";
      application.verificationReason = `High match (${matchPercent.toFixed(1)}%). Candidate is eligible. Technical test will be assigned after vacancy deadline.`;

      application.timeline.push({
        stage: "VERIFICATION_ELIGIBLE",
        note: "Candidate verified as eligible.",
        date: new Date(),
      });
    } else if (matchPercent >= 50) {
      application.verificationStatus = "REVIEW";
      application.currentStage = "VERIFICATION_REVIEW";
      application.technicalTestStatus = "NOT_ASSIGNED";
      application.verificationReason = `Needs manual review (${matchPercent.toFixed(1)}%).`;

      application.timeline.push({
        stage: "VERIFICATION_REVIEW",
        note: "Candidate profile requires manual review.",
        date: new Date(),
      });
    } else {
      application.verificationStatus = "REJECTED";
      application.currentStage = "VERIFICATION_REJECTED";
      application.technicalTestStatus = "NOT_ASSIGNED";
      application.verificationReason = `Low match (${matchPercent.toFixed(1)}%). Candidate rejected in verification.`;

      application.timeline.push({
        stage: "VERIFICATION_REJECTED",
        note: "Candidate rejected during eligibility verification.",
        date: new Date(),
      });
    }

    await application.save();

    // ✅ RETURN RESPONSE (MISSING BEFORE)
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
      .populate("vacancyId", "title department status")
      .populate(
        "technicalTestScheduleId",
        "testType startTime endTime resultDeclarationDate cutoff"
      )
      .populate(
        "personalityTestScheduleId",
        "testType startTime endTime resultDeclarationDate cutoff"
      );

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
      .populate("vacancyId", "title department status")
      .populate(
        "technicalTestScheduleId",
        "testType startTime endTime resultDeclarationDate cutoff"
      )
      .populate(
        "personalityTestScheduleId",
        "testType startTime endTime resultDeclarationDate cutoff"
      );

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

// ================= GET APPLICATIONS BY VACANCY =================
exports.getApplicationsByVacancy = async (req, res) => {
  try {
    const { vacancyId } = req.params;

    const applications = await Application.find({ vacancyId })
      .sort({ createdAt: -1 })
      .populate("userId", "name email phone")
      .populate("profileId")
      .populate("vacancyId", "title department status");

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================= UPDATE VERIFICATION =================
exports.updateVerification = async (req, res) => {
  try {
    const { verificationStatus, verificationReason = "" } = req.body;

    if (!["PENDING", "ELIGIBLE", "REVIEW", "REJECTED"].includes(verificationStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification status",
      });
    }

    let currentStage = "VERIFICATION_PENDING";
    let technicalTestStatus = "NOT_ASSIGNED";

    if (verificationStatus === "ELIGIBLE") {
      currentStage = "VERIFICATION_ELIGIBLE";
    }

    if (verificationStatus === "REVIEW") {
      currentStage = "VERIFICATION_REVIEW";
    }

    if (verificationStatus === "REJECTED") {
      currentStage = "VERIFICATION_REJECTED";
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      {
        verificationStatus,
        verificationReason,
        currentStage,
        technicalTestStatus,
        $push: {
          timeline: {
            stage: currentStage,
            note: `Verification status updated to ${verificationStatus}`,
            date: new Date(),
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Verification updated successfully",
      application,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================= UPDATE TECHNICAL RESULT =================
exports.updateTechnicalResult = async (req, res) => {
  try {
    const { technicalScore, technicalRemarks = "" } = req.body;

    const status = Number(technicalScore) >= 60 ? "SHORTLISTED" : "REJECTED";

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      {
        technicalScore,
        technicalRemarks,
        technicalTestStatus: status,
        currentStage: status === "SHORTLISTED" ? "PERSONALITY" : "COMPLETED",
        personalityTestStatus: status === "SHORTLISTED" ? "ASSIGNED" : "NOT_ASSIGNED",
        $push: {
          timeline: {
            stage: "TECHNICAL",
            note: `Technical result updated. Score: ${technicalScore}`,
            date: new Date(),
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Technical result updated successfully",
      application,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================= UPDATE FINAL RESULT =================
exports.updateFinalResult = async (req, res) => {
  try {
    const {
      personalityScore = 0,
      finalStatus,
      finalRemarks = "",
      finalReason = "",
    } = req.body;

    if (!["SELECTED", "REJECTED", "WAITLISTED", "HOLD", "RECOMMENDED"].includes(finalStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid final status",
      });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const technical = Number(application.technicalScore || 0);
    const personality = Number(personalityScore || 0);
    const verification = Number(application.verificationScore || 0);

    const overallScore = technical * 0.6 + personality * 0.3 + verification * 0.1;

    application.personalityScore = personality;
    application.personalityTestStatus = "SUBMITTED";
    application.finalStatus = finalStatus;
    application.finalRemarks = finalRemarks;
    application.finalReason = finalReason;
    application.overallScore = overallScore;
    application.currentStage = "COMPLETED";

    application.timeline.push({
      stage: "FINAL_REVIEW",
      note: `Final result updated to ${finalStatus}`,
      date: new Date(),
    });

    await application.save();

    res.status(200).json({
      success: true,
      message: "Final result updated successfully",
      application,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================= SHORTLIST CANDIDATES =================
exports.shortlistCandidates = async (req, res) => {
  try {
    const { vacancyId, criteria = {} } = req.body;

    const minTechnicalScore = Number(criteria.minTechnicalScore || 60);

    const applications = await Application.find({ vacancyId });

    const updated = [];

    for (const app of applications) {
      if (
        app.verificationStatus === "ELIGIBLE" &&
        Number(app.technicalScore || 0) >= minTechnicalScore
      ) {
        app.technicalTestStatus = "SHORTLISTED";
        app.currentStage = "PERSONALITY";
        app.personalityTestStatus = "ASSIGNED";

        app.timeline.push({
          stage: "SHORTLISTING",
          note: "Candidate shortlisted for personality stage",
          date: new Date(),
        });

        await app.save();
        updated.push(app);
      }
    }

    res.status(200).json({
      success: true,
      message: "Shortlisting completed",
      count: updated.length,
      shortlisted: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================= GENERATE MERIT LIST =================
exports.generateMeritList = async (req, res) => {
  try {
    const { vacancyId } = req.body;

    const applications = await Application.find({ vacancyId })
      .populate("userId", "name email phone")
      .populate("profileId")
      .sort({ overallScore: -1, technicalScore: -1 });

    const meritList = applications
      .filter((app) =>
        ["SELECTED", "WAITLISTED", "RECOMMENDED"].includes(app.finalStatus)
      )
      .map((app, index) => ({
        rank: index + 1,
        applicationId: app.applicationId,
        candidateName: app.profileId?.fullName || app.userId?.name || "Candidate",
        email: app.userId?.email,
        technicalScore: app.technicalScore || 0,
        personalityScore: app.personalityScore || 0,
        overallScore: app.overallScore || 0,
        finalStatus: app.finalStatus,
      }));

    res.status(200).json({
      success: true,
      count: meritList.length,
      meritList,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};