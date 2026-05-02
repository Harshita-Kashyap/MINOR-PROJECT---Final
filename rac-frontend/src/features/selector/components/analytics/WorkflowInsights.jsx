export default function WorkflowInsights({ analytics }) {
  return (
    <div className="space-y-3">
      <InsightCard
        label="Verified Eligible"
        value={analytics.verifiedEligibleCount}
        accent="green"
      />

      <InsightCard
        label="Technical Submitted"
        value={analytics.technicalSubmittedCount}
        accent="blue"
      />

      <InsightCard
        label="Technical Qualified"
        value={analytics.technicalQualifiedCount}
        accent="green"
      />

      <InsightCard
        label="Personality Assigned"
        value={analytics.personalityAssignedCount}
        accent="amber"
      />

      <InsightCard
        label="Final Review"
        value={analytics.finalReviewCount}
        accent="blue"
      />

      <InsightCard
        label="Completed Decisions"
        value={analytics.completedCount}
        accent="green"
      />

      <InsightCard
        label="Verification Rejected"
        value={analytics.rejectedCount}
        accent="red"
      />
    </div>
  );
}

function InsightCard({ label, value, accent = "blue" }) {
  const accentMap = {
    green:
      "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300",
    red: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300",
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
    amber:
      "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300",
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/40">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>

      <div className="mt-3">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
            accentMap[accent] || accentMap.blue
          }`}
        >
          {value ?? 0}
        </span>
      </div>
    </div>
  );
}