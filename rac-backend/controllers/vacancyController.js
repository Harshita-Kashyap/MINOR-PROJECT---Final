// controllers/vacancyController.js

const Vacancy = require("../models/Vacancy");

// ========================
// 🆕 CREATE VACANCY (Admin)
// ========================
exports.createVacancy = async (req, res) => {
  try {
    const data = req.body;

    const vacancy = await Vacancy.create({
      ...data,
      createdBy: req.user?.id || null,
    });

    return res.status(201).json({
      success: true,
      message: "Vacancy created successfully",
      vacancy,
    });
  } catch (error) {
    console.error("❌ Create Vacancy Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// 📄 GET ALL VACANCIES
// ========================
exports.getAllVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: vacancies.length,
      vacancies,
    });
  } catch (error) {
    console.error("❌ Get Vacancies Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// 👁️ GET SINGLE VACANCY
// ========================
exports.getVacancyById = async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id);

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
    console.error("❌ Get Vacancy Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// ✏️ UPDATE VACANCY (Admin)
// ========================
exports.updateVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findByIdAndUpdate(
      req.params.id,
      req.body,
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
      message: "Vacancy updated successfully",
      vacancy,
    });
  } catch (error) {
    console.error("❌ Update Vacancy Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// 🗑 DELETE VACANCY (Admin)
// ========================
exports.deleteVacancy = async (req, res) => {
  try {
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
    console.error("❌ Delete Vacancy Error:", error);

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

    res.status(200).json({
      success: true,
      message: "Vacancy status updated successfully",
      vacancy,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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

