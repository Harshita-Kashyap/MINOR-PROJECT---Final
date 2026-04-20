// import { useEffect, useMemo, useState } from "react";
// import Header from "../../landing/components/Header";
// import ApplicantRibbon from "../components/ApplicantRibbon";
// import Card from "../../../shared/components/ui/Card";
// import Input from "../../../shared/components/ui/Input";
// import Button from "../../../shared/components/ui/Button";

// const initialForm = {
//   // Personal
//   fullName: "",
//   fatherName: "",
//   motherName: "",
//   email: "",
//   mobile: "",
//   dob: "",
//   gender: "",
//   category: "",
//   nationality: "Indian",
//   domicileState: "",
//   govtIdType: "",
//   govtIdNumber: "",
//   isPwd: "No",
//   isExServiceman: "No",
//   isGovtEmployee: "No",

//   // Address
//   correspondenceAddress: "",
//   permanentAddress: "",
//   city: "",
//   state: "",
//   pincode: "",

//   // 10th
//   tenthBoard: "",
//   tenthSchool: "",
//   tenthYear: "",
//   tenthPercentage: "",
//   tenthRollNumber: "",

//   // 12th
//   twelfthBoard: "",
//   twelfthSchool: "",
//   twelfthYear: "",
//   twelfthStream: "",
//   twelfthPercentage: "",
//   twelfthRollNumber: "",

//   // Graduation
//   graduationDegree: "",
//   graduationDiscipline: "",
//   graduationSpecialization: "",
//   graduationInstitute: "",
//   graduationUniversity: "",
//   graduationYear: "",
//   graduationPercentage: "",

//   // Post Graduation (optional)
//   hasPostGraduation: "No",
//   pgDegree: "",
//   pgDiscipline: "",
//   pgInstitute: "",
//   pgUniversity: "",
//   pgYear: "",
//   pgPercentage: "",

//   // PhD (optional)
//   hasPhd: "No",
//   phdSubject: "",
//   phdInstitute: "",
//   phdYear: "",
//   phdTitle: "",

//   // Exam route
//   disciplineType: "Engineering",
//   examType: "GATE", // GATE / NET / None
//   gatePaper: "",
//   gateYear: "",
//   gateScore: "",
//   gateRank: "",
//   netSubject: "",
//   netYear: "",
//   netScore: "",

//   // Reservation / certificate details
//   categoryCertificateNumber: "",
//   obcNclValidYear: "",
//   ewsValidYear: "",
//   pwdCertificateNumber: "",
//   exServicemanCertificateNumber: "",

//   // Publications
//   publicationsCount: "",
//   publicationsDetails: "",

//   // Final
//   declaration: false,
// };

// const currentYear = new Date().getFullYear();

// const yearsList = Array.from({ length: 35 }, (_, i) => String(currentYear - i));

// export default function ApplicantProfile() {
//   const [form, setForm] = useState(initialForm);
//   const [saved, setSaved] = useState(false);
//   const [profileComplete, setProfileComplete] = useState(false);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const stored = localStorage.getItem("applicantProfile");
//     const storedComplete = localStorage.getItem("applicantProfileComplete");

//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored);
//         setForm((prev) => ({
//           ...prev,
//           ...parsed,
//         }));
//       } catch (error) {
//         console.error("Failed to load applicant profile:", error);
//       }
//     }

//     if (storedComplete) {
//       setProfileComplete(storedComplete === "true");
//     }
//   }, []);

//   const isIndian = form.nationality === "Indian";
//   const needsGate = form.examType === "GATE";
//   const needsNet = form.examType === "NET";
//   const showCategoryCert =
//     form.category === "SC" ||
//     form.category === "ST" ||
//     form.category === "OBC-NCL" ||
//     form.category === "EWS";
//   const showPwdCert = form.isPwd === "Yes";
//   const showExServicemanCert = form.isExServiceman === "Yes";
//   const showPg = form.hasPostGraduation === "Yes";
//   const showPhd = form.hasPhd === "Yes";

//   const completionCheck = useMemo(() => {
//     const requiredFields = [
//       "fullName",
//       "fatherName",
//       "email",
//       "mobile",
//       "dob",
//       "gender",
//       "category",
//       "nationality",
//       "domicileState",

//       "correspondenceAddress",
//       "permanentAddress",
//       "city",
//       "state",
//       "pincode",

//       "tenthBoard",
//       "tenthSchool",
//       "tenthYear",
//       "tenthPercentage",
//       "tenthRollNumber",

//       "twelfthBoard",
//       "twelfthSchool",
//       "twelfthYear",
//       "twelfthStream",
//       "twelfthPercentage",
//       "twelfthRollNumber",

//       "graduationDegree",
//       "graduationDiscipline",
//       "graduationSpecialization",
//       "graduationInstitute",
//       "graduationUniversity",
//       "graduationYear",
//       "graduationPercentage",
//     ];

//     const baseComplete = requiredFields.every(
//       (field) => form[field] && form[field].toString().trim() !== ""
//     );

//     const examComplete = needsGate
//       ? form.gatePaper && form.gateYear && form.gateScore
//       : needsNet
//       ? form.netSubject && form.netYear && form.netScore
//       : true;

//     const categoryComplete =
//       !showCategoryCert ||
//       !!form.categoryCertificateNumber ||
//       form.category === "General";

//     const pwdComplete =
//       !showPwdCert || !!form.pwdCertificateNumber;

//     const exServicemanComplete =
//       !showExServicemanCert || !!form.exServicemanCertificateNumber;

//     const pgComplete = !showPg
//       ? true
//       : !!(
//           form.pgDegree &&
//           form.pgDiscipline &&
//           form.pgInstitute &&
//           form.pgUniversity &&
//           form.pgYear &&
//           form.pgPercentage
//         );

//     const phdComplete = !showPhd
//       ? true
//       : !!(
//           form.phdSubject &&
//           form.phdInstitute &&
//           form.phdYear &&
//           form.phdTitle
//         );

//     return (
//       baseComplete &&
//       isIndian &&
//       examComplete &&
//       categoryComplete &&
//       pwdComplete &&
//       exServicemanComplete &&
//       pgComplete &&
//       phdComplete &&
//       form.declaration
//     );
//   }, [form, isIndian, needsGate, needsNet, showCategoryCert, showPwdCert, showExServicemanCert, showPg, showPhd]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     setSaved(false);
//     setErrors((prev) => ({
//       ...prev,
//       [name]: "",
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
//     if (!form.fatherName.trim()) newErrors.fatherName = "Father's name is required";
//     if (!form.email.trim()) newErrors.email = "Email is required";
//     if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email";

//     if (!form.mobile.trim()) newErrors.mobile = "Mobile number is required";
//     if (!/^\d{10}$/.test(form.mobile)) newErrors.mobile = "Enter a valid 10-digit mobile number";

