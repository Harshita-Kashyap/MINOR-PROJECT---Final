import Header from "../components/landing/Header";
import SelectorRibbon from "../components/selector/SelectorRibbon";
import { useParams } from "react-router-dom";
import { useState } from "react";

const SelectorCandidateDetail = () => {
  const { id } = useParams();

  const [decision, setDecision] = useState("");
  const [remarks, setRemarks] = useState("");

  // 🔥 Dummy parsed data (replace with backend later)
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

      <div className="p-6 bg-gray-50 min-h-screen space-y-6">

        {/* 🔷 HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Candidate Detail</h1>
          <p className="text-gray-500">ID: {candidate.cid}</p>
        </div>

        {/* 🔷 PROFILE */}
        <Section title="Candidate Profile">
          <p>Name: {candidate.name}</p>
          <p>Email: {candidate.email}</p>
          <p>Phone: {candidate.phone}</p>
        </Section>

        {/* 🔷 PARSED RESUME */}
        <Section title="Parsed Resume Data">
          <p><b>Skills:</b> {candidate.skills.join(", ")}</p>
          <p><b>Education:</b> {candidate.education}</p>
          <p><b>Experience:</b> {candidate.experience}</p>
          <p><b>Projects:</b> {candidate.projects}</p>
        </Section>

        {/* 🔷 ELIGIBILITY */}
        <Section title="Eligibility Check">
          <p>GATE Qualified: ✅</p>
          <p>Minimum CGPA: ✅</p>
          <p>Age Criteria: ✅</p>
        </Section>

        {/* 🔷 SKILL MATCHING */}
        <Section title="Vacancy Matching">
          <p>Required Skills: React, Node, AI</p>
          <p>Matched Skills: React, Node</p>
          <p>Match Score: 80%</p>
        </Section>

        {/* 🔷 PROGRESS */}
        <Section title="Selection Progress">
          <Progress stage={candidate.stage} />
        </Section>

        {/* 🔷 SCORES */}
        <Section title="Evaluation Scores">
          <p>GATE Score: {candidate.gate}</p>
          <p>Technical Score: {candidate.technical}</p>
          <p>Personality Score: {candidate.personality}</p>
        </Section>

        {/* 🔷 VERIFICATION */}
        <Section title="Resume Verification">
          <p>Verification Score: {candidate.verificationScore}</p>
          <p>Status: <span className="text-green-600">Verified</span></p>
        </Section>

        {/* 🔷 DECISION PANEL */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-3 text-lg">Final Decision</h2>

          <select
            className="border p-2 rounded w-full"
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
          >
            <option>Select Decision</option>
            <option>Recommended for Selection</option>
            <option>Not Recommended</option>
            <option>Hold</option>
          </select>

          <textarea
            placeholder="Enter remarks..."
            className="w-full border p-3 rounded mt-4"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />

          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">
            Submit Decision
          </button>
        </div>

      </div>
    </>
  );
};

export default SelectorCandidateDetail;



/* 🔹 SECTION COMPONENT */
const Section = ({ title, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow">
    <h2 className="font-semibold mb-3 text-lg">{title}</h2>
    {children}
  </div>
);



/* 🔹 PROGRESS */
const Progress = ({ stage }) => {
  const steps = ["Screening", "Technical", "Interview", "Final"];

  return (
    <div className="flex gap-2 text-sm">
      {steps.map((step, i) => (
        <span
          key={i}
          className={`px-3 py-1 rounded ${
            steps.indexOf(stage) >= i
              ? "bg-green-500 text-white"
              : "bg-gray-200"
          }`}
        >
          {step}
        </span>
      ))}
    </div>
  );
};