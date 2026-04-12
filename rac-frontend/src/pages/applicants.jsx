import DashboardLayout from "../layouts/DashboardLayout";

function Applicants() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold mb-6">
        Applicants List
      </h2>

      <div className="bg-white rounded-lg shadow-sm border p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-600 text-sm">
              <th className="p-2">Name</th>
              <th className="p-2">Position</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-2">Rahul Sharma</td>
              <td className="p-2">Scientist B</td>
              <td className="p-2 text-green-600">Selected</td>
            </tr>

            <tr className="border-b">
              <td className="p-2">Anita Verma</td>
              <td className="p-2">Engineer</td>
              <td className="p-2 text-yellow-600">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Applicants;