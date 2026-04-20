import Header from "../components/landing/Header";
import SelectorRibbon from "../components/selector/SelectorRibbon";

const SelectorDashboard = () => {
  return (
    <>
      <Header />
      <SelectorRibbon />

      <div className="min-h-screen space-y-8 bg-gray-50 p-6 text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Selector Dashboard
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Monitor candidate progress and evaluation workflow
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
          <Card
            title="Assigned"
            value="25"
            color="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          />
          <Card
            title="Pending"
            value="10"
            color="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
          />
          <Card
            title="Completed"
            value="15"
            color="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
          />
          <Card
            title="Recommended"
            value="5"
            color="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
          />
          <Card
            title="Rejected"
            value="3"
            color="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
          />
        </div>

        {/* GRID SECTIONS */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Section title="Candidates per Vacancy">
            <Item label="Scientist B (CS)" value="12" />
            <Item label="Scientist B (ECE)" value="8" />
            <Item label="Scientist B (ME)" value="5" />
          </Section>

          <Section title="Stage-wise Progress">
            <Item label="Resume Screening" value="20 Completed" />
            <Item label="Technical Test" value="15 Completed" />
            <Item label="Personality Test" value="10 Pending" />
          </Section>

          <Section title="Recent Activity">
            <List
              items={[
                "Aditi Sharma evaluated – Recommended",
                "Rahul Verma pending for technical test",
                "Neha Singh moved to personality round",
              ]}
            />
          </Section>

          <Section title="Action Required">
            <List
              items={[
                "10 candidates pending evaluation",
                "5 candidates awaiting decision",
              ]}
              color="text-red-500 dark:text-red-400"
            />
          </Section>
        </div>

        {/* TOP CANDIDATES */}
        <div className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg dark:bg-gray-800 dark:shadow-gray-950/30">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Top Candidates
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400">
                  <th className="p-2 text-left">Rank</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Score</th>
                </tr>
              </thead>

              <tbody className="text-gray-700 dark:text-gray-200">
                <tr className="transition hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="p-2">1</td>
                  <td className="p-2">Aditi Sharma</td>
                  <td className="p-2 font-semibold text-green-600 dark:text-green-400">
                    85
                  </td>
                </tr>

                <tr className="transition hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="p-2">2</td>
                  <td className="p-2">Rahul Verma</td>
                  <td className="p-2 font-semibold text-blue-600 dark:text-blue-400">
                    80
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ALERTS */}
        <div className="rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-5 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-100">
          <h2 className="mb-2 font-semibold">System Alerts</h2>
          <ul className="list-disc pl-5 text-sm">
            <li>2 resumes not verified</li>
            <li>1 candidate missing documents</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SelectorDashboard;

/* CARD */
const Card = ({ title, value, color }) => {
  return (
    <div
      className={`rounded-2xl p-5 shadow transition duration-200 hover:scale-105 dark:shadow-gray-950/30 ${color}`}
    >
      <p className="text-sm font-medium">{title}</p>
      <h2 className="mt-1 text-2xl font-bold">{value}</h2>
    </div>
  );
};

/* SECTION */
const Section = ({ title, children }) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg dark:bg-gray-800 dark:shadow-gray-950/30">
      <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
};

/* ITEM */
const Item = ({ label, value }) => (
  <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
    <span>{label}</span>
    <span className="font-medium text-gray-900 dark:text-gray-100">{value}</span>
  </div>
);

/* LIST */
const List = ({ items, color }) => (
  <ul className={`list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300 ${color || ""}`}>
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);