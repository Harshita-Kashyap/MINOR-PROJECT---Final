import Header from "../components/common/Header";
import AdminNavbar from "../components/admin/AdminNavbar";

function Shortlisting() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <Header />
      <AdminNavbar />

      <main className="p-6 space-y-6">

        {/* PAGE HEADER */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Shortlisting Candidates
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Review applications and shortlist candidates for further stages.
          </p>
        </div>

        {/* FILTER / CONTROLS (future ready) */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm flex flex-wrap gap-4 items-center">
          <select className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-800 dark:text-white">
            <option>All Vacancies</option>
            <option>Software Engineer</option>
            <option>Mechanical Engineer</option>
          </select>

          <select className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-800 dark:text-white">
            <option>All Status</option>
            <option>Pending</option>
            <option>Shortlisted</option>
            <option>Rejected</option>
          </select>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
            Apply Filters
          </button>
        </div>

        {/* TABLE / LIST */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">

          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Candidate Applications
          </h3>

          {/* Placeholder Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
              <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Vacancy</th>
                  <th className="px-4 py-2">Score</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <td className="px-4 py-3">Aman Sharma</td>
                  <td className="px-4 py-3">Software Engineer</td>
                  <td className="px-4 py-3">85%</td>
                  <td className="px-4 py-3 text-yellow-500">Pending</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">
                      Shortlist
                    </button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700">
                      Reject
                    </button>
                  </td>
                </tr>

                <tr className="border-b dark:border-gray-700">
                  <td className="px-4 py-3">Priya Verma</td>
                  <td className="px-4 py-3">Mechanical Engineer</td>
                  <td className="px-4 py-3">78%</td>
                  <td className="px-4 py-3 text-green-500">Shortlisted</td>
                  <td className="px-4 py-3 text-gray-400">
                    —
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

      </main>
    </div>
  );
}

export default Shortlisting;