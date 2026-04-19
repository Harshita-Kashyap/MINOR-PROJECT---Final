import { useState } from "react";
import { useTranslation } from "react-i18next";
import LandingLayout from "../layouts/LandingLayout";

export default function Chairman() {
  const [activeTab, setActiveTab] = useState("brief");
  const { t } = useTranslation();

  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white shadow-sm dark:border-sky-900 dark:bg-gray-800">
        <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          <h1 className="text-4xl font-bold text-amber-900 dark:text-amber-400">
            {t("chairmanTitle")}
          </h1>
        </div>

        <div className="px-6 pt-4">
          <div className="flex flex-wrap border border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
            <button
              className={`border-r border-gray-300 px-5 py-3 text-base dark:border-gray-700 ${
                activeTab === "brief"
                  ? "bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
                  : "bg-gray-50 text-blue-600 hover:bg-white dark:bg-gray-900 dark:text-blue-400 dark:hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("brief")}
            >
              {t("briefProfile")}
            </button>

            <button
              className={`px-5 py-3 text-base ${
                activeTab === "former"
                  ? "bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
                  : "bg-gray-50 text-blue-600 hover:bg-white dark:bg-gray-900 dark:text-blue-400 dark:hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("former")}
            >
              {t("formerChairmen")}
            </button>
          </div>
        </div>

        <div className="px-6 py-5 text-[15px] leading-8 text-gray-800 dark:text-gray-200">
          {activeTab === "brief" ? (
            <div className="space-y-4">
              <p>{t("chairmanP1")}</p>
              <p>{t("chairmanP2")}</p>
              <p>{t("chairmanP3")}</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p>{t("formerChairmenText")}</p>
              <ul className="list-disc pl-6">
                <li>Former Chairman 1</li>
                <li>Former Chairman 2</li>
                <li>Former Chairman 3</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </LandingLayout>
  );
}