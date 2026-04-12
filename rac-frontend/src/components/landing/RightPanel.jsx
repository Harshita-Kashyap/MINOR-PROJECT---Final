import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function RightPanel() {
  const tabs = ["latest", "important", "dates"];
  const [active, setActive] = useState("latest");
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-sm">

      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-3 py-1 rounded-md text-sm transition ${
              active === tab
                ? "bg-blue-900 text-white"
                : "bg-gray-100 dark:bg-gray-700 dark:text-white hover:bg-gray-200"
            }`}
          >
            {t(tab)}
          </button>
        ))}
      </div>

      <div className="space-y-3 text-sm">
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
          {t("interviewSchedule")}
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
          {t("resultsDeclared")}
        </div>
      </div>
    </div>
  );
}