//     if (!form.dob) newErrors.dob = "Date of birth is required";
//     if (!form.gender) newErrors.gender = "Gender is required";
//     if (!form.category) newErrors.category = "Category is required";

//     if (form.nationality !== "Indian") {
//       newErrors.nationality = "Only Indian nationality is allowed for this application flow";
//     }

//     if (!form.pincode.trim()) newErrors.pincode = "PIN code is required";
//     if (!/^\d{6}$/.test(form.pincode)) newErrors.pincode = "Enter a valid 6-digit PIN code";

//     if (needsGate) {
//       if (!form.gatePaper.trim()) newErrors.gatePaper = "GATE paper is required";
//       if (!form.gateYear.trim()) newErrors.gateYear = "GATE year is required";
//       if (!form.gateScore.trim()) newErrors.gateScore = "GATE score is required";
//     }

//     if (needsNet) {
//       if (!form.netSubject.trim()) newErrors.netSubject = "NET subject is required";
//       if (!form.netYear.trim()) newErrors.netYear = "NET year is required";
//       if (!form.netScore.trim()) newErrors.netScore = "NET score is required";
//     }

//     if (showCategoryCert && form.category !== "General" && !form.categoryCertificateNumber.trim()) {
//       newErrors.categoryCertificateNumber = "Category certificate number is required";
//     }

//     if (showPwdCert && !form.pwdCertificateNumber.trim()) {
//       newErrors.pwdCertificateNumber = "PwD certificate number is required";
//     }

//     if (showExServicemanCert && !form.exServicemanCertificateNumber.trim()) {
//       newErrors.exServicemanCertificateNumber = "Ex-serviceman certificate number is required";
//     }

//     if (!form.declaration) {
//       newErrors.declaration = "Please accept the declaration";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const isValid = validateForm();

//     const finalComplete = isValid && completionCheck;

//     localStorage.setItem("applicantProfile", JSON.stringify(form));
//     localStorage.setItem(
//       "applicantProfileComplete",
//       finalComplete ? "true" : "false"
//     );

//     console.log("Applicant Profile Data:", form);

//     setProfileComplete(finalComplete);
//     setSaved(true);
//   };

//   const SectionTitle = ({ title, subtitle }) => (
//     <div className="border-b border-gray-200 pb-3 dark:border-gray-700">
//       <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
//         {title}
//       </h2>
//       {subtitle && (
//         <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//           {subtitle}
//         </p>
//       )}
//     </div>
//   );

//   const SelectField = ({
//     label,
//     name,
//     value,
//     onChange,
//     options,
//     error,
//   }) => (
//     <div className="flex flex-col gap-1">
//       <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
//         {label}
//       </label>
//       <select
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
//       >
//         <option value="">Select</option>
//         {options.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//       {error && (
//         <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
//       )}
//     </div>
//   );

//   const TextAreaField = ({
//     label,
//     name,
//     value,
//     onChange,
//     placeholder,
//     rows = 4,
//     error,
//   }) => (
//     <div className="flex flex-col gap-1">
//       <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
//         {label}
//       </label>
//       <textarea
//         name={name}
//         value={value}
//         onChange={onChange}
//         rows={rows}
//         placeholder={placeholder}
//         className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
//       />
//       {error && (
//         <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
//       )}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
//       <Header />
//       <ApplicantRibbon />

//       <main className="mx-auto max-w-6xl px-4 py-6">
//         <Card className="space-y-8">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//               Complete Application Profile
//             </h1>
//             <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//               Fill all required academic, eligibility, and identity details before applying for vacancies.
//             </p>
//           </div>

//           {!isIndian && (
//             <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300">
//               This recruitment flow is currently restricted to Indian nationals only.
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Personal Details */}
//             <section className="space-y-4">
//               <SectionTitle
//                 title="1. Personal Information"
//                 subtitle="Basic personal details of the applicant."
//               />

//               <div className="grid gap-4 md:grid-cols-2">
//                 <Input
//                   label="Full Name"
//                   name="fullName"
//                   value={form.fullName}
//                   onChange={handleChange}
//                   placeholder="Enter full name"
//                   error={errors.fullName}
//                 />

//                 <Input
//                   label="Father's Name"
//                   name="fatherName"
//                   value={form.fatherName}
//                   onChange={handleChange}
//                   placeholder="Enter father's name"
//                   error={errors.fatherName}
//                 />

//                 <Input
//                   label="Mother's Name"
//                   name="motherName"
//                   value={form.motherName}
//                   onChange={handleChange}
//                   placeholder="Enter mother's name"
//                 />

//                 <Input
//                   label="Email"
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="Enter email"
//                   error={errors.email}
//                 />

//                 <Input
//                   label="Mobile Number"
//                   name="mobile"
//                   value={form.mobile}
//                   onChange={handleChange}
//                   placeholder="Enter 10-digit mobile number"
//                   error={errors.mobile}
//                 />

//                 <Input
//                   label="Date of Birth"
//                   type="date"
//                   name="dob"
//                   value={form.dob}
//                   onChange={handleChange}
//                   error={errors.dob}
//                 />

//                 <SelectField
//                   label="Gender"
//                   name="gender"
//                   value={form.gender}
//                   onChange={handleChange}
//                   options={["Male", "Female", "Other"]}
//                   error={errors.gender}
//                 />

//                 <SelectField
//                   label="Category"
//                   name="category"
//                   value={form.category}
//                   onChange={handleChange}
//                   options={["General", "EWS", "OBC-NCL", "SC", "ST"]}
//                   error={errors.category}
//                 />

//                 <SelectField
//                   label="Nationality"
//                   name="nationality"
//                   value={form.nationality}
//                   onChange={handleChange}
//                   options={["Indian", "Other"]}
//                   error={errors.nationality}
//                 />

//                 <Input
//                   label="Domicile State"
//                   name="domicileState"
//                   value={form.domicileState}
//                   onChange={handleChange}
//                   placeholder="Enter domicile state"
//                 />

//                 <SelectField
//                   label="Govt. ID Type"
//                   name="govtIdType"
//                   value={form.govtIdType}
//                   onChange={handleChange}
//                   options={["Aadhaar", "PAN", "Passport", "Voter ID", "Driving Licence"]}
//                 />

//                 <Input
//                   label="Govt. ID Number"
//                   name="govtIdNumber"
//                   value={form.govtIdNumber}
//                   onChange={handleChange}
//                   placeholder="Enter ID number"
//                 />

//                 <SelectField
//                   label="PwD"
//                   name="isPwd"
//                   value={form.isPwd}
//                   onChange={handleChange}
//                   options={["Yes", "No"]}
//                 />

