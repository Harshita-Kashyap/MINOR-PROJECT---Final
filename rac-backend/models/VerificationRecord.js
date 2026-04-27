const mongoose = require("mongoose");

const VerificationRecordSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    dob: { type: String, required: true },
    aadhaarNumber: { type: String, required: true, unique: true },

    tenth: {
      board: String,
      school: String,
      rollNumber: String,
      percentage: String,
      year: String,
    },

    twelfth: {
      board: String,
      school: String,
      rollNumber: String,
      stream: String,
      percentage: String,
      year: String,
    },

    graduation: {
      degree: String,
      discipline: String,
      specialization: String,
      institute: String,
      university: String,
      percentage: String,
      year: String,
    },

    gate: {
      paper: String,
      score: String,
      rank: String,
      year: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "VerificationRecord",
  VerificationRecordSchema,
  "verificationRecords"
);