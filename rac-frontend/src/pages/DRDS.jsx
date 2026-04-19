import { useTranslation } from "react-i18next";
import LandingLayout from "../layouts/LandingLayout";

const payData = [
  { grade: "Scientist 'B'", level: "Level 10", pay: "56,100/-" },
  { grade: "Scientist 'C'", level: "Level 11", pay: "67,700/-" },
  { grade: "Scientist 'D'", level: "Level 12", pay: "78,800/-" },
  { grade: "Scientist 'E'", level: "Level 13", pay: "1,23,100/-" },
  { grade: "Scientist 'F'", level: "Level 13A", pay: "1,31,100/-" },
  { grade: "Scientist 'G'", level: "Level 14", pay: "1,44,200/-" },
  {
    grade: "Scientist 'H' (Outstanding Scientist)",
    level: "Level 15",
    pay: "1,82,200/-",
  },
  {
    grade: "Distinguished Scientist (DS)",
    level: "Level 16",
    pay: "2,05,400/-",
  },
  {
    grade:
      "Secretary DD R&D, DG R&D and Scientific Adviser to Raksha Mantri (SA to RM)",
    level: "Level 17",
    pay: "2,25,000/-",
  },
];

export default function DRDS() {
  const { t } = useTranslation();

  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white px-6 py-6 text-gray-800 shadow-sm dark:border-sky-900 dark:bg-gray-800 dark:text-gray-200">
        <h1 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-400">
          {t("drdsTitle")}
        </h1>

        <div className="space-y-5 text-[15px] leading-8">
          <p>{t("drdsIntro")}</p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left text-[15px]">
            <thead>
              <tr className="bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-white">
                <th className="px-4 py-3 font-medium">{t("grade")}</th>
                <th className="px-4 py-3 font-medium">{t("levelInPayMatrix")}</th>
                <th className="px-4 py-3 font-medium">{t("initialPay")}</th>
              </tr>
            </thead>
            <tbody>
              {payData.map((row, index) => (
                <tr
                  key={row.grade}
                  className={
                    index % 2 === 0
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "bg-gray-200/60 dark:bg-gray-900/70"
                  }
                >
                  <td className="px-4 py-3">{row.grade}</td>
                  <td className="px-4 py-3">{row.level}</td>
                  <td className="px-4 py-3">{row.pay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">
            {t("salientFeatures")}
          </h2>

          <div className="space-y-5 text-[15px] leading-8">
            <p>{t("drdsP1")}</p>
            <p>{t("drdsP2")}</p>
            <p>{t("drdsP3")}</p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">
            {t("higherQualificationTraining")}
          </h2>

          <div className="space-y-5 text-[15px] leading-8">
            <p>{t("drdsP4")}</p>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}