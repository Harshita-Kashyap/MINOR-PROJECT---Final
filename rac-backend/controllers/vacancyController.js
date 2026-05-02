const Vacancy = require("../models/Vacancy");
const Application = require("../models/Application");

exports.createVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.create({
      ...req.body,
      createdBy: req.user?.id || null,
    });

    return res.status(201).json({
      success: true,
      message: "Vacancy created successfully",
      vacancy,
    });
  } catch (error) {
    console.error("Create vacancy error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllVacancies = async (req, res) => {
  try {
    const filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.department) {
      filter.department = req.query.department;
    }

    if (req.query.discipline) {
      filter.discipline = req.query.discipline;
    }

    const vacancies = await Vacancy.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: vacancies.length,
      vacancies,
    });
  } catch (error) {
    console.error("Get vacancies error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getVacancyById = async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id).populate(
      "createdBy",
      "name email role"
    );

    if (!vacancy) {
      return res.status(404).json({
        success: false,
        message: "Vacancy not found",
      });
    }

    return res.status(200).json({
      success: true,
      vacancy,
    });
  } catch (error) {
    console.error("Get vacancy error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!vacancy) {
      return res.status(404).json({
        success: false,
        message: "Vacancy not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vacancy updated successfully",
      vacancy,
    });
  } catch (error) {
    console.error("Update vacancy error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteVacancy = async (req, res) => {
  try {
    const linkedApplications = await Application.countDocuments({
      vacancyId: req.params.id,
    });

    if (linkedApplications > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete this vacancy because applications are linked to it. Close the vacancy instead.",
      });
    }

    const vacancy = await Vacancy.findByIdAndDelete(req.params.id);

    if (!vacancy) {
      return res.status(404).json({
        success: false,
        message: "Vacancy not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vacancy deleted successfully",
    });
  } catch (error) {
    console.error("Delete vacancy error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateVacancyStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["OPEN", "CLOSED", "DRAFT"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vacancy status",
      });
    }

    const vacancy = await Vacancy.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!vacancy) {
      return res.status(404).json({
        success: false,
        message: "Vacancy not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vacancy status updated successfully",
      vacancy,
    });
  } catch (error) {
    console.error("Update vacancy status error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.publishVacancy = async (req, res) => {
  req.body.status = "OPEN";
  return exports.updateVacancyStatus(req, res);
};

exports.closeVacancy = async (req, res) => {
  req.body.status = "CLOSED";
  return exports.updateVacancyStatus(req, res);
};

exports.getVacancyApplicationProgress = async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id);

    if (!vacancy) {
      return res.status(404).json({
        success: false,
        message: "Vacancy not found",
      });
    }

    const [
      totalApplications,

      verificationPending,
      verificationEligible,
      verificationReview,
      verificationRejected,

      technicalAssigned,
      technicalSubmitted,
      technicalQualified,
      technicalRejected,

      personalityAssigned,
      personalitySubmitted,

      finalReview,
      selected,
      waitlisted,
      finalRejected,
    ] = await Promise.all([
      Application.countDocuments({ vacancyId: req.params.id }),

      Application.countDocuments({
        vacancyId: req.params.id,
        verificationStatus: "PENDING",
      }),
      Application.countDocuments({
        vacancyId: req.params.id,
        verificationStatus: "ELIGIBLE",
      }),
      Application.countDocuments({
        vacancyId: req.params.id,
        verificationStatus: "REVIEW",
      }),
      Application.countDocuments({
        vacancyId: req.params.id,
        verificationStatus: "REJECTED",
      }),

      Application.countDocuments({
        vacancyId: req.params.id,
        technicalTestStatus: "ASSIGNED",
      }),
      Application.countDocuments({
        vacancyId: req.params.id,
        technicalTestStatus: "SUBMITTED",
      }),
      Application.countDocuments({
        vacancyId: req.params.id,
        technicalTestStatus: "QUALIFIED",
      }),
      Application.countDocuments({
        vacancyId: req.params.id,
        technicalTestStatus: "REJECTED",
      }),

      Application.countDocuments({
        vacancyId: req.params.id,
        personalityTestStatus: "ASSIGNED",
      }),
      Application.countDocuments({
        vacancyId: req.params.id,
        personalityTestStatus: "SUBMITTED",
      }),

      Application.countDocuments({
        vacancyId: req.params.id,
        currentStage: "FINAL_REVIEW",
      }),
      Application.countDocuments({
        vacancyId: req.params.id,
        finalStatus: "SELECTED",
      }),
      Application.countDocuments({
        vacancyId: req.params.id,
        finalStatus: "WAITLISTED",
      }),
      Application.countDocuments({
        vacancyId: req.params.id,
        finalStatus: "REJECTED",
      }),
    ]);

    return res.status(200).json({
      success: true,
      vacancy,
      progress: {
        totalApplications,

        verificationPending,
        verificationEligible,
        verificationReview,
        verificationRejected,

        technicalAssigned,
        technicalSubmitted,
        technicalQualified,
        technicalRejected,

        personalityAssigned,
        personalitySubmitted,

        finalReview,
        selected,
        waitlisted,
        finalRejected,
      },
    });
  } catch (error) {
    console.error("Vacancy application progress error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};