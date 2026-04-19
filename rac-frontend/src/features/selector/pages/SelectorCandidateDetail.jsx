import Header from "../../landing/components/Header";
import SelectorRibbon from "../components/SelectorRibbon";
import { useParams } from "react-router-dom";
import { useState } from "react";

const SelectorCandidateDetail = () => {
  const { id } = useParams();

  const [decision, setDecision] = useState("");
  const [remarks, setRemarks] = useState("");

  // Dummy parsed data
  const candidate = {
    cid: "RAC/2026/CS/001",
    name: "Aditi Sharma",
    email: "aditi@gmail.com",
    phone: "9876543210",

    skills: ["React", "Node", "MongoDB"],
    education: "B.Tech (CSE) - 8.5 CGPA",
    experience: "1 year internship",
    projects: "AI Resume Parser",

    gate: 650,
    technical: 78,
    personality: 70,

    stage: "Interview",
    verificationScore: 82,
  };

  return (
    <>
      <Header />
      <SelectorRibbon />

      <div className="min-h-screen space-y-6 bg-gray-50 p-6 text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100">
        {/* HEADER */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Candidate Detail
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              ID: {candidate.cid}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge text="Interview Stage" color="blue" />
            <Badge text="Verified Profile" color="green" />
            <Badge text={`Match Score: 80%`} color="purple" />
          </div>
        </div>

        {/* TOP SUMMARY */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/30">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Candidate Profile
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoCard label="Name" value={candidate.name} />
              <InfoCard label="Email" value={candidate.email} />
              <InfoCard label="Phone" value={candidate.phone} />
              <InfoCard label="Education" value={candidate.education} />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/30">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Score Snapshot
            </h2>

            <div className="space-y-4">
              <ScoreRow label="GATE" value={candidate.gate} color="blue" />
              <ScoreRow
                label="Technical"
                value={candidate.technical}
                color="green"
              />
              <ScoreRow
                label="Personality"
                value={candidate.personality}
                color="purple"
              />
              <ScoreRow
                label="Verification"
                value={`${candidate.verificationScore}%`}
                color="amber"
              />
            </div>
          </div>
        </div>

        {/* MAIN DETAIL GRID */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Section title="Parsed Resume Data">
            <DetailItem label="Skills">
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </DetailItem>
            <DetailItem label="Education">{candidate.education}</DetailItem>
            <DetailItem label="Experience">{candidate.experience}</DetailItem>
            <DetailItem label="Projects">{candidate.projects}</DetailItem>
          </Section>

          <Section title="Eligibility Check">
            <ChecklistItem label="GATE Qualified" status="success" />
            <ChecklistItem label="Minimum CGPA" status="success" />
            <ChecklistItem label="Age Criteria" status="success" />
          </Section>

          <Section title="Vacancy Matching">
            <DetailItem label="Required Skills">React, Node, AI</DetailItem>
            <DetailItem label="Matched Skills">React, Node</DetailItem>
            <DetailItem label="Match Score">
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                80%
              </span>
            </DetailItem>
          </Section>

          <Section title="Selection Progress">
            <Progress stage={candidate.stage} />
          </Section>

          <Section title="Evaluation Scores">
            <DetailItem label="GATE Score">{candidate.gate}</DetailItem>
            <DetailItem label="Technical Score">{candidate.technical}</DetailItem>
            <DetailItem label="Personality Score">{candidate.personality}</DetailItem>
          </Section>

          <Section title="Resume Verification">
            <DetailItem label="Verification Score">
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {candidate.verificationScore}%
              </span>
            </DetailItem>
            <DetailItem label="Status">
              <span className="font-semibold text-green-600 dark:text-green-400">
                Verified
              </span>
            </DetailItem>
          </Section>
        </div>

        {/* FINAL DECISION */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/30">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Final Decision
          </h2>

          <div className="grid grid-cols-1 gap-4">
            <select
              className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900"
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
            >
              <option value="">Select Decision</option>
              <option>Recommended for Selection</option>
              <option>Not Recommended</option>
              <option>Hold</option>
            </select>

            <textarea
              placeholder="Enter remarks..."
              className="min-h-[140px] w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-900"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />

            <div className="flex justify-end">
              <button className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                Submit Decision
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectorCandidateDetail;

/* SECTION */
const Section = ({ title, children }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/30">
    <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
      {title}
    </h2>
    <div className="space-y-4">{children}</div>
  </div>
);

/* INFO CARD */
const InfoCard = ({ label, value }) => (
  <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700/40">
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className="mt-1 font-medium text-gray-800 dark:text-white">{value}</p>
  </div>
);

/* DETAIL ITEM */
const DetailItem = ({ label, children }) => (
  <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700/40">
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <div className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-100">
      {children}
    </div>
  </div>
);

/* SCORE ROW */
const ScoreRow = ({ label, value, color = "blue" }) => {
  const colorMap = {
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    green:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    purple:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    amber:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  };

  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-700/40">
      <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${colorMap[color]}`}
      >
        {value}
      </span>
    </div>
  );
};

/* BADGE */
const Badge = ({ text, color = "blue" }) => {
  const colorMap = {
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    green:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    purple:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colorMap[color]}`}>
      {text}
    </span>
  );
};

/* CHECKLIST ITEM */
const ChecklistItem = ({ label, status = "success" }) => {
  const statusMap = {
    success: "text-green-600 dark:text-green-400",
    warning: "text-yellow-600 dark:text-yellow-400",
    danger: "text-red-600 dark:text-red-400",
  };

  const statusText = {
    success: "Passed ✔",
    warning: "Pending",
    danger: "Failed",
  };

  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-700/40">
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
      <span className={`text-sm font-semibold ${statusMap[status]}`}>
        {statusText[status]}
      </span>
    </div>
  );
};

/* PROGRESS */
const Progress = ({ stage }) => {
  const steps = ["Screening", "Technical", "Interview", "Final"];
  const currentIndex = steps.indexOf(stage);

  return (
    <div className="flex flex-wrap gap-2">
      {steps.map((step, i) => (
        <span
          key={i}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
            currentIndex >= i
              ? "bg-green-500 text-white dark:bg-green-600"
              : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {step}
        </span>
      ))}
    </div>
  );
};