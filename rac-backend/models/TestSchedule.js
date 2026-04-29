const mongoose = require("mongoose");

const testScheduleSchema = new mongoose.Schema(
  {
    vacancyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vacancy",
      required: true,
    },

    testType: {
      type: String,
      enum: ["TECHNICAL", "PERSONALITY"],
      required: true,
      default: "TECHNICAL",
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
      required: true,
    },

    resultDeclarationDate: {
      type: Date,
      default: null,
    },

    cutoff: {
      type: Number,
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.TestSchedule ||
  mongoose.model("TestSchedule", testScheduleSchema);