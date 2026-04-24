const mongoose = require("mongoose");

const applicantProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // 👤 PERSONAL DETAILS
    fullName: String,
    fatherName: String,
    motherName: String,
    email: String,
    mobile: String,
    dob: String,
    gender: String,
    category: String,
    nationality: String,
    domicileState: String,
    govtIdType: String,
    govtIdNumber: String,
    isPwd: Boolean,
    isExServiceman: Boolean,
    isGovtEmployee: Boolean,

    // 📍 ADDRESS
    correspondenceAddress: String,
    permanentAddress: String,
    city: String,
    state: String,
    pincode: String,

    // 🎓 10th
    tenthBoard: String,
    tenthSchool: String,
    tenthYear: String,
    tenthPercentage: String,
    tenthRollNumber: String,

    // 🎓 12th
    twelfthBoard: String,
    twelfthSchool: String,
    twelfthYear: String,
    twelfthStream: String,
    twelfthPercentage: String,
    twelfthRollNumber: String,

    // 🎓 GRADUATION
    graduationDegree: String,
    graduationDiscipline: String,
    graduationSpecialization: String,
    graduationInstitute: String,
    graduationUniversity: String,
    graduationYear: String,
    graduationPercentage: String,

    // 🎓 POST GRADUATION
    hasPostGraduation: Boolean,
    pgDegree: String,
    pgDiscipline: String,
    pgInstitute: String,
    pgUniversity: String,
    pgYear: String,
    pgPercentage: String,

    // 🎓 PHD
    hasPhd: Boolean,
    phdSubject: String,
    phdInstitute: String,
    phdYear: String,
    phdTitle: String,

    // 🧪 EXAMS
    disciplineType: String,
    examType: String,
    gatePaper: String,
    gateYear: String,
    gateScore: String,
    gateRank: String,
    netSubject: String,
    netYear: String,
    netScore: String,

    // 📄 CERTIFICATES
    categoryCertificateNumber: String,
    obcNclValidYear: String,
    ewsValidYear: String,
    pwdCertificateNumber: String,
    exServicemanCertificateNumber: String,

    // 📚 PUBLICATIONS
    publicationsCount: Number,
    publicationsDetails: String,

    // ✅ DECLARATION
    declaration: Boolean,

    // 📊 STATUS
    profileStatus: {
      type: String,
      enum: ["INCOMPLETE", "COMPLETE"],
      default: "INCOMPLETE",
    },

    profileCompletionPercent: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ApplicantProfile", applicantProfileSchema);