const mongoose = require("mongoose");

const vacancySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      default: "DRDO RAC",
      trim: true,
    },

    advertisementNo: {
      type: String,
      trim: true,
      default: "",
      index: true,
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    mode: {
      type: String,
      trim: true,
      default: "Online Application",
    },

    totalPosts: {
      type: Number,
      default: 0,
      min: 0,
    },

    description: {
      type: String,
      default: "",
    },

    eligibility: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    deadline: {
      type: Date,
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["DRAFT", "OPEN", "CLOSED"],
      default: "DRAFT",
      index: true,
    },

    discipline: {
      type: String,
      trim: true,
      default: "",
    },

    examTypeRequired: {
      type: String,
      enum: ["", "GATE", "NET", "NONE"],
      default: "",
    },

    minGraduationPercentage: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
    },

    minTwelfthPercentage: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
    },

    minTenthPercentage: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
    },

    minGateScore: {
      type: Number,
      default: null,
      min: 0,
    },

    allowedCategories: [
      {
        type: String,
        trim: true,
      },
    ],

    workflowStages: {
      type: [
        {
          stage: {
            type: String,
            trim: true,
          },
          label: {
            type: String,
            trim: true,
          },
          order: {
            type: Number,
          },
        },
      ],
      default: [
        {
          stage: "APPLICATION",
          label: "Application Submission",
          order: 1,
        },
        {
          stage: "VERIFICATION",
          label: "Automatic Eligibility Verification",
          order: 2,
        },
        {
          stage: "TECHNICAL_TEST",
          label: "Technical Test",
          order: 3,
        },
        {
          stage: "PERSONALITY_TEST",
          label: "Personality Test",
          order: 4,
        },
        {
          stage: "FINAL_DECISION",
          label: "Final Decision",
          order: 5,
        },
      ],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

vacancySchema.index({ title: "text", department: "text", discipline: "text" });

const Vacancy =
  mongoose.models.Vacancy || mongoose.model("Vacancy", vacancySchema);

module.exports = Vacancy;