const Application = require("../models/Application");

// ✅ APPLY TO VACANCY
exports.applyJob = async (req, res) => {
  try {
    const { vacancy_id } = req.body;

    // prevent duplicate apply
    const existing = await Application.findOne({
      applicant: req.user.id,
      vacancy: vacancy_id,
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({
      applicant: req.user.id,
      vacancy: vacancy_id,
    });

    res.json({ message: "Applied Successfully", application });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ✅ GET APPLICATIONS
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id   // ✅ only logged-in user
    })
    .populate("vacancy", "title description");

    res.json(applications);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};