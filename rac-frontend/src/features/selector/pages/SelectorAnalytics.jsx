import Header from "../../landing/components/Header";
import SelectorRibbon from "../components/SelectorRibbon";
import useTheme from "../../../shared/hooks/useTheme";
import { useEffect, useMemo, useState } from "react";
import { getSelectorCandidates } from "../services/selectorService";

import Panel from "../components/analytics/Panel";
import MetricCard from "../components/analytics/MetricCard";
import AnalyticsFilters from "../components/analytics/AnalyticsFilters";
import ScoreChart from "../components/analytics/ScoreChart";
import RankingTable from "../components/analytics/RankingTable";
import WorkflowInsights from "../components/analytics/WorkflowInsights";

import {
  filterCandidates,
  getAnalyticsMetrics,
  getChartData,
  getTopCandidates,
  getVacancyList,
} from "../utils/selectorAnalyticsUtils";

export default function SelectorAnalytics() {
  const { dark } = useTheme();

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedVacancy, setSelectedVacancy] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
  const [limit, setLimit] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSelectorCandidates();
        setCandidates(Array.isArray(res.candidates) ? res.candidates : []);
      } catch (err) {
        console.error("Selector analytics error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const vacancies = useMemo(() => getVacancyList(candidates), [candidates]);

  const filteredCandidates = useMemo(() => {
    return filterCandidates(candidates, {
      vacancy: selectedVacancy,
      stage: selectedStage,
    });
  }, [candidates, selectedVacancy, selectedStage]);

  const topCandidates = useMemo(() => {
    return getTopCandidates(filteredCandidates, limit);
  }, [filteredCandidates, limit]);

  const chartData = useMemo(() => {
    return getChartData(topCandidates);
  }, [topCandidates]);

  const analytics = useMemo(() => {
    return getAnalyticsMetrics(filteredCandidates);
  }, [filteredCandidates]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <SelectorRibbon />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 p-6 text-white shadow-sm sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

            <div className="relative">
              <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-blue-100">
                Selector Analytics
              </p>

              <h1 className="text-2xl font-semibold sm:text-3xl">
                Vacancy-wise assessment scores and workflow readiness
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
                Filter candidates by vacancy, workflow stage, and visible chart
                limit to inspect technical, personality, and overall scores clearly.
              </p>
            </div>
          </section>

          {loading ? (
            <Panel>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loading analytics...
              </p>
            </Panel>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                  title="Filtered Candidates"
                  value={filteredCandidates.length}
                  note="Based on selected filters"
                  accent="blue"
                />

                <MetricCard
                  title="Avg Technical"
                  value={analytics.averageTechnical}
                  note="Filtered technical average"
                  accent="green"
                />

                <MetricCard
                  title="Avg Personality"
                  value={analytics.averagePersonality}
                  note="Filtered personality average"
                  accent="purple"
                />

                <MetricCard
                  title="Final Review Pool"
                  value={analytics.finalReviewCount}
                  note="Ready for final judgement"
                  accent="amber"
                />
              </div>

              <Panel>
                <div className="mb-5 space-y-4 border-b border-gray-200 pb-5 dark:border-gray-700">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Candidate Score Overview
                    </h2>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Vacancy-wise score chart with stage and candidate limit filters.
                    </p>
                  </div>

                  <AnalyticsFilters
                    vacancies={vacancies}
                    selectedVacancy={selectedVacancy}
                    setSelectedVacancy={setSelectedVacancy}
                    selectedStage={selectedStage}
                    setSelectedStage={setSelectedStage}
                    limit={limit}
                    setLimit={setLimit}
                  />

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Showing {topCandidates.length} of {filteredCandidates.length} matching candidates.
                  </p>
                </div>

                <ScoreChart data={chartData} dark={dark} />
              </Panel>

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <Panel className="xl:col-span-2">
                  <div className="mb-5">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Candidate Ranking
                    </h2>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Ranked by backend overall score using selected filters.
                    </p>
                  </div>

                  <RankingTable candidates={topCandidates} />
                </Panel>

                <Panel>
                  <div className="mb-5">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Workflow Insights
                    </h2>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Stage movement based on selected filters.
                    </p>
                  </div>

                  <WorkflowInsights analytics={analytics} />
                </Panel>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}