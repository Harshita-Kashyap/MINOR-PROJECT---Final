import Header from "../../landing/components/Header";
import SelectorRibbon from "../components/SelectorRibbon";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  const autoDecision = getAutoDecision();

  return (
    <>
      <Header />
      <SelectorRibbon />

      <div className="min-h-screen space-y-6 bg-gray-50 p-6 text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Candidate Evaluation
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Candidate ID: RAC/2026/CS/{id}
          </p>
        </div>

        {/* SUMMARY */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/30 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Aditi Sharma
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Scientist B (CS)
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                Interview Stage
              </span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                Verified Profile
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-gray-50 px-5 py-4 text-left dark:bg-gray-700/40 md:text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Score
            </p>
            <h2 className="mt-1 text-3xl font-bold text-blue-600 dark:text-blue-400">
              {total}
            </h2>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Technical + Interview
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* SCORING */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/30">
            <h2 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white">
              Scoring Panel
            </h2>

            <div className="space-y-6">
              {/* Technical */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Technical Score
                  </label>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {techScore}/100
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={techScore}
                  onChange={(e) => setTechScore(e.target.value)}
                  className="w-full accent-blue-600 dark:accent-blue-400"
                />
              </div>

              {/* Interview */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Interview Score
                  </label>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {interviewScore}/100
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={interviewScore}
                  onChange={(e) => setInterviewScore(e.target.value)}
                  className="w-full accent-blue-600 dark:accent-blue-400"
                />
              </div>

              {/* AUTO DECISION */}
              <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700/40">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  System Suggestion
                </p>
                <div className="mt-2">
                  <span className={getDecisionBadge(autoDecision)}>
                    {autoDecision}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* VERIFICATION */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/30">
            <h2 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white">
              Verification Summary
            </h2>

            <div className="space-y-4">
              <InfoRow
                label="Resume"
                value="Verified ✔"
                valueClass="text-green-600 dark:text-green-400"
              />
              <InfoRow
                label="Documents"
                value="Verified ✔"
                valueClass="text-green-600 dark:text-green-400"
              />
              <InfoRow
                label="Risk Level"
                value="Low"
                valueClass="text-blue-600 dark:text-blue-400"
              />
              <InfoRow
                label="Background Check"
                value="Clear"
                valueClass="text-green-600 dark:text-green-400"
              />
            </div>
          </div>
        </div>

        {/* QUICK DECISION */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/30">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Quick Decision
          </h2>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setDecision("Recommended")}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                decision === "Recommended"
                  ? "bg-green-600 text-white shadow"
                  : "bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-900/30"
              }`}
            >
              Recommend
            </button>

            <button
              onClick={() => setDecision("Not Recommended")}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                decision === "Not Recommended"
                  ? "bg-red-600 text-white shadow"
                  : "bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30"
              }`}
            >
              Reject
            </button>

            <button
              onClick={() => setDecision("Hold")}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                decision === "Hold"
                  ? "bg-yellow-500 text-white shadow"
                  : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-300 dark:hover:bg-yellow-900/30"
              }`}
            >
              Hold
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            Selected:{" "}
            <span className="font-semibold text-gray-800 dark:text-white">
              {decision || "No decision selected"}
            </span>
          </p>
        </div>

        {/* REMARKS */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/30">
          <h2 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white">
            Evaluator Remarks
          </h2>

          <textarea
            placeholder="Write remarks..."
            className="min-h-[140px] w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-900"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />

          <div className="mt-4 flex justify-end">
            <button className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              Submit Evaluation
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectorEvaluation;

/* INFO ROW */
const InfoRow = ({ label, value, valueClass = "" }) => (
  <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-700/40">
    <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
    <span className={`text-sm font-semibold ${valueClass}`}>{value}</span>
  </div>
);

/* DECISION BADGE */
const getDecisionBadge = (decision) => {
  switch (decision) {
    case "Recommended":
      return "inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300";
    case "Under Review":
      return "inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
    case "Not Recommended":
      return "inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300";
    default:
      return "inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300";
  }
};