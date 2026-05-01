const Application = require("../models/Application");
const QuestionPaper = require("../models/QuestionPaper");
const TestSubmission = require("../models/TestSubmission");

exports.getTechnicalTestForApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId)
      .populate("vacancyId", "title department")
      .populate(
        "technicalTestScheduleId",
        "testType startTime endTime resultDeclarationDate cutoff"
      );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    if (application.currentStage !== "TECHNICAL_TEST_ASSIGNED") {
      return res.status(403).json({
        success: false,
        message: "Technical test is not assigned yet",
      });
    }

    if (!application.technicalTestScheduleId) {
      return res.status(400).json({
        success: false,
        message: "Technical test schedule not found",
      });
    }

    const now = new Date();
    const start = new Date(application.technicalTestScheduleId.startTime);
    const end = new Date(application.technicalTestScheduleId.endTime);

    let accessStatus = "ACTIVE";

    if (now < start) {
      accessStatus = "NOT_STARTED";
    }

    if (now > end) {
      accessStatus = "EXPIRED";
    }

    const paper = await QuestionPaper.findOne({
      vacancyId: application.vacancyId._id,
      testType: "TECHNICAL",
    });

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Question paper not found for this vacancy",
      });
    }

    const safeQuestions = paper.questions.map((q) => ({
      _id: q._id,
      question: q.question,
      options: q.options,
      marks: q.marks,
    }));

    return res.status(200).json({
      success: true,
      accessStatus,
      application,
      schedule: application.technicalTestScheduleId,
      paper: {
        _id: paper._id,
        title: paper.title,
        durationMinutes: paper.durationMinutes,
        questions: safeQuestions,
      },
    });
  } catch (err) {
    console.error("GET TECHNICAL TEST ERROR:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.submitTechnicalTest = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { answers = [] } = req.body;

    const application = await Application.findById(applicationId).populate(
      "technicalTestScheduleId",
      "startTime endTime"
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    if (application.currentStage !== "TECHNICAL_TEST_ASSIGNED") {
      return res.status(400).json({
        success: false,
        message: "Technical test is not currently assigned",
      });
    }

    if (!application.technicalTestScheduleId) {
      return res.status(400).json({
        success: false,
        message: "Technical test schedule not found",
      });
    }

    const now = new Date();
    const start = new Date(application.technicalTestScheduleId.startTime);
    const end = new Date(application.technicalTestScheduleId.endTime);

    if (now < start) {
      return res.status(400).json({
        success: false,
        message: "Technical test has not started yet",
      });
    }

    if (now > end) {
      return res.status(400).json({
        success: false,
        message: "Technical test window has closed",
      });
    }

    const existingSubmission = await TestSubmission.findOne({
      applicationId,
      testType: "TECHNICAL",
    });

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: "Technical test already submitted",
      });
    }

    const paper = await QuestionPaper.findOne({
      vacancyId: application.vacancyId,
      testType: "TECHNICAL",
    });

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Question paper not found",
      });
    }

    const answerMap = new Map();

    answers.forEach((item) => {
      answerMap.set(String(item.questionId), item.selectedAnswer);
    });

    let score = 0;
    let totalMarks = 0;

    const evaluatedAnswers = paper.questions.map((q) => {
      const selectedAnswer = answerMap.get(String(q._id)) || "";
      const isCorrect = selectedAnswer === q.correctAnswer;
      const marksAwarded = isCorrect ? q.marks : 0;

      score += marksAwarded;
      totalMarks += q.marks;

      return {
        questionId: q._id,
        question: q.question,
        selectedAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        marksAwarded,
      };
    });

    const percentage = totalMarks ? (score / totalMarks) * 100 : 0;

    const submission = await TestSubmission.create({
      applicationId: application._id,
      vacancyId: application.vacancyId,
      applicantId: application.userId,
      questionPaperId: paper._id,
      testType: "TECHNICAL",
      answers: evaluatedAnswers,
      totalQuestions: paper.questions.length,
      totalMarks,
      score,
      percentage,
      finalScore: score,
      submittedAt: new Date(),
    });

    application.currentStage = "TECHNICAL_TEST_SUBMITTED";
    application.technicalTestStatus = "SUBMITTED";
    application.technicalScore = score;
    application.technicalRemarks = `Technical test submitted. Score: ${score}/${totalMarks}`;

    application.timeline.push({
      stage: "TECHNICAL_TEST_SUBMITTED",
      note: `Technical test submitted with score ${score}/${totalMarks}.`,
      date: new Date(),
    });

    await application.save();

    return res.status(201).json({
      success: true,
      message: "Technical test submitted successfully",
      score,
      totalMarks,
      percentage,
      submissionId: submission._id,
    });
  } catch (err) {
    console.error("SUBMIT TECHNICAL TEST ERROR:", err);

    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Technical test already submitted",
      });
    }

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getPersonalityTestForApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId)
      .populate("vacancyId", "title department")
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

    if (application.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    if (application.currentStage !== "PERSONALITY_TEST_ASSIGNED") {
      return res.status(403).json({
        success: false,
        message: "Personality test is not assigned yet",
      });
    }

    if (!application.personalityTestScheduleId) {
      return res.status(400).json({
        success: false,
        message: "Personality test schedule not found",
      });
    }

    const now = new Date();
    const start = new Date(application.personalityTestScheduleId.startTime);
    const end = new Date(application.personalityTestScheduleId.endTime);

    let accessStatus = "ACTIVE";

    if (now < start) accessStatus = "NOT_STARTED";
    if (now > end) accessStatus = "EXPIRED";

    const paper = await QuestionPaper.findOne({
      testType: "PERSONALITY",
      isCommon: true,
    });

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Common personality question paper not found",
      });
    }

    const safeQuestions = paper.questions.map((q) => ({
      _id: q._id,
      question: q.question,
      options: q.options,
      marks: q.marks,
    }));

    return res.status(200).json({
      success: true,
      accessStatus,
      application,
      schedule: application.personalityTestScheduleId,
      paper: {
        _id: paper._id,
        title: paper.title,
        durationMinutes: paper.durationMinutes,
        questions: safeQuestions,
      },
    });
  } catch (err) {
    console.error("GET PERSONALITY TEST ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.submitPersonalityTest = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { answers = [] } = req.body;

    const application = await Application.findById(applicationId).populate(
      "personalityTestScheduleId",
      "startTime endTime"
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    if (application.currentStage !== "PERSONALITY_TEST_ASSIGNED") {
      return res.status(400).json({
        success: false,
        message: "Personality test is not currently assigned",
      });
    }

    if (!application.personalityTestScheduleId) {
      return res.status(400).json({
        success: false,
        message: "Personality test schedule not found",
      });
    }

    const now = new Date();
    const start = new Date(application.personalityTestScheduleId.startTime);
    const end = new Date(application.personalityTestScheduleId.endTime);

    if (now < start) {
      return res.status(400).json({
        success: false,
        message: "Personality test has not started yet",
      });
    }

    if (now > end) {
      return res.status(400).json({
        success: false,
        message: "Personality test window has closed",
      });
    }

    const existingSubmission = await TestSubmission.findOne({
      applicationId,
      testType: "PERSONALITY",
    });

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: "Personality test already submitted",
      });
    }

    const paper = await QuestionPaper.findOne({
      testType: "PERSONALITY",
      isCommon: true,
    });

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Common personality question paper not found",
      });
    }

    const answerMap = new Map();

    answers.forEach((item) => {
      answerMap.set(String(item.questionId), item.selectedAnswer);
    });

    let score = 0;
    let totalMarks = 0;

    const evaluatedAnswers = paper.questions.map((q) => {
      const selectedAnswer = answerMap.get(String(q._id)) || "";
      const isCorrect = selectedAnswer === q.correctAnswer;
      const marksAwarded = isCorrect ? q.marks : 0;

      score += marksAwarded;
      totalMarks += q.marks;

      return {
        questionId: q._id,
        question: q.question,
        selectedAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        marksAwarded,
      };
    });

    const percentage = totalMarks ? (score / totalMarks) * 100 : 0;

    const submission = await TestSubmission.create({
      applicationId: application._id,
      vacancyId: application.vacancyId,
      applicantId: application.userId,
      questionPaperId: paper._id,
      testType: "PERSONALITY",
      answers: evaluatedAnswers,
      totalQuestions: paper.questions.length,
      totalMarks,
      score,
      percentage,
      finalScore: score,
      submittedAt: new Date(),
    });

    application.currentStage = "FINAL_REVIEW";
    application.personalityTestStatus = "SUBMITTED";
    application.personalityScore = score;
    application.personalityRemarks = `Personality test submitted. Score: ${score}/${totalMarks}`;

    application.overallScore =
      Number(application.technicalScore || 0) + Number(score || 0);

    application.finalStatus = "PENDING";

    application.timeline.push({
      stage: "PERSONALITY_TEST_SUBMITTED",
      note: `Personality test submitted with score ${score}/${totalMarks}.`,
      date: new Date(),
    });

    application.timeline.push({
      stage: "FINAL_REVIEW",
      note: "Application moved to final review after personality test.",
      date: new Date(),
    });

    await application.save();

    return res.status(201).json({
      success: true,
      message: "Personality test submitted successfully",
      score,
      totalMarks,
      percentage,
      overallScore: application.overallScore,
      submissionId: submission._id,
    });
  } catch (err) {
    console.error("SUBMIT PERSONALITY TEST ERROR:", err);

    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Personality test already submitted",
      });
    }

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};