//                 <SelectField
//                   label="Ex-Serviceman"
//                   name="isExServiceman"
//                   value={form.isExServiceman}
//                   onChange={handleChange}
//                   options={["Yes", "No"]}
//                 />

//                 <SelectField
//                   label="Government Employee"
//                   name="isGovtEmployee"
//                   value={form.isGovtEmployee}
//                   onChange={handleChange}
//                   options={["Yes", "No"]}
//                 />
//               </div>
//             </section>

//             {/* Address */}
//             <section className="space-y-4">
//               <SectionTitle
//                 title="2. Address Information"
//                 subtitle="Communication and permanent address details."
//               />

//               <div className="grid gap-4 md:grid-cols-2">
//                 <TextAreaField
//                   label="Correspondence Address"
//                   name="correspondenceAddress"
//                   value={form.correspondenceAddress}
//                   onChange={handleChange}
//                   placeholder="Enter correspondence address"
//                 />

//                 <TextAreaField
//                   label="Permanent Address"
//                   name="permanentAddress"
//                   value={form.permanentAddress}
//                   onChange={handleChange}
//                   placeholder="Enter permanent address"
//                 />

//                 <Input
//                   label="City"
//                   name="city"
//                   value={form.city}
//                   onChange={handleChange}
//                   placeholder="Enter city"
//                 />

//                 <Input
//                   label="State"
//                   name="state"
//                   value={form.state}
//                   onChange={handleChange}
//                   placeholder="Enter state"
//                 />

//                 <Input
//                   label="PIN Code"
//                   name="pincode"
//                   value={form.pincode}
//                   onChange={handleChange}
//                   placeholder="Enter 6-digit PIN code"
//                   error={errors.pincode}
//                 />
//               </div>
//             </section>

//             {/* 10th */}
//             <section className="space-y-4">
//               <SectionTitle
//                 title="3. Class 10th Details"
//                 subtitle="Used for academic record and date of birth verification."
//               />

//               <div className="grid gap-4 md:grid-cols-2">
//                 <Input
//                   label="Board"
//                   name="tenthBoard"
//                   value={form.tenthBoard}
//                   onChange={handleChange}
//                   placeholder="CBSE / State Board / ICSE"
//                 />
//                 <Input
//                   label="School Name"
//                   name="tenthSchool"
//                   value={form.tenthSchool}
//                   onChange={handleChange}
//                   placeholder="Enter school name"
//                 />
//                 <SelectField
//                   label="Year of Passing"
//                   name="tenthYear"
//                   value={form.tenthYear}
//                   onChange={handleChange}
//                   options={yearsList}
//                 />
//                 <Input
//                   label="Percentage / CGPA"
//                   name="tenthPercentage"
//                   value={form.tenthPercentage}
//                   onChange={handleChange}
//                   placeholder="Enter percentage or CGPA"
//                 />
//                 <Input
//                   label="Roll Number"
//                   name="tenthRollNumber"
//                   value={form.tenthRollNumber}
//                   onChange={handleChange}
//                   placeholder="Enter roll number"
//                 />
//               </div>
//             </section>

//             {/* 12th */}
//             <section className="space-y-4">
//               <SectionTitle
//                 title="4. Class 12th Details"
//                 subtitle="Higher secondary academic information."
//               />

//               <div className="grid gap-4 md:grid-cols-2">
//                 <Input
//                   label="Board"
//                   name="twelfthBoard"
//                   value={form.twelfthBoard}
//                   onChange={handleChange}
//                   placeholder="CBSE / State Board / ICSE"
//                 />
//                 <Input
//                   label="School Name"
//                   name="twelfthSchool"
//                   value={form.twelfthSchool}
//                   onChange={handleChange}
//                   placeholder="Enter school name"
//                 />
//                 <SelectField
//                   label="Year of Passing"
//                   name="twelfthYear"
//                   value={form.twelfthYear}
//                   onChange={handleChange}
//                   options={yearsList}
//                 />
//                 <Input
//                   label="Stream"
//                   name="twelfthStream"
//                   value={form.twelfthStream}
//                   onChange={handleChange}
//                   placeholder="PCM / PCB / Commerce / Arts"
//                 />
//                 <Input
//                   label="Percentage / CGPA"
//                   name="twelfthPercentage"
//                   value={form.twelfthPercentage}
//                   onChange={handleChange}
//                   placeholder="Enter percentage or CGPA"
//                 />
//                 <Input
//                   label="Roll Number"
//                   name="twelfthRollNumber"
//                   value={form.twelfthRollNumber}
//                   onChange={handleChange}
//                   placeholder="Enter roll number"
//                 />
//               </div>
//             </section>

//             {/* Graduation */}
//             <section className="space-y-4">
//               <SectionTitle
//                 title="5. Graduation Details"
//                 subtitle="Essential qualification details for the vacancy."
//               />

//               <div className="grid gap-4 md:grid-cols-2">
//                 <Input
//                   label="Degree"
//                   name="graduationDegree"
//                   value={form.graduationDegree}
//                   onChange={handleChange}
//                   placeholder="B.Tech / B.E. / B.Sc / M.Sc"
//                 />
//                 <Input
//                   label="Discipline / Branch"
//                   name="graduationDiscipline"
//                   value={form.graduationDiscipline}
//                   onChange={handleChange}
//                   placeholder="Computer Science / Mechanical / Electronics"
//                 />
//                 <Input
//                   label="Specialization"
//                   name="graduationSpecialization"
//                   value={form.graduationSpecialization}
//                   onChange={handleChange}
//                   placeholder="Enter specialization"
//                 />
//                 <Input
//                   label="Institute"
//                   name="graduationInstitute"
//                   value={form.graduationInstitute}
//                   onChange={handleChange}
//                   placeholder="Enter institute name"
//                 />
//                 <Input
//                   label="University"
//                   name="graduationUniversity"
//                   value={form.graduationUniversity}
//                   onChange={handleChange}
//                   placeholder="Enter university name"
//                 />
//                 <SelectField
//                   label="Year of Passing"
//                   name="graduationYear"
//                   value={form.graduationYear}
//                   onChange={handleChange}
//                   options={yearsList}
//                 />
//                 <Input
//                   label="Percentage / CGPA"
//                   name="graduationPercentage"
//                   value={form.graduationPercentage}
//                   onChange={handleChange}
//                   placeholder="Enter percentage or CGPA"
//                 />
//               </div>
//             </section>

//             {/* Optional Education */}
//             <section className="space-y-4">
//               <SectionTitle
//                 title="6. Higher Education"
//                 subtitle="Post-graduation and PhD are optional unless required by discipline."
//               />

//               <div className="grid gap-4 md:grid-cols-2">
//                 <SelectField
//                   label="Do you have Post Graduation?"
//                   name="hasPostGraduation"
//                   value={form.hasPostGraduation}
//                   onChange={handleChange}
//                   options={["Yes", "No"]}
//                 />

