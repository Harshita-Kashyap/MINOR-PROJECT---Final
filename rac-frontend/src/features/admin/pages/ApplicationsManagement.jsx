import { useEffect, useMemo, useState } from "react";
import Header from "../../landing/components/Header";
import AdminNavbar from "../components/AdminNavbar";
import Card from "../../../shared/components/ui/Card";
import Input from "../../../shared/components/ui/Input";
import { getAdminApplications } from "../services/adminService";

function ApplicationsManagement() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [verificationFilter, setVerificationFilter] = useState("");
  const [finalFilter, setFinalFilter] = useState("");
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {};
      if (stageFilter) params.stage = stageFilter;
      if (verificationFilter) params.verificationStatus = verificationFilter;
      if (finalFilter) params.finalStatus = finalFilter;

      const res = await getAdminApplications(params);
      setApplications(Array.isArray(res.data?.applications) ? res.data.applications : []);
    } catch (error) {
      console.error("Admin applications fetch error:", error);
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [stageFilter, verificationFilter, finalFilter]);

  const getCandidateName = (app) =>
    app.profileId?.fullName || app.userId?.name || "Candidate";

  const getCandidateEmail = (app) =>
    app.userId?.email || app.profileId?.email || "-";

  const getVacancyTitle = (app) =>
    app.vacancyId?.title || app.vacancyTitle || "-";

  const filteredApplications = useMemo(() => {
    if (!search.trim()) return applications;

    const term = search.toLowerCase();

    return applications.filter(
      (app) =>
        getCandidateName(app).toLowerCase().includes(term) ||
        getCandidateEmail(app).toLowerCase().includes(term) ||
        getVacancyTitle(app).toLowerCase().includes(term) ||
        app.applicationId?.toLowerCase().includes(term)
    );
  }, [applications, search]);

  const counts = {
    total: applications.length,
    verificationReview: applications.filter((app) => app.verificationStatus === "REVIEW").length,
    technicalQualified: applications.filter((app) => app.technicalTestStatus === "QUALIFIED").length,
    finalReview: applications.filter((app) => app.currentStage === "FINAL_REVIEW").length,
    selected: applications.filter((app) => app.finalStatus === "SELECTED").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-[#030712] dark:via-[#0b1220] dark:to-[#111827]">
      <Header />
      <AdminNavbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Applications Monitoring
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Read-only monitoring of applicant progress. Admin does not verify, shortlist, or decide candidates.
            </p>
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <MetricCard title="Total" value={counts.total} />
            <MetricCard title="Verification Review" value={counts.verificationReview} tone="warning" />
            <MetricCard title="Technical Qualified" value={counts.technicalQualified} tone="success" />
            <MetricCard title="Final Review" value={counts.finalReview} tone="info" />
            <MetricCard title="Selected" value={counts.selected} tone="success" />
          </section>

          <Card>
            <div className="grid gap-4 lg:grid-cols-4">
              <Input
                placeholder="Search candidate, email, vacancy, application ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Select
                value={stageFilter}
                onChange={setStageFilter}
                options={[
                  ["", "All Stages"],
                  ["APPLIED", "Applied"],
                  ["VERIFICATION_PENDING", "Verification Pending"],
                  ["VERIFICATION_ELIGIBLE", "Verification Eligible"],
                  ["VERIFICATION_REVIEW", "Verification Review"],
                  ["VERIFICATION_REJECTED", "Verification Rejected"],
                  ["TECHNICAL_TEST_ASSIGNED", "Technical Assigned"],
                  ["TECHNICAL_TEST_SUBMITTED", "Technical Submitted"],
                  ["TECHNICAL_QUALIFIED", "Technical Qualified"],
                  ["TECHNICAL_REJECTED", "Technical Rejected"],
                  ["PERSONALITY_TEST_ASSIGNED", "Personality Assigned"],
                  ["PERSONALITY_TEST_SUBMITTED", "Personality Submitted"],
                  ["FINAL_REVIEW", "Final Review"],
                  ["SELECTED", "Selected"],
                  ["WAITLISTED", "Waitlisted"],
                  ["FINAL_REJECTED", "Final Rejected"],
                ]}
              />

              <Select
                value={verificationFilter}
                onChange={setVerificationFilter}
                options={[
                  ["", "All Verification"],
                  ["PENDING", "Pending"],
                  ["ELIGIBLE", "Eligible"],
                  ["REVIEW", "Review"],
                  ["REJECTED", "Rejected"],
                ]}
              />

              <Select
                value={finalFilter}
                onChange={setFinalFilter}
                options={[
                  ["", "All Final Status"],
                  ["NOT_DECIDED", "Not Decided"],
                  ["SELECTED", "Selected"],
                  ["WAITLISTED", "Waitlisted"],
                  ["REJECTED", "Rejected"],
                ]}
              />
            </div>
          </Card>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <Card className="overflow-hidden p-0">
            {loading ? (
              <div className="p-10 text-center text-gray-500">
                Loading applications...
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                No applications found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1250px] text-left">
                  <thead className="bg-gray-100 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    <tr>
                      <th className="p-4">Application ID</th>
                      <th className="p-4">Candidate</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Vacancy</th>
                      <th className="p-4">Stage</th>
                      <th className="p-4">Verification</th>
                      <th className="p-4">Technical</th>
                      <th className="p-4">Personality</th>
                      <th className="p-4">Final</th>
                      <th className="p-4">Scores</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredApplications.map((app) => (
                      <tr key={app._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-300">
                          {app.applicationId || "-"}
                        </td>
                        <td className="p-4 font-medium text-gray-800 dark:text-gray-100">
                          {getCandidateName(app)}
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          {getCandidateEmail(app)}
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          {getVacancyTitle(app)}
                        </td>
                        <td className="p-4">
                          <Pill value={app.currentStage} />
                        </td>
                        <td className="p-4">
                          <Pill value={app.verificationStatus} />
                        </td>
                        <td className="p-4">
                          <Pill value={app.technicalTestStatus} />
                        </td>
                        <td className="p-4">
                          <Pill value={app.personalityTestStatus} />
                        </td>
                        <td className="p-4">
                          <Pill value={app.finalStatus} />
                        </td>
                        <td className="p-4">
                          <ScoreGroup
                            technical={app.technicalScore}
                            personality={app.personalityScore}
                            overall={app.overallScore}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
    >
      {options.map(([val, label]) => (
        <option key={val || "all"} value={val}>
          {label}
        </option>
      ))}
    </select>
  );
}

function Pill({ value }) {
  return (
    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
      {value || "-"}
    </span>
  );
}

function ScoreGroup({ technical, personality, overall }) {
  return (
    <div className="flex min-w-[190px] flex-col gap-2">
      <ScoreItem label="Technical" value={technical} />
      <ScoreItem label="Personality" value={personality} />
      <ScoreItem label="Overall" value={overall} highlight />
    </div>
  );
}

function ScoreItem({ label, value, highlight = false }) {
  const displayValue = value === null || value === undefined ? "-" : value;

  return (
    <div
      className={`flex items-center justify-between rounded-lg border px-3 py-1.5 text-xs ${
        highlight
          ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300"
          : "border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-300"
      }`}
    >
      <span>{label}</span>
      <span className="font-semibold">{displayValue}</span>
    </div>
  );
}

function MetricCard({ title, value, tone }) {
  const toneMap = {
    default: "from-gray-50 to-white dark:from-gray-900 dark:to-gray-800",
    warning: "from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-gray-800",
    success: "from-green-50 to-emerald-50 dark:from-emerald-950/30 dark:to-gray-800",
    info: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-gray-800",
  };

  return (
    <Card className={`bg-gradient-to-br ${toneMap[tone || "default"]}`}>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-gray-100">
        {value}
      </h3>
    </Card>
  );
}

export default ApplicationsManagement;