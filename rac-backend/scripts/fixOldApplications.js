const mongoose = require("mongoose");
require("dotenv").config();

const Application = require("../models/Application");

const fixOldApplications = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const result = await Application.updateMany(
      {
        currentStage: "TECHNICAL",
        technicalTestStatus: "ASSIGNED",
      },
      {
        $set: {
          currentStage: "VERIFICATION_ELIGIBLE",
          technicalTestStatus: "NOT_ASSIGNED",
          verificationReason:
            "Candidate verified as eligible. Technical test will be assigned after vacancy deadline.",
        },
        $push: {
          timeline: {
            stage: "VERIFICATION_ELIGIBLE",
            note: "Old application migrated to new verification-based workflow.",
            date: new Date(),
          },
        },
      }
    );

    console.log("Updated applications:", result.modifiedCount);
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
};

fixOldApplications();