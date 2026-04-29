// models/QuestionPaper.js

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (options) {
          return Array.isArray(options) && options.length >= 2;
        },
        message: "At least 2 options are required",
      },
    },

    correctAnswer: {
      type: String,
      required: true,
      trim: true,
    },

    marks: {
      type: Number,
      default: 1,
      min: 1,
    },

    difficulty: {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD"],
      default: "MEDIUM",
    },
  },
  { _id: true }
);

const questionPaperSchema = new mongoose.Schema(
  {
    vacancyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vacancy",
      default: null,
    },

    testType: {
      type: String,
      enum: ["TECHNICAL", "PERSONALITY"],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    durationMinutes: {
      type: Number,
      required: true,
      min: 1,
    },

    isCommon: {
      type: Boolean,
      default: false,
    },

    totalMarks: {
      type: Number,
      default: 30,
      min: 1,
    },

    questions: {
      type: [questionSchema],
      required: true,
      validate: {
        validator: function (questions) {
          return Array.isArray(questions) && questions.length === 30;
        },
        message: "Question paper must contain exactly 30 questions",
      },
    },
  },
  { timestamps: true }
);

// ✅ Rule 1: Technical paper must belong to one vacancy
questionPaperSchema.pre("validate", function (next) {
  if (this.testType === "TECHNICAL" && !this.vacancyId) {
    return next(new Error("Technical question paper must have a vacancyId"));
  }

  if (this.testType === "TECHNICAL" && this.isCommon) {
    return next(new Error("Technical question paper cannot be common"));
  }

  if (this.testType === "PERSONALITY" && !this.isCommon) {
    return next(new Error("Personality question paper must be common"));
  }

  if (this.testType === "PERSONALITY" && this.vacancyId) {
    return next(new Error("Common personality paper should not have vacancyId"));
  }

  next();
});

// ✅ Rule 2: totalMarks should match question marks
questionPaperSchema.pre("save", function (next) {
  this.totalMarks = this.questions.reduce(
    (sum, question) => sum + Number(question.marks || 0),
    0
  );

  next();
});

// ✅ One technical paper per vacancy
questionPaperSchema.index(
  { vacancyId: 1, testType: 1 },
  {
    unique: true,
    partialFilterExpression: {
      vacancyId: { $type: "objectId" },
      testType: "TECHNICAL",
    },
  }
);

// ✅ One common personality paper
questionPaperSchema.index(
  { testType: 1, isCommon: 1 },
  {
    unique: true,
    partialFilterExpression: {
      testType: "PERSONALITY",
      isCommon: true,
    },
  }
);

module.exports =
  mongoose.models.QuestionPaper ||
  mongoose.model("QuestionPaper", questionPaperSchema);