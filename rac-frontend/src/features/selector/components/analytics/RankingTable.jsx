import Badge from "../../../../shared/components/ui/Badge";
import {
  formatStage,
  getCandidateName,
  getStageBadgeVariant,
  getVacancyTitle,
} from "../../utils/selectorHelpers";

export default function RankingTable({ candidates = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[820px] text-sm">
        <thead className="border-b border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-700/50 dark:text-gray-300">
          <tr>
            <th className="p-3 text-left">Rank</th>
            <th className="p-3 text-left">Candidate</th>
            <th className="p-3 text-left">Technical</th>
            <th className="p-3 text-left">Personality</th>
            <th className="p-3 text-left">Overall</th>
            <th className="p-3 text-left">Stage</th>
          </tr>
        </thead>

        <tbody>
          {candidates.length > 0 ? (
            candidates.map((candidate, index) => (
              <tr
                key={candidate._id || candidate.cid || `candidate-${index}`}
                className={`border-b border-gray-100 transition dark:border-gray-700 ${
                  index === 0
                    ? "bg-green-50/80 dark:bg-green-900/20"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700/30"
                }`}
              >
                <td className="p-3 font-semibold text-gray-800 dark:text-white">
                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : index + 1}
                </td>

                <td className="p-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800 dark:text-gray-100">
                      {getCandidateName(candidate)}
                    </span>

                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {getVacancyTitle(candidate)}
                    </span>
                  </div>
                </td>

                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {candidate.technicalScore ?? "-"}
                </td>

                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {candidate.personalityScore ?? "-"}
                </td>

                <td className="p-3">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {candidate.total ?? 0}
                  </span>
                </td>

                <td className="p-3">
                  <Badge
                    variant={getStageBadgeVariant(
                      candidate.normalizedStage,
                      candidate
                    )}
                  >
                    {formatStage(candidate.normalizedStage, candidate)}
                  </Badge>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="p-8 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                No candidates available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}