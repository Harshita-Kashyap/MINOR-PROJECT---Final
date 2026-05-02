import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function ScoreChart({ data, dark }) {
  const [sortMode, setSortMode] = useState("TOP");

  const axisColor = dark ? "#9ca3af" : "#6b7280";
  const gridColor = dark ? "rgba(255,255,255,0.08)" : "rgba(17,24,39,0.08)";
  const tooltipBg = dark ? "#111827" : "#ffffff";
  const tooltipBorder = dark ? "#374151" : "#e5e7eb";
  const tooltipText = dark ? "#f3f4f6" : "#111827";

  const sortedData = useMemo(() => {
    const list = Array.isArray(data) ? [...data] : [];

    if (sortMode === "BOTTOM") {
      return list.sort((a, b) => Number(a.overall || 0) - Number(b.overall || 0));
    }

    return list.sort((a, b) => Number(b.overall || 0) - Number(a.overall || 0));
  }, [data, sortMode]);

  const formatName = (name) => {
    if (!name) return "Candidate";
    return name.length > 12 ? `${name.slice(0, 12)}...` : name;
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex h-[360px] items-center justify-center rounded-2xl border border-dashed border-gray-300 p-6 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        No candidates match the selected chart filters.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Hover on bars to view full candidate name, stage, and score details.
        </p>

        <select
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white sm:w-56"
        >
          <option value="TOP">Top performers first</option>
          <option value="BOTTOM">Lowest performers first</option>
        </select>
      </div>

      <div className="w-full overflow-x-auto">
        <div
          className="h-[390px] min-w-[760px]"
          style={{
            width: `${Math.max(sortedData.length * 115, 760)}px`,
          }}
        >
          <ResponsiveContainer width="99%" height={390}>
            <BarChart
              data={sortedData}
              barCategoryGap="18%"
              margin={{ top: 10, right: 20, left: 0, bottom: 45 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />

              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: axisColor }}
                tickFormatter={formatName}
                angle={-30}
                textAnchor="end"
                interval={0}
                height={80}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 12, fill: axisColor }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{
                  fill: dark
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(17,24,39,0.04)",
                }}
                contentStyle={{
                  borderRadius: "14px",
                  border: `1px solid ${tooltipBorder}`,
                  backgroundColor: tooltipBg,
                  color: tooltipText,
                }}
                labelStyle={{ color: tooltipText, fontWeight: 600 }}
                itemStyle={{ color: tooltipText }}
                formatter={(value, name) => [value, name]}
                labelFormatter={(label, payload) => {
                  const item = payload?.[0]?.payload;

                  return item
                    ? `${item.name} • ${item.stage || "Stage N/A"}`
                    : label;
                }}
              />

              <Legend
                iconType="square"
                wrapperStyle={{
                  color: axisColor,
                  fontSize: "13px",
                  paddingTop: "10px",
                }}
              />

              <Bar
                dataKey="technical"
                name="Technical"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />

              <Bar
                dataKey="personality"
                name="Personality"
                fill="#10b981"
                radius={[8, 8, 0, 0]}
              />

              <Bar
                dataKey="overall"
                name="Overall"
                fill="#f59e0b"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}