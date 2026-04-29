const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    selectedAnswer: {
      type: String,
      default: "",
    },

    correctAnswer: {
      type: String,
      required: true,
    },

    isCorrect: {
      type: Boolean,
      default: false,
    },

    marksAwarded: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const testSubmissionSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },

    vacancyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vacancy",
      required: true,
    },

    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    questionPaperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestionPaper",
      required: true,
    },

    testType: {
      type: String,
      enum: ["TECHNICAL", "PERSONALITY"],
      required: true,
    },

    answers: [answerSchema],

    totalQuestions: {
      type: Number,
      default: 0,
    },

    totalMarks: {
      type: Number,
      default: 0,
    },

    score: {
      type: Number,
      default: 0,
    },

    percentage: {
      type: Number,
      default: 0,
    },

    warningCount: {
      type: Number,
      default: 0,
    },

    penaltyMarks: {
      type: Number,
      default: 0,
    },

    finalScore: {
      type: Number,
      default: 0,
    },

    disqualified: {
      type: Boolean,
      default: false,
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// one submission per application per test type
testSubmissionSchema.index(
  { applicationId: 1, testType: 1 },
  { unique: true }
);

module.exports =
  mongoose.models.TestSubmission ||
  mongoose.model("TestSubmission", testSubmissionSchema);