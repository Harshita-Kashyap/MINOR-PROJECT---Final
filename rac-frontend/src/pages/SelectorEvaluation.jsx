import Header from "../components/landing/Header";
import SelectorRibbon from "../components/selector/SelectorRibbon";
import { useParams } from "react-router-dom";
import { useState } from "react";

const SelectorEvaluation = () => {
  const { id } = useParams();

  const [techScore, setTechScore] = useState(70);
  const [interviewScore, setInterviewScore] = useState(65);
  const [decision, setDecision] = useState("");
  const [remarks, setRemarks] = useState("");

  const total = Number(techScore) + Number(interviewScore);

  const getAutoDecision = () => {
    if (total > 150) return "Recommended";
    if (total > 120) return "Under Review";
    return "Not Recommended";
  };

  return (
    <>
      <Header />
      <SelectorRibbon />

      <div className="p-6 bg-gray-50 min-h-screen space-y-6">

        {/* 🔷 HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Candidate Evaluation</h1>
          <p className="text-gray-500">Candidate ID: RAC/2026/CS/{id}</p>
        </div>

        {/* 🔷 SUMMARY */}
        <div className="bg-white p-5 rounded-2xl shadow flex justify-between items-center">
          <div>
            <h2 className="font-semibold">Aditi Sharma</h2>
            <p className="text-gray-500">Scientist B (CS)</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Total Score</p>
            <h2 className="text-2xl font-bold text-blue-600">{total}</h2>
          </div>
        </div>

        {/* 🔷 GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* 🔥 SCORING */}
          <div className="bg-white p-5 rounded-2xl shadow space-y-4">
            <h2 className="font-semibold">Scoring Panel</h2>

            {/* Technical */}
            <div>
              <label className="text-sm">Technical Score</label>
              <input
                type="range"
                min="0"
                max="100"
                value={techScore}
                onChange={(e) => setTechScore(e.target.value)}
                className="w-full"
              />
              <p className="text-blue-600 font-semibold">{techScore}</p>
            </div>

            {/* Interview */}
            <div>
              <label className="text-sm">Interview Score</label>
              <input
                type="range"
                min="0"
                max="100"
                value={interviewScore}
                onChange={(e) => setInterviewScore(e.target.value)}
                className="w-full"
              />
              <p className="text-blue-600 font-semibold">{interviewScore}</p>
            </div>

            {/* AUTO DECISION */}
            <div className="mt-3">
              <p className="text-sm text-gray-500">System Suggestion</p>
              <p className="font-semibold text-green-600">
                {getAutoDecision()}
              </p>
            </div>
          </div>

          {/* 🔷 VERIFICATION */}
          <div className="bg-white p-5 rounded-2xl shadow space-y-2">
            <h2 className="font-semibold">Verification Summary</h2>
            <p>Resume: <span className="text-green-600">Verified ✔</span></p>
            <p>Documents: <span className="text-green-600">Verified ✔</span></p>
            <p>Risk Level: <span className="text-blue-600">Low</span></p>
          </div>

        </div>

        {/* 🔥 QUICK DECISION BUTTONS */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-semibold mb-3">Quick Decision</h2>

          <div className="flex gap-4">
            <button
              onClick={() => setDecision("Recommended")}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Recommend
            </button>

            <button
              onClick={() => setDecision("Not Recommended")}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Reject
            </button>

            <button
              onClick={() => setDecision("Hold")}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Hold
            </button>
          </div>

          <p className="mt-2 text-sm">
            Selected: <span className="font-semibold">{decision}</span>
          </p>
        </div>

        {/* 🔷 REMARKS */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-semibold mb-2">Evaluator Remarks</h2>

          <textarea
            placeholder="Write remarks..."
            className="w-full border p-3 rounded"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />

          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">
            Submit Evaluation
          </button>
        </div>

      </div>
    </>
  );
};

export default SelectorEvaluation;