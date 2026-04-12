import DashboardLayout from "../layouts/DashboardLayout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

function AdminDashboard() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold mb-6">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-3 gap-6">
        <Card>
          <p>Total Applicants</p>
          <h3 className="text-xl font-bold">120</h3>
        </Card>

        <Card>
          <p>Interviews Scheduled</p>
          <h3 className="text-xl font-bold">45</h3>
        </Card>

        <Card>
          <p>Selected Candidates</p>
          <h3 className="text-xl font-bold">10</h3>
        </Card>
      </div>

      <div className="mt-6">
        <Button>Generate Report</Button>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;