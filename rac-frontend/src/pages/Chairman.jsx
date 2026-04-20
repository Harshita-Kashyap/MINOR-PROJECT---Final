import { useState } from "react";
import { useTranslation } from "react-i18next";
import LandingLayout from "../layouts/LandingLayout";

export default function Chairman() {
  const [activeTab, setActiveTab] = useState("brief");
  const { t, i18n } = useTranslation();

  const formerChairmen = [
    {
      no: 1,
      nameEn: "Prof. Sampath",
      nameHi: "प्रो. सम्पत",
      from: "10 Sep 1986",
      to: "15 Jul 1990",
    },
    {
      no: 2,
      nameEn: "Sh. RK Garg",
      nameHi: "श्री आर.के. गर्ग",
      from: "15 Jul 1990",
      to: "30 Jun 1994",
    },
    {
      no: 3,
      nameEn: "Dr. CS Jha",
      nameHi: "डॉ. सी.एस. झा",
      from: "1 Jul 1994",
      to: "30 Jun 1997",
    },
    {
      no: 4,
      nameEn: "Dr. SK Joshi",
      nameHi: "डॉ. एस.के. जोशी",
      from: "1 Jul 1997",
      to: "30 Jun 2000",
    },
    {
      no: 5,
      nameEn: "Dr. VK Aatre",
      nameHi: "डॉ. वी.के. आत्रे",
      from: "1 Jul 2000",
      to: "31 Oct 2000",
    },
    {
      no: 6,
      nameEn: "Dr. P. Rodriguez",
      nameHi: "डॉ. पी. रोड्रिग्ज",
      from: "1 Nov 2000",
      to: "31 Oct 2003",
    },
    {
      no: 7,
      nameEn: "Dr. VK Aatre",
      nameHi: "डॉ. वी.के. आत्रे",
      from: "1 Nov 2003",
      to: "18 May 2004",
    },
    {
      no: 8,
      nameEn: "Dr. KV Raghavan",
      nameHi: "डॉ. के.वी. राघवन",
      from: "19 May 2004",
      to: "30 Sep 2008",
    },
    {
      no: 9,
      nameEn: "Sh. M Natarajan",
      nameHi: "श्री एम. नटराजन",
      from: "5 Nov 2008",
      to: "2 Dec 2008",
    },
    {
      no: 10,
      nameEn: "Dr. Prem Shanker Goel",
      nameHi: "डॉ. प्रेम शंकर गोयल",
      from: "3 Dec 2008",
      to: "2 Dec 2011",
    },
    {
      no: 11,
      nameEn: "Dr. VK Saraswat",
      nameHi: "डॉ. वी.के. सारस्वत",
      from: "3 Dec 2011",
      to: "20 Jun 2012",
    },
    {
      no: 12,
      nameEn: "Prof. (Dr) D.N. Reddy",
      nameHi: "प्रो. (डॉ.) डी.एन. रेड्डी",
      from: "20 Jun 2012",
      to: "19 Jun 2015",
    },
    {
      no: 13,
      nameEn: "Dr. S Christopher",
      nameHi: "डॉ. एस. क्रिस्टोफर",
      from: "26 Jun 2015",
      to: "14 Dec 2017",
    },
    {
      no: 14,
      nameEn: "Sh. Bhanu Pratap Sharma",
      nameHi: "श्री भानु प्रताप शर्मा",
      from: "15 Dec 2017",
      to: "12 Jun 2025",
    },
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
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border border-gray-300 text-left dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-900">
                    <th className="border-b border-gray-300 px-4 py-3 text-center font-semibold dark:border-gray-700">
                      {t("tableNo")}
                    </th>
                    <th className="border-b border-gray-300 px-4 py-3 font-semibold dark:border-gray-700">
                      {t("tableName")}
                    </th>
                    <th className="border-b border-gray-300 px-4 py-3 font-semibold dark:border-gray-700">
                      {t("tableFrom")}
                    </th>
                    <th className="border-b border-gray-300 px-4 py-3 font-semibold dark:border-gray-700">
                      {t("tableTo")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formerChairmen.map((item, index) => (
                    <tr
                      key={item.no}
                      className={`${
                        index % 2 === 0
                          ? "bg-white dark:bg-gray-800"
                          : "bg-gray-50 dark:bg-gray-850"
                      }`}
                    >
                      <td className="border-b border-gray-200 px-4 py-3 text-center dark:border-gray-700">
                        {item.no}
                      </td>
                      <td className="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                        {i18n.language === "hi" ? item.nameHi : item.nameEn}
                      </td>
                      <td className="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                        {item.from}
                      </td>
                      <td className="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                        {item.to}
                      </td>
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