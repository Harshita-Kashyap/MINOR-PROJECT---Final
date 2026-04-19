import Header from "../../landing/components/Header";
import SelectorRibbon from "../components/SelectorRibbon";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const SelectorCandidates = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [vacancyFilter, setVacancyFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:5000/api";

  // 🔥 Fetch real data
  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${API}/applications`);

      // Map backend data to your UI structure
      const mapped = res.data.map((app) => ({
        id: app.id,
        cid: `RAC/2026/${app.id}`, // generated ID
        name: app.name,
        vacancy: app.title,
        stage: "Screening", // default stage
        score: app.score || 0,
        status: app.status,
      }));

      setApplications(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // 🔥 Update status (SELECT / REJECT)
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/status`, { id, status });
      fetchApplications(); // refresh table
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 Filter
  const filtered = applications.filter((c) => {
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (vacancyFilter === "All" || c.vacancy === vacancyFilter)
    );
  });

  return (
    <>
      <Header />
      <SelectorRibbon />

      <div className="min-h-screen space-y-6 bg-gray-50 p-6 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Candidate Applications
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            RAC-DRDO Candidate Evaluation Panel
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <input
              type="text"
              placeholder="Search candidate..."
              className="w-full rounded-xl border px-4 py-2.5 text-sm dark:bg-gray-900 dark:text-white md:w-1/3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="rounded-xl border px-4 py-2.5 text-sm dark:bg-gray-900 dark:text-white"
              value={vacancyFilter}
              onChange={(e) => setVacancyFilter(e.target.value)}
            >
              <option>All</option>
              {[...new Set(applications.map((v) => v.vacancy))].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>

          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">

              <thead className="bg-gray-100 text-sm dark:bg-gray-700">
                <tr>
                  <th className="p-4">Candidate ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Vacancy</th>
                  <th className="p-4">Progress</th>
                  <th className="p-4">Score</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="p-6 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : filtered.length > 0 ? (
                  filtered.map((c) => (
                    <tr key={c.id} className="border-t">

                      <td className="p-4 text-sm text-gray-500">{c.cid}</td>
                      <td className="p-4 font-medium">{c.name}</td>
                      <td className="p-4">{c.vacancy}</td>

                      <td className="p-4">
                        <Progress stage={c.stage} />
                      </td>

                      <td className="p-4 font-semibold">{c.score}</td>

                      <td className="p-4">
                        <span className={getStatusColor(c.status)}>
                          {c.status}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2 flex-wrap">

                          {/* SELECT */}
                          <button
                            onClick={() => updateStatus(c.id, "Selected")}
                            className="bg-green-600 text-white px-3 py-1 rounded"
                          >
                            Select
                          </button>

                          {/* REJECT */}
                          <button
                            onClick={() => updateStatus(c.id, "Rejected")}
                            className="bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Reject
                          </button>

                          {/* VIEW */}
                          <button
                            onClick={() =>
                              navigate(`/selector/candidate/${c.id}`)
                            }
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                          >
                            View
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-6 text-center">
                      No candidates found
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
    case "Selected":
      return "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs";
    case "Rejected":
      return "bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs";
    case "Applied":
      return "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs";
    default:
      return "bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs";
  }
};

/* PROGRESS */
const Progress = ({ stage }) => {
  const steps = ["Screening", "Technical", "Interview", "Final"];
  const currentIndex = steps.indexOf(stage);

  return (
    <div className="flex gap-1 flex-wrap">
      {steps.map((step, index) => (
        <span
          key={index}
          className={`px-2 py-1 text-xs rounded ${
            currentIndex >= index
              ? "bg-green-500 text-white"
              : "bg-gray-300"
          }`}
        >
          {step}
        </span>
      ))}
    </div>
  );
};