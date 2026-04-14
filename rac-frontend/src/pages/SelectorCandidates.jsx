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

      <div className="min-h-screen space-y-6 bg-gray-50 p-6 text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Shortlisted Candidates
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            RAC-DRDO Candidate Evaluation Panel
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="rounded-2xl bg-white p-4 shadow-sm transition dark:bg-gray-800 dark:shadow-gray-950/30">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <input
              type="text"
              placeholder="Search candidate..."
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-900 md:w-1/3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900"
              value={vacancyFilter}
              onChange={(e) => setVacancyFilter(e.target.value)}
            >
              <option>All</option>
              <option>Scientist B (CS)</option>
              <option>Scientist B (ECE)</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm transition dark:bg-gray-800 dark:shadow-gray-950/30">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-100 text-sm text-gray-700 dark:bg-gray-700/60 dark:text-gray-300">
                <tr>
                  <th className="p-4 text-left font-semibold">Candidate ID</th>
                  <th className="p-4 text-left font-semibold">Name</th>
                  <th className="p-4 text-left font-semibold">Vacancy</th>
                  <th className="p-4 text-left font-semibold">Progress</th>
                  <th className="p-4 text-left font-semibold">Score</th>
                  <th className="p-4 text-left font-semibold">Status</th>
                  <th className="p-4 text-left font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b border-gray-200 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/30"
                    >
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                        {c.cid}
                      </td>

                      <td className="p-4 font-medium text-gray-800 dark:text-white">
                        {c.name}
                      </td>

                      <td className="p-4 text-sm text-gray-700 dark:text-gray-300">
                        {c.vacancy}
                      </td>

                      <td className="p-4">
                        <Progress stage={c.stage} />
                      </td>

                      <td className="p-4">
                        <span className="font-semibold text-gray-800 dark:text-gray-100">
                          {c.score}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className={getStatusColor(c.status)}>
                          {c.status}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() =>
                              navigate(`/selector/candidate/${c.id}`)
                            }
                            className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                          >
                            View
                          </button>

                          <button
                            onClick={() =>
                              navigate(`/selector/evaluation/${c.id}`)
                            }
                            className="rounded-lg bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 transition hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
                          >
                            Evaluate
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="p-8 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      No candidates found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectorCandidates;

/* STATUS COLORS */
const getStatusColor = (status) => {
  switch (status) {
    case "Under Review":
      return "inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
    case "Recommended":
      return "inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300";
    case "Rejected":
      return "inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300";
    default:
      return "inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300";
  }
};

/* PROGRESS PIPELINE */
const Progress = ({ stage }) => {
  const steps = ["Screening", "Technical", "Interview", "Final"];
  const currentIndex = steps.indexOf(stage);

  return (
    <div className="flex flex-wrap gap-1.5">
      {steps.map((step, index) => {
        const active = currentIndex >= index;

        return (
          <span
            key={index}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
              active
                ? "bg-green-500 text-white dark:bg-green-600"
                : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {step}
          </span>
        );
      })}
    </div>
  );
};