// selectorController

const Application = require("../models/Application");

// ========================
// 📊 DASHBOARD
// ========================
exports.getSelectorDashboard = async (req, res) => {
  try {
    const stats = {
      total: await Application.countDocuments(),

      finalReview: await Application.countDocuments({
        currentStage: "FINAL_REVIEW",
      }),

      recommended: await Application.countDocuments({
        finalStatus: { $in: ["RECOMMENDED", "SELECTED"] },
      }),

      rejected: await Application.countDocuments({
        finalStatus: "REJECTED",
      }),

      hold: await Application.countDocuments({
        finalStatus: "HOLD",
      }),

      waitlisted: await Application.countDocuments({
        finalStatus: "WAITLISTED",
      }),
    };

    const recentCandidates = await Application.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "name email phone")
      .populate("vacancyId", "title department");

    return res.status(200).json({
      success: true,
      stats,
      recentCandidates,
    });
  } catch (error) {
    console.error("❌ Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// 📋 CANDIDATES LIST
// ========================
exports.getSelectorCandidates = async (req, res) => {
  try {
    const candidates = await Application.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email phone")
      .populate("vacancyId", "title department")
      .select(
        "applicationId cid currentStage verificationStatus technicalScore personalityScore overallScore finalStatus appliedAt createdAt userId vacancyId"
      );

    return res.status(200).json({
      success: true,
      count: candidates.length,
      candidates,
    });
  } catch (error) {
    console.error("❌ Candidates Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// 👤 CANDIDATE DETAIL
// ========================
exports.getSelectorCandidateById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("userId", "name email phone role")
      .populate("profileId")
      .populate("vacancyId", "title department status");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    return res.status(200).json({
      success: true,
      candidate: application,
    });
  } catch (error) {
    console.error("❌ Candidate Detail Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// 📈 ANALYTICS
// ========================
exports.getSelectorAnalytics = async (req, res) => {
  try {
    const total = await Application.countDocuments();

    const avgTechnical = await Application.aggregate([
      { $match: { technicalScore: { $ne: null } } },
      { $group: { _id: null, avg: { $avg: "$technicalScore" } } },
    ]);

    const avgPersonality = await Application.aggregate([
      { $match: { personalityScore: { $ne: null } } },
      { $group: { _id: null, avg: { $avg: "$personalityScore" } } },
    ]);

    const stageCounts = await Application.aggregate([
      {
        $group: {
          _id: "$currentStage",
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const finalStatusCounts = await Application.aggregate([
      {
        $group: {
          _id: "$finalStatus",
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return res.status(200).json({
      success: true,
      summary: {
        totalCandidates: total,
        avgTechnicalScore: avgTechnical[0]?.avg || 0,
        avgPersonalityScore: avgPersonality[0]?.avg || 0,
        stageCounts,
        finalStatusCounts,
      },
    });
  } catch (error) {
    console.error("❌ Analytics Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// 🧑‍⚖️ SUBMIT EVALUATION
// ========================
exports.submitSelectorEvaluation = async (req, res) => {
  try {
    const { applicationId, decision, remarks = "" } = req.body;

    if (!applicationId || !decision) {
      return res.status(400).json({
        success: false,
        message: "applicationId and decision are required",
      });
    }

    const allowedDecisions = [
      "RECOMMENDED",
      "HOLD",
      "WAITLISTED",
      "NOT_RECOMMENDED",
    ];

    if (!allowedDecisions.includes(decision)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid decision. Allowed values: RECOMMENDED, HOLD, WAITLISTED, NOT_RECOMMENDED",
      });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // compute overall score if not already updated
    const verification = application.verificationScore || 0;
    const technical = application.technicalScore || 0;
    const personality = application.personalityScore || 0;

    application.overallScore = verification + technical + personality;

    // selector metadata
    application.selectorDecision = decision;
    application.selectorRemarks = remarks;
    application.selectorId = req.user?.id || null;
    application.selectorDecisionAt = new Date();

    // final status mapping
    if (decision === "NOT_RECOMMENDED") {
      application.finalStatus = "REJECTED";
      application.finalReason = remarks || "Not recommended by selector";
    } else {
      application.finalStatus = decision;
      application.finalReason = remarks || "";
    }

    application.finalRemarks = remarks;
    application.currentStage = "COMPLETED";

    // timeline entry
    application.timeline.push({
      stage: "COMPLETED",
      note: `Selector decision submitted: ${decision}${remarks ? ` - ${remarks}` : ""}`,
      date: new Date(),
    });

    await application.save();

    const updatedApplication = await Application.findById(applicationId)
      .populate("userId", "name email phone")
      .populate("vacancyId", "title department");

    return res.status(200).json({
      success: true,
      message: "Evaluation submitted successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("❌ Evaluation Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};