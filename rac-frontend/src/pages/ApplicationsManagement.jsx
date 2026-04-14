import AdminNavbar from "./AdminNavbar";

function ApplicationsManagement() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <AdminNavbar />

      <div className="p-6">
        <h2 className="text-2xl font-semibold dark:text-white">
          Applications Management
        </h2>

        <div className="bg-white dark:bg-gray-900 p-6 mt-4 rounded shadow">
          <p className="text-gray-500">
            Here you will display all applicants (Next Step 🔥)
          </p>
        </div>
      </div>
    </div>
  );
}

export default ApplicationsManagement;