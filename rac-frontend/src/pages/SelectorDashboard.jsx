import Header from "../components/landing/Header";
import SelectorRibbon from "../components/selector/SelectorRibbon";

const SelectorDashboard = () => {
  return (
    <>
      <Header />
      <SelectorRibbon />

      <div className="p-6 bg-gray-50 min-h-screen space-y-8">

        {/* 🔷 HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Selector Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Monitor candidate progress and evaluation workflow
          </p>
        </div>

        {/* 🔷 CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          <Card title="Assigned" value="25" color="bg-blue-100 text-blue-700" />
          <Card title="Pending" value="10" color="bg-yellow-100 text-yellow-700" />
          <Card title="Completed" value="15" color="bg-green-100 text-green-700" />
          <Card title="Recommended" value="5" color="bg-purple-100 text-purple-700" />
          <Card title="Rejected" value="3" color="bg-red-100 text-red-700" />
        </div>

        {/* 🔷 GRID SECTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Vacancy */}
          <Section title="Candidates per Vacancy">
            <Item label="Scientist B (CS)" value="12" />
            <Item label="Scientist B (ECE)" value="8" />
            <Item label="Scientist B (ME)" value="5" />
          </Section>

          {/* Progress */}
          <Section title="Stage-wise Progress">
            <Item label="Resume Screening" value="20 Completed" />
            <Item label="Technical Test" value="15 Completed" />
            <Item label="Personality Test" value="10 Pending" />
          </Section>

          {/* Activity */}
          <Section title="Recent Activity">
            <List items={[
              "Aditi Sharma evaluated – Recommended",
              "Rahul Verma pending for technical test",
              "Neha Singh moved to personality round"
            ]} />
          </Section>

          {/* Actions */}
          <Section title="Action Required">
            <List
              items={[
                "10 candidates pending evaluation",
                "5 candidates awaiting decision"
              ]}
              color="text-red-500"
            />
          </Section>

        </div>

        {/* 🔷 TOP CANDIDATES */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="font-semibold mb-4 text-lg">Top Candidates</h2>

          <table className="w-full">
            <thead>
              <tr className="text-gray-500 text-sm border-b">
                <th className="text-left p-2">Rank</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Score</th>
              </tr>
            </thead>

            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="p-2">1</td>
                <td className="p-2">Aditi Sharma</td>
                <td className="p-2 font-semibold text-green-600">85</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="p-2">2</td>
                <td className="p-2">Rahul Verma</td>
                <td className="p-2 font-semibold text-blue-600">80</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 🔷 ALERTS */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-lg">
          <h2 className="font-semibold mb-2">System Alerts</h2>
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



/* 🔹 CARD */
const Card = ({ title, value, color }) => {
  return (
    <div className={`p-5 rounded-2xl shadow ${color} hover:scale-105 transition`}>
      <p className="text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
    </div>
  );
};

/* 🔹 SECTION */
const Section = ({ title, children }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
      <h2 className="font-semibold mb-4 text-lg">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
};

/* 🔹 ITEM */
const Item = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span>{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

/* 🔹 LIST */
const List = ({ items, color }) => (
  <ul className={`list-disc pl-5 text-sm space-y-1 ${color || ""}`}>
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);