//                 <SelectField
//                   label="Do you have PhD?"
//                   name="hasPhd"
//                   value={form.hasPhd}
//                   onChange={handleChange}
//                   options={["Yes", "No"]}
//                 />
//               </div>

//               {showPg && (
//                 <div className="grid gap-4 rounded-2xl border border-gray-200 p-4 md:grid-cols-2 dark:border-gray-700">
//                   <Input
//                     label="PG Degree"
//                     name="pgDegree"
//                     value={form.pgDegree}
//                     onChange={handleChange}
//                     placeholder="M.Tech / M.E. / M.Sc"
//                   />
//                   <Input
//                     label="PG Discipline"
//                     name="pgDiscipline"
//                     value={form.pgDiscipline}
//                     onChange={handleChange}
//                     placeholder="Enter discipline"
//                   />
//                   <Input
//                     label="PG Institute"
//                     name="pgInstitute"
//                     value={form.pgInstitute}
//                     onChange={handleChange}
//                     placeholder="Enter institute"
//                   />
//                   <Input
//                     label="PG University"
//                     name="pgUniversity"
//                     value={form.pgUniversity}
//                     onChange={handleChange}
//                     placeholder="Enter university"
//                   />
//                   <SelectField
//                     label="PG Year of Passing"
//                     name="pgYear"
//                     value={form.pgYear}
//                     onChange={handleChange}
//                     options={yearsList}
//                   />
//                   <Input
//                     label="PG Percentage / CGPA"
//                     name="pgPercentage"
//                     value={form.pgPercentage}
//                     onChange={handleChange}
//                     placeholder="Enter percentage or CGPA"
//                   />
//                 </div>
//               )}

//               {showPhd && (
//                 <div className="grid gap-4 rounded-2xl border border-gray-200 p-4 md:grid-cols-2 dark:border-gray-700">
//                   <Input
//                     label="PhD Subject / Area"
//                     name="phdSubject"
//                     value={form.phdSubject}
//                     onChange={handleChange}
//                     placeholder="Enter PhD subject"
//                   />
//                   <Input
//                     label="PhD Institute"
//                     name="phdInstitute"
//                     value={form.phdInstitute}
//                     onChange={handleChange}
//                     placeholder="Enter institute"
//                   />
//                   <SelectField
//                     label="PhD Year of Completion"
//                     name="phdYear"
//                     value={form.phdYear}
//                     onChange={handleChange}
//                     options={yearsList}
//                   />
//                   <Input
//                     label="Thesis Title"
//                     name="phdTitle"
//                     value={form.phdTitle}
//                     onChange={handleChange}
//                     placeholder="Enter thesis title"
//                   />
//                 </div>
//               )}
//             </section>

//             {/* Exam details */}
//             <section className="space-y-4">
//               <SectionTitle
//                 title="7. Eligibility Exam Details"
//                 subtitle="Choose the qualifying exam route applicable to your discipline."
//               />

//               <div className="grid gap-4 md:grid-cols-2">
//                 <SelectField
//                   label="Discipline Type"
//                   name="disciplineType"
//                   value={form.disciplineType}
//                   onChange={handleChange}
//                   options={["Engineering", "Science", "Psychology", "Other"]}
//                 />

//                 <SelectField
//                   label="Exam Type"
//                   name="examType"
//                   value={form.examType}
//                   onChange={handleChange}
//                   options={["GATE", "NET", "None"]}
//                 />
//               </div>

//               {needsGate && (
//                 <div className="grid gap-4 rounded-2xl border border-gray-200 p-4 md:grid-cols-2 dark:border-gray-700">
//                   <Input
//                     label="GATE Paper"
//                     name="gatePaper"
//                     value={form.gatePaper}
//                     onChange={handleChange}
//                     placeholder="CS / EC / ME / EE"
//                     error={errors.gatePaper}
//                   />
//                   <SelectField
//                     label="GATE Year"
//                     name="gateYear"
//                     value={form.gateYear}
//                     onChange={handleChange}
//                     options={yearsList}
//                     error={errors.gateYear}
//                   />
//                   <Input
//                     label="GATE Score"
//                     name="gateScore"
//                     value={form.gateScore}
//                     onChange={handleChange}
//                     placeholder="Enter GATE score"
//                     error={errors.gateScore}
//                   />
//                   <Input
//                     label="GATE Rank"
//                     name="gateRank"
//                     value={form.gateRank}
//                     onChange={handleChange}
//                     placeholder="Enter all India rank"
//                   />
//                 </div>
//               )}

//               {needsNet && (
//                 <div className="grid gap-4 rounded-2xl border border-gray-200 p-4 md:grid-cols-2 dark:border-gray-700">
//                   <Input
//                     label="NET Subject"
//                     name="netSubject"
//                     value={form.netSubject}
//                     onChange={handleChange}
//                     placeholder="Enter NET subject"
//                     error={errors.netSubject}
//                   />
//                   <SelectField
//                     label="NET Year"
//                     name="netYear"
//                     value={form.netYear}
//                     onChange={handleChange}
//                     options={yearsList}
//                     error={errors.netYear}
//                   />
//                   <Input
//                     label="NET Score / Percentile"
//                     name="netScore"
//                     value={form.netScore}
//                     onChange={handleChange}
//                     placeholder="Enter NET score"
//                     error={errors.netScore}
//                   />
//                 </div>
//               )}
//             </section>

//             {/* Reservation */}
//             <section className="space-y-4">
//               <SectionTitle
//                 title="8. Reservation / Certificate Details"
//                 subtitle="Fill certificate details only if applicable."
//               />

//               <div className="grid gap-4 md:grid-cols-2">
//                 {showCategoryCert && form.category !== "General" && (
//                   <Input
//                     label="Category Certificate Number"
//                     name="categoryCertificateNumber"
//                     value={form.categoryCertificateNumber}
//                     onChange={handleChange}
//                     placeholder="Enter certificate number"
//                     error={errors.categoryCertificateNumber}
//                   />
//                 )}

//                 {form.category === "OBC-NCL" && (
//                   <Input
//                     label="OBC-NCL Validity Year"
//                     name="obcNclValidYear"
//                     value={form.obcNclValidYear}
//                     onChange={handleChange}
//                     placeholder="Enter validity year"
//                   />
//                 )}

//                 {form.category === "EWS" && (
//                   <Input
//                     label="EWS Validity Year"
//                     name="ewsValidYear"
//                     value={form.ewsValidYear}
//                     onChange={handleChange}
//                     placeholder="Enter validity year"
//                   />
//                 )}

