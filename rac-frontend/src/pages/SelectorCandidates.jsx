import Header from "../components/landing/Header";
import SelectorRibbon from "../components/selector/SelectorRibbon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const candidatesData = [
  {
    id: 1,
    cid: "RAC/2026/CS/001",
    name: "Aditi Sharma",
    vacancy: "Scientist B (CS)",
    stage: "Interview",
    score: 78,
    status: "Under Review",
  },
  {
    id: 2,
    cid: "RAC/2026/ECE/014",
    name: "Rahul Verma",
    vacancy: "Scientist B (ECE)",
    stage: "Final",
    score: 82,
    status: "Recommended",
  },
];

const SelectorCandidates = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [vacancyFilter, setVacancyFilter] = useState("All");

  const filtered = candidatesData.filter((c) => {
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (vacancyFilter === "All" || c.vacancy === vacancyFilter)
    );
  });

  return (
    <>
      <Header />
      <SelectorRibbon />

      <div className="p-6 bg-gray-50 min-h-screen space-y-6">

        {/* 🔷 HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Shortlisted Candidates</h1>
          <p className="text-gray-500">
            RAC-DRDO Candidate Evaluation Panel
          </p>
        </div>

        {/* 🔷 SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search candidate..."
            className="border p-2 rounded w-full md:w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={vacancyFilter}
            onChange={(e) => setVacancyFilter(e.target.value)}
          >
            <option>All</option>
            <option>Scientist B (CS)</option>
            <option>Scientist B (ECE)</option>
          </select>

        </div>

        {/* 🔷 TABLE */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-3 text-left">Candidate ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Vacancy</th>
                <th className="p-3 text-left">Progress</th>
                <th className="p-3 text-left">Score</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">

                  {/* Candidate ID */}
                  <td className="p-3 text-gray-600">{c.cid}</td>

                  {/* Name */}
                  <td className="p-3 font-medium">{c.name}</td>

                  {/* Vacancy */}
                  <td className="p-3">{c.vacancy}</td>

                  {/* 🔥 Stage Pipeline */}
                  <td className="p-3">
                    <Progress stage={c.stage} />
                  </td>

                  {/* Score */}
                  <td className="p-3">{c.score}</td>

                  {/* Status */}
                  <td className="p-3">
                    <span className={getStatusColor(c.status)}>
                      {c.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/selector/candidate/${c.id}`)
                      }
                      className="text-blue-600 font-medium"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/selector/evaluation/${c.id}`)
                      }
                      className="text-green-600 font-medium"
                    >
                      Evaluate
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </>
  );
};

export default SelectorCandidates;



/* 🔹 STATUS COLORS */
const getStatusColor = (status) => {
  switch (status) {
    case "Under Review":
      return "text-blue-600 font-semibold";
    case "Recommended":
      return "text-green-600 font-semibold";
    case "Rejected":
      return "text-red-600 font-semibold";
    default:
      return "text-gray-600";
  }
};



/* 🔹 PROGRESS PIPELINE */
const Progress = ({ stage }) => {
  const steps = ["Screening", "Technical", "Interview", "Final"];

  return (
    <div className="flex text-xs gap-1">
      {steps.map((step, index) => (
        <span
          key={index}
          className={`px-2 py-1 rounded ${
            steps.indexOf(stage) >= index
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