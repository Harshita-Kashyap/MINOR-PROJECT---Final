const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  vacancy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vacancy",
  },
  status: {
    type: String,
    default: "Applied",
  },
  score: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);