import AdminNavbar from "../components/admin/AdminNavbar";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      
      {/* NAVBAR */}
      <AdminNavbar />

      {/* CONTENT */}
      <div className="p-6">
        
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Dashboard Overview
        </h2>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
            <h3 className="text-gray-600 dark:text-gray-300">Total Vacancies</h3>
            <p className="text-2xl font-bold text-blue-600">10</p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
            <h3 className="text-gray-600 dark:text-gray-300">Applications</h3>
            <p className="text-2xl font-bold text-green-600">45</p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
            <h3 className="text-gray-600 dark:text-gray-300">Shortlisted</h3>
            <p className="text-2xl font-bold text-yellow-500">12</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;