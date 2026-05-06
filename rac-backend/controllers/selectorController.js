// selectorController

const Application = require("../models/Application");
const Vacancy = require("../models/Vacancy");
const TestSchedule = require("../models/TestSchedule");
const TestSubmission = require("../models/TestSubmission");

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

    if (decision === "RECOMMENDED") {
      application.currentStage = "SELECTED";
      application.finalStatus = "SELECTED";
      application.finalReason = remarks || "Recommended by selector";
    } else if (decision === "WAITLISTED") {
      application.currentStage = "WAITLISTED";
      application.finalStatus = "WAITLISTED";
      application.finalReason = remarks || "Waitlisted by selector";
    } else if (decision === "HOLD") {
      application.currentStage = "FINAL_REVIEW";
      application.finalStatus = "HOLD";
      application.finalReason = remarks || "Kept on hold by selector";
    } else if (decision === "NOT_RECOMMENDED") {
      application.currentStage = "FINAL_REJECTED";
      application.finalStatus = "REJECTED";
      application.finalReason = remarks || "Not recommended by selector";
    }

    application.finalRemarks = remarks;

    application.timeline.push({
      stage: application.currentStage,
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

// ========================
// 🗓️ SCHEDULE TECHNICAL TEST
// ========================
exports.scheduleTechnicalTest = async (req, res) => {
  try {
    const {
      vacancyId,
      startTime,
      endTime,
      resultDeclarationDate = null,
    } = req.body;

    if (!vacancyId || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "vacancyId, startTime and endTime are required",
      });
    }

    const vacancy = await Vacancy.findById(vacancyId);

    if (!vacancy) {
      return res.status(404).json({
        success: false,
        message: "Vacancy not found",
      });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid startTime or endTime",
      });
    }

    if (end <= start) {
      return res.status(400).json({
        success: false,
        message: "End time must be after start time",
      });
    }

    const schedule = await TestSchedule.create({
      vacancyId,
      testType: "TECHNICAL",
      startTime: start,
      endTime: end,
      resultDeclarationDate: resultDeclarationDate
        ? new Date(resultDeclarationDate)
        : null,
      createdBy: req.user?.id || null,
    });

    const result = await Application.updateMany(
      {
        vacancyId,
        currentStage: "VERIFICATION_ELIGIBLE",
        verificationStatus: "ELIGIBLE",
        technicalTestStatus: "NOT_ASSIGNED",
      },
      {
        $set: {
          currentStage: "TECHNICAL_TEST_ASSIGNED",
          technicalTestStatus: "ASSIGNED",
          technicalTestScheduleId: schedule._id,
        },
        $push: {
          timeline: {
            stage: "TECHNICAL_TEST_ASSIGNED",
            note: "Technical test assigned by selector.",
            date: new Date(),
          },
        },
      }
    );

    return res.status(201).json({
      success: true,
      message: "Technical test scheduled and assigned successfully",
      schedule,
      assignedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("❌ Schedule Technical Test Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// 📊 TECHNICAL RESULTS BY VACANCY
// ========================
exports.getTechnicalResultsByVacancy = async (req, res) => {
  try {
    const { vacancyId } = req.params;

    const submissions = await TestSubmission.find({
      vacancyId,
      testType: "TECHNICAL",
    })
      .sort({ finalScore: -1, submittedAt: 1 })
      .populate("applicantId", "name email phone")
      .populate("applicationId", "applicationId currentStage technicalScore technicalTestStatus")
      .populate("vacancyId", "title department");

    const scores = submissions.map((s) => Number(s.finalScore || 0));

    const highest = scores.length ? Math.max(...scores) : 0;
    const lowest = scores.length ? Math.min(...scores) : 0;
    const average = scores.length
      ? scores.reduce((sum, score) => sum + score, 0) / scores.length
      : 0;

    return res.status(200).json({
      success: true,
      count: submissions.length,
      analytics: {
        totalSubmitted: submissions.length,
        highest,
        lowest,
        average: Number(average.toFixed(2)),
      },
      results: submissions,
    });
  } catch (error) {
    console.error("❌ Technical Results Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// 🎯 SET TECHNICAL CUTOFF
// ========================
exports.setTechnicalCutoff = async (req, res) => {
  try {
    const { vacancyId, cutoff } = req.body;

    if (!vacancyId || cutoff === undefined || cutoff === null) {
      return res.status(400).json({
        success: false,
        message: "vacancyId and cutoff are required",
      });
    }

    const numericCutoff = Number(cutoff);

    if (Number.isNaN(numericCutoff) || numericCutoff < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid cutoff value",
      });
    }

    const submissions = await TestSubmission.find({
      vacancyId,
      testType: "TECHNICAL",
    });

    let qualifiedCount = 0;
    let rejectedCount = 0;

    for (const submission of submissions) {
      const application = await Application.findById(submission.applicationId);

      if (!application) continue;

      if (Number(submission.finalScore || 0) >= numericCutoff) {
        application.currentStage = "TECHNICAL_QUALIFIED";
        application.technicalTestStatus = "QUALIFIED";
        application.technicalScore = Number(submission.finalScore || 0);
        application.technicalCutoff = numericCutoff;
        application.technicalRemarks = `Qualified technical cutoff. Score: ${submission.finalScore}, Cutoff: ${numericCutoff}`;
        qualifiedCount++;
      } else {
        application.currentStage = "TECHNICAL_REJECTED";
        application.technicalTestStatus = "REJECTED";
        application.technicalScore = Number(submission.finalScore || 0);
        application.technicalCutoff = numericCutoff;
        application.technicalRemarks = `Did not meet technical cutoff. Score: ${submission.finalScore}, Cutoff: ${numericCutoff}`;
        rejectedCount++;
      }

      application.timeline.push({
        stage: application.currentStage,
        note: application.technicalRemarks,
        date: new Date(),
      });

      await application.save();
    }

    await TestSchedule.findOneAndUpdate(
      {
        vacancyId,
        testType: "TECHNICAL",
      },
      {
        cutoff: numericCutoff,
      },
      {
        sort: { createdAt: -1 },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Technical cutoff applied successfully",
      cutoff: numericCutoff,
      qualifiedCount,
      rejectedCount,
    });
  } catch (error) {
    console.error("❌ Set Cutoff Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// 🗓️ SCHEDULE PERSONALITY TEST
// ========================
exports.schedulePersonalityTest = async (req, res) => {
  try {
    const {
      vacancyId,
      startTime,
      endTime,
      resultDeclarationDate = null,
    } = req.body;

    if (!vacancyId || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "vacancyId, startTime and endTime are required",
      });
    }

    const vacancy = await Vacancy.findById(vacancyId);

    if (!vacancy) {
      return res.status(404).json({
        success: false,
        message: "Vacancy not found",
      });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid startTime or endTime",
      });
    }

    if (end <= start) {
      return res.status(400).json({
        success: false,
        message: "End time must be after start time",
      });
    }

    const schedule = await TestSchedule.create({
      vacancyId,
      testType: "PERSONALITY",
      startTime: start,
      endTime: end,
      resultDeclarationDate: resultDeclarationDate
        ? new Date(resultDeclarationDate)
        : null,
      createdBy: req.user?.id || null,
    });

    const result = await Application.updateMany(
      {
        vacancyId,
        currentStage: "TECHNICAL_QUALIFIED",
        technicalTestStatus: "QUALIFIED",
      },
      {
        $set: {
          currentStage: "PERSONALITY_TEST_ASSIGNED",
          personalityTestStatus: "ASSIGNED",
          personalityTestScheduleId: schedule._id,
        },
        $push: {
          timeline: {
            stage: "PERSONALITY_TEST_ASSIGNED",
            note: "Personality test assigned by selector.",
            date: new Date(),
          },
        },
      }
    );

    return res.status(201).json({
      success: true,
      message: "Personality test scheduled and assigned successfully",
      schedule,
      assignedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("❌ Schedule Personality Test Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};