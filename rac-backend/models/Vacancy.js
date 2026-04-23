// models/vacancy.js

const mongoose = require("mongoose");

const vacancySchema = new mongoose.Schema(
  {
    // 🧾 BASIC DETAILS
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
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    mode: {
      type: String,
      trim: true,
      default: "",
    },

    totalPosts: {
      type: Number,
      default: 0,
      min: 0,
    },

    // 📄 DESCRIPTION
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

    // ⏳ DEADLINE
    deadline: {
      type: Date,
    },

    // 📊 STATUS
    status: {
      type: String,
      enum: ["OPEN", "CLOSED", "DRAFT"],
      default: "DRAFT",
    },

    // 🎓 ELIGIBILITY RULES
    discipline: {
      type: String,
      trim: true,
      default: "",
    },

    examTypeRequired: {
      type: String,
      trim: true,
      default: "",
    },

    minGraduationPercentage: {
      type: Number,
      default: null,
    },

    minTwelfthPercentage: {
      type: Number,
      default: null,
    },

    minTenthPercentage: {
      type: Number,
      default: null,
    },

    minGateScore: {
      type: Number,
      default: null,
    },

    allowedCategories: [
      {
        type: String,
        trim: true,
      },
    ],

    // 🔁 WORKFLOW (ADVANCED)
    workflowStages: [
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

    // 👤 ADMIN WHO CREATED
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

// 🔥 Prevent model overwrite in dev
const Vacancy =
  mongoose.models.Vacancy || mongoose.model("Vacancy", vacancySchema);

module.exports = Vacancy;