//                 {showPwdCert && (
//                   <Input
//                     label="PwD Certificate Number"
//                     name="pwdCertificateNumber"
//                     value={form.pwdCertificateNumber}
//                     onChange={handleChange}
//                     placeholder="Enter certificate number"
//                     error={errors.pwdCertificateNumber}
//                   />
//                 )}

//                 {showExServicemanCert && (
//                   <Input
//                     label="Ex-Serviceman Certificate Number"
//                     name="exServicemanCertificateNumber"
//                     value={form.exServicemanCertificateNumber}
//                     onChange={handleChange}
//                     placeholder="Enter certificate number"
//                     error={errors.exServicemanCertificateNumber}
//                   />
//                 )}
//               </div>
//             </section>

//             {/* Publications */}
//             <section className="space-y-4">
//               <SectionTitle
//                 title="9. Publications / Research Details"
//                 subtitle="Optional research details, if available."
//               />

//               <div className="grid gap-4 md:grid-cols-2">
//                 <Input
//                   label="Number of Publications"
//                   name="publicationsCount"
//                   value={form.publicationsCount}
//                   onChange={handleChange}
//                   placeholder="Enter number of publications"
//                 />
//               </div>

//               <TextAreaField
//                 label="Publication Details"
//                 name="publicationsDetails"
//                 value={form.publicationsDetails}
//                 onChange={handleChange}
//                 placeholder="Mention title, journal/conference, year, patents, or notable research work"
//                 rows={5}
//               />
//             </section>

//             {/* Declaration */}
//             <section className="space-y-4">
//               <SectionTitle
//                 title="10. Final Declaration"
//                 subtitle="Required to mark the profile as complete."
//               />

//               <label className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">
//                 <input
//                   type="checkbox"
//                   name="declaration"
//                   checked={form.declaration}
//                   onChange={handleChange}
//                   className="mt-1 h-4 w-4"
//                 />
//                 <span>
//                   I hereby declare that all information entered in this profile is true, complete, and correct to the best of my knowledge. I understand that incorrect information may lead to rejection of my application.
//                 </span>
//               </label>

//               {errors.declaration && (
//                 <span className="text-sm text-red-600 dark:text-red-400">
//                   {errors.declaration}
//                 </span>
//               )}
//             </section>

//             <div className="flex flex-wrap items-center gap-3">
//               <Button type="submit">Save Profile</Button>

//               {saved && profileComplete && (
//                 <span className="text-sm text-green-600 dark:text-green-400">
//                   Profile saved successfully and marked complete.
//                 </span>
//               )}

//               {saved && !profileComplete && (
//                 <span className="text-sm text-yellow-600 dark:text-yellow-400">
//                   Profile saved, but some required fields are still missing or invalid.
//                 </span>
//               )}
//             </div>
//           </form>
//         </Card>
//       </main>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import Header from "../../landing/components/Header";
import ApplicantRibbon from "../components/ApplicantRibbon";
import Card from "../../../shared/components/ui/Card";
import Input from "../../../shared/components/ui/Input";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import {
  getApplicantProfile,
  saveApplicantProfile,
  setProfileComplete,
} from "../../../shared/utils/profileStorage";

const initialForm = {
  fullName: "",
  fatherName: "",
  motherName: "",
  email: "",
  mobile: "",
  dob: "",
  gender: "",
  category: "",
  nationality: "Indian",
  domicileState: "",
  govtIdType: "",
  govtIdNumber: "",
  isPwd: "No",
  isExServiceman: "No",
  isGovtEmployee: "No",

  correspondenceAddress: "",
  permanentAddress: "",
  city: "",
  state: "",
  pincode: "",

  tenthBoard: "",
  tenthSchool: "",
  tenthYear: "",
  tenthPercentage: "",
  tenthRollNumber: "",

  twelfthBoard: "",
  twelfthSchool: "",
  twelfthYear: "",
  twelfthStream: "",
  twelfthPercentage: "",
  twelfthRollNumber: "",

  graduationDegree: "",
  graduationDiscipline: "",
  graduationSpecialization: "",
  graduationInstitute: "",
  graduationUniversity: "",
  graduationYear: "",
  graduationPercentage: "",

  hasPostGraduation: "No",
  pgDegree: "",
  pgDiscipline: "",
  pgInstitute: "",
  pgUniversity: "",
  pgYear: "",
  pgPercentage: "",

  hasPhd: "No",
  phdSubject: "",
  phdInstitute: "",
  phdYear: "",
  phdTitle: "",

  disciplineType: "Engineering",
  examType: "GATE",
  gatePaper: "",
  gateYear: "",
  gateScore: "",
  gateRank: "",
  netSubject: "",
  netYear: "",
  netScore: "",

  categoryCertificateNumber: "",
  obcNclValidYear: "",
  ewsValidYear: "",
  pwdCertificateNumber: "",
  exServicemanCertificateNumber: "",

  publicationsCount: "",
  publicationsDetails: "",

  declaration: false,
};

const currentYear = new Date().getFullYear();
const yearsList = Array.from({ length: 35 }, (_, i) => String(currentYear - i));

function SectionTitle({ title, subtitle }) {
  return (
    <div className="border-b border-gray-200 pb-3 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
      )}
    </div>
  );
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
      />
      {error && (
        <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
      )}
    </div>
  );
}

