import { useState } from "react";
import { useTranslation } from "react-i18next";
import LandingLayout from "../../../layouts/LandingLayout";

export default function Chairman() {
  const [activeTab, setActiveTab] = useState("brief");
  const { t } = useTranslation();

  const formerChairmen = [
    ["1", "Prof. Sampath", "10 Sep 1986", "15 Jul 1990"],
    ["2", "Sh. RK Garg", "15 Jul 1990", "30 Jun 1994"],
    ["3", "Dr. CS Jha", "1 Jul 1994", "30 Jun 1997"],
    ["4", "Dr. SK Joshi", "1 Jul 1997", "30 Jun 2000"],
    ["5", "Dr. VK Aatre", "1 Jul 2000", "31 Oct 2000"],
    ["6", "Dr. P. Rodriguez", "1 Nov 2000", "31 Oct 2003"],
    ["7", "Dr. VK Aatre", "1 Nov 2003", "18 May 2004"],
    ["8", "Dr. KV Raghavan", "19 May 2004", "30 Sep 2008"],
    ["9", "Sh. M Natarajan", "5 Nov 2008", "2 Dec 2008"],
    ["10", "Dr. Prem Shanker Goel", "3 Dec 2008", "2 Dec 2011"],
    ["11", "Dr. VK Saraswat", "3 Dec 2011", "20 Jun 2012"],
    ["12", "Prof. (Dr) D.N. Reddy", "20 Jun 2012", "19 Jun 2015"],
    ["13", "Dr. S Christopher", "26 Jun 2015", "14 Dec 2017"],
    ["14", "Sh. Bhanu Pratap Sharma", "15 Dec 2017", "12 Jun 2025"],
  ];

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
                  ? "bg-white text-blue-600 dark:bg-gray-800 dark:text-blue-400"
                  : "bg-gray-50 text-gray-800 hover:bg-white dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("brief")}
            >
              {t("briefProfile")}
            </button>

            <button
              className={`px-5 py-3 text-base ${
                activeTab === "former"
                  ? "bg-white text-blue-600 dark:bg-gray-800 dark:text-blue-400"
                  : "bg-gray-50 text-gray-800 hover:bg-white dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
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
            <div className="overflow-x-auto border border-gray-200 shadow-sm dark:border-gray-700">
              <table className="w-full border-collapse text-center text-[15px] text-gray-900 dark:text-gray-100">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="px-4 py-3 font-bold">No.</th>
                    <th className="px-4 py-3 font-bold">Name</th>
                    <th className="px-4 py-3 font-bold">From</th>
                    <th className="px-4 py-3 font-bold">To</th>
                  </tr>
                </thead>

                <tbody>
                  {formerChairmen.map((item, index) => (
                    <tr
                      key={item[0]}
                      className={
                        index % 2 === 0
                          ? "bg-white dark:bg-gray-800"
                          : "bg-gray-100 dark:bg-gray-700"
                      }
                    >
                      <td className="px-4 py-2">{item[0]}</td>
                      <td className="px-4 py-2 text-left">{item[1]}</td>
                      <td className="px-4 py-2">{item[2]}</td>
                      <td className="px-4 py-2">{item[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </LandingLayout>
  );
}