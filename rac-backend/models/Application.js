// models/Application.js

const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      trim: true,
      unique: true,
    },

    // Applicant reference
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Applicant profile reference
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ApplicantProfile",
      required: true,
    },

    // Vacancy reference
    vacancyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vacancy",
      required: true,
    },

    // Helpful denormalized fields for dashboard/listing
    vacancyTitle: {
      type: String,
      trim: true,
      default: "",
    },

    department: {
      type: String,
      trim: true,
      default: "",
    },

    // Optional RAC candidate/application label
    cid: {
      type: String,
      trim: true,
      default: "",
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },

    // Overall workflow stage
    currentStage: {
      type: String,
      enum: [
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
      ],
      default: "APPLIED",
    },

    // Verification stage
    verificationStatus: {
      type: String,
      enum: ["PENDING", "ELIGIBLE", "REVIEW", "REJECTED"],
      default: "PENDING",
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

    // Technical stage
    technicalTestStatus: {
      type: String,
      enum: ["NOT_ASSIGNED", "ASSIGNED", "IN_PROGRESS", "SUBMITTED", "SHORTLISTED", "REJECTED"],
      default: "NOT_ASSIGNED",
    },

    technicalScore: {
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



    // Personality stage
    personalityTestStatus: {
      type: String,
      enum: ["NOT_ASSIGNED", "ASSIGNED", "IN_PROGRESS", "SUBMITTED"],
      default: "NOT_ASSIGNED",
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

    // Final evaluation
    overallScore: {
      type: Number,
      default: 0,
      min: 0,
    },

    finalStatus: {
      type: String,
      enum: [
        "NOT_DECIDED",
        "PENDING",
        "RECOMMENDED",
        "SELECTED",
        "REJECTED",
        "HOLD",
        "WAITLISTED",
      ],
      default: "NOT_DECIDED",
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

    // Selector-side decision metadata
    selectorDecision: {
      type: String,
      enum: ["PENDING", "RECOMMENDED", "HOLD", "NOT_RECOMMENDED", "WAITLISTED"],
      default: "PENDING",
    },

    selectorRemarks: {
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

    // Timeline / audit trail
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
  {
    timestamps: true,
  }
);

// Prevent duplicate applications for same applicant on same vacancy
applicationSchema.index({ userId: 1, vacancyId: 1 }, { unique: true });

// Safe model export
const Application =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);

module.exports = Application;