export default function ApplicantProfile() {
  const [form, setForm] = useState(initialForm);
  const [saved, setSaved] = useState(false);
  const [profileComplete, setProfileCompleteState] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const stored = getApplicantProfile();
    if (stored) {
      setForm((prev) => ({
        ...prev,
        ...stored,
      }));
    }
  }, []);

  const isIndian = form.nationality === "Indian";
  const needsGate = form.examType === "GATE";
  const needsNet = form.examType === "NET";
  const showCategoryCert =
    form.category === "SC" ||
    form.category === "ST" ||
    form.category === "OBC-NCL" ||
    form.category === "EWS";
  const showPwdCert = form.isPwd === "Yes";
  const showExServicemanCert = form.isExServiceman === "Yes";
  const showPg = form.hasPostGraduation === "Yes";
  const showPhd = form.hasPhd === "Yes";

  const completionCheck = useMemo(() => {
    const requiredFields = [
      "fullName",
      "fatherName",
      "email",
      "mobile",
      "dob",
      "gender",
      "category",
      "nationality",
      "domicileState",
      "govtIdType",
      "govtIdNumber",

      "correspondenceAddress",
      "permanentAddress",
      "city",
      "state",
      "pincode",

      "tenthBoard",
      "tenthSchool",
      "tenthYear",
      "tenthPercentage",
      "tenthRollNumber",

      "twelfthBoard",
      "twelfthSchool",
      "twelfthYear",
      "twelfthStream",
      "twelfthPercentage",
      "twelfthRollNumber",

      "graduationDegree",
      "graduationDiscipline",
      "graduationSpecialization",
      "graduationInstitute",
      "graduationUniversity",
      "graduationYear",
      "graduationPercentage",
    ];

    const baseComplete = requiredFields.every(
      (field) => form[field] && form[field].toString().trim() !== ""
    );

    const examComplete = needsGate
      ? form.gatePaper && form.gateYear && form.gateScore
      : needsNet
      ? form.netSubject && form.netYear && form.netScore
      : true;

    const categoryComplete =
      !showCategoryCert ||
      form.category === "General" ||
      !!form.categoryCertificateNumber;

    const pwdComplete = !showPwdCert || !!form.pwdCertificateNumber;
    const exServicemanComplete =
      !showExServicemanCert || !!form.exServicemanCertificateNumber;

    const pgComplete = !showPg
      ? true
      : !!(
          form.pgDegree &&
          form.pgDiscipline &&
          form.pgInstitute &&
          form.pgUniversity &&
          form.pgYear &&
          form.pgPercentage
        );

    const phdComplete = !showPhd
      ? true
      : !!(
          form.phdSubject &&
          form.phdInstitute &&
          form.phdYear &&
          form.phdTitle
        );

    return (
      baseComplete &&
      isIndian &&
      examComplete &&
      categoryComplete &&
      pwdComplete &&
      exServicemanComplete &&
      pgComplete &&
      phdComplete &&
      form.declaration
    );
  }, [
    form,
    isIndian,
    needsGate,
    needsNet,
    showCategoryCert,
    showPwdCert,
    showExServicemanCert,
    showPg,
    showPhd,
  ]);

  useEffect(() => {
    setProfileCompleteState(completionCheck);
  }, [completionCheck]);

  const completionPercent = useMemo(() => {
    const checks = [
      !!form.fullName,
      !!form.email,
      !!form.mobile,
      !!form.dob,
      !!form.gender,
      !!form.category,
      !!form.domicileState,
      !!form.correspondenceAddress,
      !!form.permanentAddress,
      !!form.city,
      !!form.state,
      !!form.pincode,
      !!form.tenthBoard,
      !!form.tenthSchool,
      !!form.tenthYear,
      !!form.tenthPercentage,
      !!form.tenthRollNumber,
      !!form.twelfthBoard,
      !!form.twelfthSchool,
      !!form.twelfthYear,
      !!form.twelfthStream,
      !!form.twelfthPercentage,
      !!form.twelfthRollNumber,
      !!form.graduationDegree,
      !!form.graduationDiscipline,
      !!form.graduationInstitute,
      !!form.graduationUniversity,
      !!form.graduationYear,
      !!form.graduationPercentage,
      !!form.govtIdType,
      !!form.govtIdNumber,
      form.declaration,
    ];

    const completed = checks.filter(Boolean).length;
    return Math.round((completed / checks.length) * 100);
  }, [form]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setSaved(false);
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.fatherName.trim()) newErrors.fatherName = "Father's name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!form.dob) newErrors.dob = "Date of birth is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.domicileState.trim()) newErrors.domicileState = "Domicile state is required";
    if (!form.govtIdType) newErrors.govtIdType = "Government ID type is required";
    if (!form.govtIdNumber.trim()) newErrors.govtIdNumber = "Government ID number is required";

    if (form.nationality !== "Indian") {
      newErrors.nationality =
        "Only Indian nationality is allowed for this application flow";
    }

    if (!form.correspondenceAddress.trim()) {
      newErrors.correspondenceAddress = "Correspondence address is required";
    }
    if (!form.permanentAddress.trim()) {
      newErrors.permanentAddress = "Permanent address is required";
    }
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";

    if (!form.pincode.trim()) {
      newErrors.pincode = "PIN code is required";
    } else if (!/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit PIN code";
    }

    if (needsGate) {
      if (!form.gatePaper.trim()) newErrors.gatePaper = "GATE paper is required";
      if (!form.gateYear.trim()) newErrors.gateYear = "GATE year is required";
      if (!form.gateScore.trim()) newErrors.gateScore = "GATE score is required";
    }

    if (needsNet) {
      if (!form.netSubject.trim()) newErrors.netSubject = "NET subject is required";
      if (!form.netYear.trim()) newErrors.netYear = "NET year is required";
      if (!form.netScore.trim()) newErrors.netScore = "NET score is required";
    }

    if (
      showCategoryCert &&
      form.category !== "General" &&
      !form.categoryCertificateNumber.trim()
    ) {
      newErrors.categoryCertificateNumber =
        "Category certificate number is required";
    }

    if (showPwdCert && !form.pwdCertificateNumber.trim()) {
      newErrors.pwdCertificateNumber = "PwD certificate number is required";
    }

    if (showExServicemanCert && !form.exServicemanCertificateNumber.trim()) {
      newErrors.exServicemanCertificateNumber =
        "Ex-serviceman certificate number is required";
    }

    if (!form.declaration) {
      newErrors.declaration = "Please accept the declaration";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    const finalComplete = isValid && completionCheck;

    saveApplicantProfile(form);
    setProfileComplete(finalComplete);
    setProfileCompleteState(finalComplete);

    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <ApplicantRibbon />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 p-6 text-white shadow-sm sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge className="border-0 bg-white/15 text-white dark:bg-white/15 dark:text-white">
                    Applicant Profile
                  </Badge>
                  <Badge
                    className={`border-0 ${
                      profileComplete
                        ? "bg-emerald-500/20 text-emerald-100"
                        : "bg-amber-500/20 text-amber-100"
                    }`}
                  >
                    {profileComplete ? "Profile Ready" : "Profile Incomplete"}
                  </Badge>
                </div>

                <h1 className="text-2xl font-semibold sm:text-3xl">
                  Complete Application Profile
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100 sm:text-[15px]">
                  Fill your personal, academic, exam, and eligibility details.
                  This profile is used for vacancy applications, verification,
                  and stage-wise shortlisting.
                </p>
              </div>

              <div className="min-w-[220px] rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-sm font-medium text-blue-100">
                  Completion Progress
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {completionPercent}%
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-500"
                    style={{ width: `${completionPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </section>

          {!isIndian && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300">
              This recruitment flow is currently restricted to Indian nationals only.
            </div>
          )}

          {saved && (
            <div
              className={`rounded-xl px-4 py-3 text-sm ${
                profileComplete
                  ? "border border-green-200 bg-green-50 text-green-700 dark:border-green-900/40 dark:bg-green-950/20 dark:text-green-300"
                  : "border border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-300"
              }`}
            >
              {profileComplete
                ? "Profile saved successfully and marked complete."
                : "Profile saved, but some required fields are still missing or invalid."}
            </div>
          )}

          <Card className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <section className="space-y-4">
                <SectionTitle
                  title="1. Personal Information"
                  subtitle="Basic personal details of the applicant."
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter full name" error={errors.fullName} />
                  <Input label="Father's Name" name="fatherName" value={form.fatherName} onChange={handleChange} placeholder="Enter father's name" error={errors.fatherName} />
                  <Input label="Mother's Name" name="motherName" value={form.motherName} onChange={handleChange} placeholder="Enter mother's name" />
                  <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter email" error={errors.email} />
                  <Input label="Mobile Number" name="mobile" value={form.mobile} onChange={handleChange} placeholder="Enter 10-digit mobile number" error={errors.mobile} />
                  <Input label="Date of Birth" type="date" name="dob" value={form.dob} onChange={handleChange} error={errors.dob} />
                  <SelectField label="Gender" name="gender" value={form.gender} onChange={handleChange} options={["Male", "Female", "Other"]} error={errors.gender} />
                  <SelectField label="Category" name="category" value={form.category} onChange={handleChange} options={["General", "EWS", "OBC-NCL", "SC", "ST"]} error={errors.category} />
                  <SelectField label="Nationality" name="nationality" value={form.nationality} onChange={handleChange} options={["Indian", "Other"]} error={errors.nationality} />
                  <Input label="Domicile State" name="domicileState" value={form.domicileState} onChange={handleChange} placeholder="Enter domicile state" error={errors.domicileState} />
                  <SelectField label="Govt. ID Type" name="govtIdType" value={form.govtIdType} onChange={handleChange} options={["Aadhaar", "PAN", "Passport", "Voter ID", "Driving Licence"]} error={errors.govtIdType} />
                  <Input label="Govt. ID Number" name="govtIdNumber" value={form.govtIdNumber} onChange={handleChange} placeholder="Enter ID number" error={errors.govtIdNumber} />
                  <SelectField label="PwD" name="isPwd" value={form.isPwd} onChange={handleChange} options={["Yes", "No"]} />
                  <SelectField label="Ex-Serviceman" name="isExServiceman" value={form.isExServiceman} onChange={handleChange} options={["Yes", "No"]} />
                  <SelectField label="Government Employee" name="isGovtEmployee" value={form.isGovtEmployee} onChange={handleChange} options={["Yes", "No"]} />
                </div>
              </section>

              <section className="space-y-4">
                <SectionTitle
                  title="2. Address Information"
                  subtitle="Communication and permanent address details."
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <TextAreaField label="Correspondence Address" name="correspondenceAddress" value={form.correspondenceAddress} onChange={handleChange} placeholder="Enter correspondence address" error={errors.correspondenceAddress} />
                  <TextAreaField label="Permanent Address" name="permanentAddress" value={form.permanentAddress} onChange={handleChange} placeholder="Enter permanent address" error={errors.permanentAddress} />
                  <Input label="City" name="city" value={form.city} onChange={handleChange} placeholder="Enter city" error={errors.city} />
                  <Input label="State" name="state" value={form.state} onChange={handleChange} placeholder="Enter state" error={errors.state} />
                  <Input label="PIN Code" name="pincode" value={form.pincode} onChange={handleChange} placeholder="Enter 6-digit PIN code" error={errors.pincode} />
                </div>
              </section>

              <section className="space-y-4">
                <SectionTitle
                  title="3. Class 10th Details"
                  subtitle="Used for academic record and date of birth verification."
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="Board" name="tenthBoard" value={form.tenthBoard} onChange={handleChange} placeholder="CBSE / State Board / ICSE" />
                  <Input label="School Name" name="tenthSchool" value={form.tenthSchool} onChange={handleChange} placeholder="Enter school name" />
                  <SelectField label="Year of Passing" name="tenthYear" value={form.tenthYear} onChange={handleChange} options={yearsList} />
                  <Input label="Percentage / CGPA" name="tenthPercentage" value={form.tenthPercentage} onChange={handleChange} placeholder="Enter percentage or CGPA" />
                  <Input label="Roll Number" name="tenthRollNumber" value={form.tenthRollNumber} onChange={handleChange} placeholder="Enter roll number" />
                </div>
              </section>

              <section className="space-y-4">
                <SectionTitle
                  title="4. Class 12th Details"
                  subtitle="Higher secondary academic information."
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="Board" name="twelfthBoard" value={form.twelfthBoard} onChange={handleChange} placeholder="CBSE / State Board / ICSE" />
                  <Input label="School Name" name="twelfthSchool" value={form.twelfthSchool} onChange={handleChange} placeholder="Enter school name" />
                  <SelectField label="Year of Passing" name="twelfthYear" value={form.twelfthYear} onChange={handleChange} options={yearsList} />
                  <Input label="Stream" name="twelfthStream" value={form.twelfthStream} onChange={handleChange} placeholder="PCM / PCB / Commerce / Arts" />
                  <Input label="Percentage / CGPA" name="twelfthPercentage" value={form.twelfthPercentage} onChange={handleChange} placeholder="Enter percentage or CGPA" />
                  <Input label="Roll Number" name="twelfthRollNumber" value={form.twelfthRollNumber} onChange={handleChange} placeholder="Enter roll number" />
                </div>
              </section>

              <section className="space-y-4">
                <SectionTitle
                  title="5. Graduation Details"
                  subtitle="Essential qualification details for the vacancy."
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="Degree" name="graduationDegree" value={form.graduationDegree} onChange={handleChange} placeholder="B.Tech / B.E. / B.Sc / M.Sc" />
                  <Input label="Discipline / Branch" name="graduationDiscipline" value={form.graduationDiscipline} onChange={handleChange} placeholder="Computer Science / Mechanical / Electronics" />
                  <Input label="Specialization" name="graduationSpecialization" value={form.graduationSpecialization} onChange={handleChange} placeholder="Enter specialization" />
                  <Input label="Institute" name="graduationInstitute" value={form.graduationInstitute} onChange={handleChange} placeholder="Enter institute name" />
                  <Input label="University" name="graduationUniversity" value={form.graduationUniversity} onChange={handleChange} placeholder="Enter university name" />
                  <SelectField label="Year of Passing" name="graduationYear" value={form.graduationYear} onChange={handleChange} options={yearsList} />
                  <Input label="Percentage / CGPA" name="graduationPercentage" value={form.graduationPercentage} onChange={handleChange} placeholder="Enter percentage or CGPA" />
                </div>
              </section>

              <section className="space-y-4">
                <SectionTitle
                  title="6. Higher Education"
                  subtitle="Post-graduation and PhD are optional unless required by discipline."
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <SelectField label="Do you have Post Graduation?" name="hasPostGraduation" value={form.hasPostGraduation} onChange={handleChange} options={["Yes", "No"]} />
                  <SelectField label="Do you have PhD?" name="hasPhd" value={form.hasPhd} onChange={handleChange} options={["Yes", "No"]} />
                </div>

                {showPg && (
                  <div className="grid gap-4 rounded-2xl border border-gray-200 p-4 md:grid-cols-2 dark:border-gray-700">
                    <Input label="PG Degree" name="pgDegree" value={form.pgDegree} onChange={handleChange} placeholder="M.Tech / M.E. / M.Sc" />
                    <Input label="PG Discipline" name="pgDiscipline" value={form.pgDiscipline} onChange={handleChange} placeholder="Enter discipline" />
                    <Input label="PG Institute" name="pgInstitute" value={form.pgInstitute} onChange={handleChange} placeholder="Enter institute" />
                    <Input label="PG University" name="pgUniversity" value={form.pgUniversity} onChange={handleChange} placeholder="Enter university" />
                    <SelectField label="PG Year of Passing" name="pgYear" value={form.pgYear} onChange={handleChange} options={yearsList} />
                    <Input label="PG Percentage / CGPA" name="pgPercentage" value={form.pgPercentage} onChange={handleChange} placeholder="Enter percentage or CGPA" />
                  </div>
                )}

                {showPhd && (
                  <div className="grid gap-4 rounded-2xl border border-gray-200 p-4 md:grid-cols-2 dark:border-gray-700">
                    <Input label="PhD Subject / Area" name="phdSubject" value={form.phdSubject} onChange={handleChange} placeholder="Enter PhD subject" />
                    <Input label="PhD Institute" name="phdInstitute" value={form.phdInstitute} onChange={handleChange} placeholder="Enter institute" />
                    <SelectField label="PhD Year of Completion" name="phdYear" value={form.phdYear} onChange={handleChange} options={yearsList} />
                    <Input label="Thesis Title" name="phdTitle" value={form.phdTitle} onChange={handleChange} placeholder="Enter thesis title" />
                  </div>
                )}
              </section>

              <section className="space-y-4">
                <SectionTitle
                  title="7. Eligibility Exam Details"
                  subtitle="Choose the qualifying exam route applicable to your discipline."
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <SelectField label="Discipline Type" name="disciplineType" value={form.disciplineType} onChange={handleChange} options={["Engineering", "Science", "Psychology", "Other"]} />
                  <SelectField label="Exam Type" name="examType" value={form.examType} onChange={handleChange} options={["GATE", "NET", "None"]} />
                </div>

                {needsGate && (
                  <div className="grid gap-4 rounded-2xl border border-gray-200 p-4 md:grid-cols-2 dark:border-gray-700">
                    <Input label="GATE Paper" name="gatePaper" value={form.gatePaper} onChange={handleChange} placeholder="CS / EC / ME / EE" error={errors.gatePaper} />
                    <SelectField label="GATE Year" name="gateYear" value={form.gateYear} onChange={handleChange} options={yearsList} error={errors.gateYear} />
                    <Input label="GATE Score" name="gateScore" value={form.gateScore} onChange={handleChange} placeholder="Enter GATE score" error={errors.gateScore} />
                    <Input label="GATE Rank" name="gateRank" value={form.gateRank} onChange={handleChange} placeholder="Enter all India rank" />
                  </div>
                )}

                {needsNet && (
                  <div className="grid gap-4 rounded-2xl border border-gray-200 p-4 md:grid-cols-2 dark:border-gray-700">
                    <Input label="NET Subject" name="netSubject" value={form.netSubject} onChange={handleChange} placeholder="Enter NET subject" error={errors.netSubject} />
                    <SelectField label="NET Year" name="netYear" value={form.netYear} onChange={handleChange} options={yearsList} error={errors.netYear} />
                    <Input label="NET Score / Percentile" name="netScore" value={form.netScore} onChange={handleChange} placeholder="Enter NET score" error={errors.netScore} />
                  </div>
                )}
              </section>

              <section className="space-y-4">
                <SectionTitle
                  title="8. Reservation / Certificate Details"
                  subtitle="Fill certificate details only if applicable."
                />

                <div className="grid gap-4 md:grid-cols-2">
                  {showCategoryCert && form.category !== "General" && (
                    <Input label="Category Certificate Number" name="categoryCertificateNumber" value={form.categoryCertificateNumber} onChange={handleChange} placeholder="Enter certificate number" error={errors.categoryCertificateNumber} />
                  )}

                  {form.category === "OBC-NCL" && (
                    <Input label="OBC-NCL Validity Year" name="obcNclValidYear" value={form.obcNclValidYear} onChange={handleChange} placeholder="Enter validity year" />
                  )}

                  {form.category === "EWS" && (
                    <Input label="EWS Validity Year" name="ewsValidYear" value={form.ewsValidYear} onChange={handleChange} placeholder="Enter validity year" />
                  )}

                  {showPwdCert && (
                    <Input label="PwD Certificate Number" name="pwdCertificateNumber" value={form.pwdCertificateNumber} onChange={handleChange} placeholder="Enter certificate number" error={errors.pwdCertificateNumber} />
                  )}

                  {showExServicemanCert && (
                    <Input label="Ex-Serviceman Certificate Number" name="exServicemanCertificateNumber" value={form.exServicemanCertificateNumber} onChange={handleChange} placeholder="Enter certificate number" error={errors.exServicemanCertificateNumber} />
                  )}
                </div>
              </section>

              <section className="space-y-4">
                <SectionTitle
                  title="9. Publications / Research Details"
                  subtitle="Optional research details, if available."
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="Number of Publications" name="publicationsCount" value={form.publicationsCount} onChange={handleChange} placeholder="Enter number of publications" />
                </div>

                <TextAreaField
                  label="Publication Details"
                  name="publicationsDetails"
                  value={form.publicationsDetails}
                  onChange={handleChange}
                  placeholder="Mention title, journal/conference, year, patents, or notable research work"
                  rows={5}
                />
              </section>

              <section className="space-y-4">
                <SectionTitle
                  title="10. Final Declaration"
                  subtitle="Required to mark the profile as complete."
                />

                <label className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">
                  <input
                    type="checkbox"
                    name="declaration"
                    checked={form.declaration}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4"
                  />
                  <span>
                    I hereby declare that all information entered in this profile is true,
                    complete, and correct to the best of my knowledge. I understand that
                    incorrect information may lead to rejection of my application.
                  </span>
                </label>

                {errors.declaration && (
                  <span className="text-sm text-red-600 dark:text-red-400">
                    {errors.declaration}
                  </span>
                )}
              </section>

              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit">Save Profile</Button>

                {profileComplete ? (
                  <Badge variant="success">Ready for Applications</Badge>
                ) : (
                  <Badge variant="warning">Incomplete Profile</Badge>
                )}
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}