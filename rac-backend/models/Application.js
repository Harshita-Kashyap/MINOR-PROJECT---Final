const mongoose = require("mongoose");

const APPLICATION_STAGES = [
  "APPLIED",

  "VERIFICATION_PENDING",
  "VERIFICATION_ELIGIBLE",
  "VERIFICATION_REVIEW",
  "VERIFICATION_REJECTED",

  "TECHNICAL_TEST_ASSIGNED",
  "TECHNICAL_TEST_IN_PROGRESS",
  "TECHNICAL_TEST_SUBMITTED",
  "TECHNICAL_QUALIFIED",
  "TECHNICAL_REJECTED",

  "PERSONALITY_TEST_ASSIGNED",
  "PERSONALITY_TEST_IN_PROGRESS",
  "PERSONALITY_TEST_SUBMITTED",

  "FINAL_REVIEW",
  "SELECTED",
  "WAITLISTED",
  "FINAL_REJECTED",
];

const applicationSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      trim: true,
      unique: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ApplicantProfile",
      required: true,
    },

    vacancyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vacancy",
      required: true,
      index: true,
    },

    vacancyTitle: {
      type: String,
      trim: true,
      default: "",
    },

    department: {
      type: String,
      trim: true,
      default: "DRDO RAC",
    },

    cid: {
      type: String,
      trim: true,
      default: "",
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },

    currentStage: {
      type: String,
      enum: APPLICATION_STAGES,
      default: "APPLIED",
      index: true,
    },

    verificationStatus: {
      type: String,
      enum: ["PENDING", "ELIGIBLE", "REVIEW", "REJECTED"],
      default: "PENDING",
      index: true,
    },

    verificationScore: {
      type: Number,
      default: 0,
      min: 0,
    },

    verificationReason: {
      type: String,
      trim: true,
      default: "",
    },

    technicalTestStatus: {
      type: String,
      enum: [
        "NOT_ASSIGNED",
        "ASSIGNED",
        "IN_PROGRESS",
        "SUBMITTED",
        "QUALIFIED",
        "REJECTED",
      ],
      default: "NOT_ASSIGNED",
      index: true,
    },

    technicalScore: {
      type: Number,
      default: null,
      min: 0,
    },

    technicalCutoff: {
      type: Number,
      default: null,
      min: 0,
    },

    technicalRemarks: {
      type: String,
      trim: true,
      default: "",
    },

    technicalTestScheduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestSchedule",
      default: null,
    },

    personalityTestStatus: {
      type: String,
      enum: ["NOT_ASSIGNED", "ASSIGNED", "IN_PROGRESS", "SUBMITTED"],
      default: "NOT_ASSIGNED",
      index: true,
    },

    personalityScore: {
      type: Number,
      default: null,
      min: 0,
    },

    personalityRemarks: {
      type: String,
      trim: true,
      default: "",
    },

    personalityTestScheduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestSchedule",
      default: null,
    },

    overallScore: {
      type: Number,
      default: 0,
      min: 0,
    },

    finalStatus: {
      type: String,
      enum: ["NOT_DECIDED", "SELECTED", "WAITLISTED", "REJECTED"],
      default: "NOT_DECIDED",
      index: true,
    },

    finalReason: {
      type: String,
      trim: true,
      default: "",
    },

    finalRemarks: {
      type: String,
      trim: true,
      default: "",
    },

    selectorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    selectorDecisionAt: {
      type: Date,
      default: null,
    },

    timeline: [
      {
        stage: {
          type: String,
          trim: true,
          default: "",
        },
        note: {
          type: String,
          trim: true,
          default: "",
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

applicationSchema.index({ userId: 1, vacancyId: 1 }, { unique: true });
applicationSchema.index({ vacancyId: 1, currentStage: 1 });
applicationSchema.index({ vacancyId: 1, verificationStatus: 1 });
applicationSchema.index({ vacancyId: 1, finalStatus: 1 });

applicationSchema.pre("save", function (next) {
  if (!this.applicationId) {
    this.applicationId = `APP-${Date.now()}-${Math.floor(
      Math.random() * 10000
    )}`;
  }
  next();
});

const Application =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);

module.exports = Application;