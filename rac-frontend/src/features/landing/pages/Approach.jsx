import { useTranslation } from "react-i18next";
import LandingLayout from "../../../layouts/LandingLayout";

export default function Approach() {
  const { t } = useTranslation();

  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white px-6 py-6 shadow-sm dark:border-sky-900 dark:bg-gray-800 dark:text-gray-200">
        <h1 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-400">
          {t("approachTitle")}
        </h1>

        <section className="mb-6">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {t("vision")}
          </h2>
          <p className="mb-2">{t("visionIntro")}</p>

          <ul className="list-disc space-y-1 pl-6">
            <li>{t("visionLi1")}</li>
            <li>{t("visionLi2")}</li>
            <li>{t("visionLi3")}</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {t("mission")}
          </h2>
          <p className="mb-2">{t("missionIntro")}</p>

          <ul className="list-disc space-y-1 pl-6">
            <li>{t("missionLi1")}</li>
            <li>{t("missionLi2")}</li>
            <li>{t("missionLi3")}</li>
            <li>{t("missionLi4")}</li>
            <li>{t("missionLi5")}</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {t("motto")}
          </h2>
          <ul className="list-disc pl-6">
            <li>{t("mottoLi1")}</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {t("qualityPolicy")}
          </h2>

          <p className="mb-2">{t("qualityPolicyIntro")}</p>

          <ul className="list-disc space-y-1 pl-6">
            <li>{t("qualityPolicyLi1")}</li>
            <li>{t("qualityPolicyLi2")}</li>
            <li>{t("qualityPolicyLi3")}</li>
          </ul>

          <p className="mt-2">{t("qualityPolicyEnd")}</p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {t("qualityObjectives")}
          </h2>

          <ul className="list-disc space-y-1 pl-6">
            <li>{t("qualityObjectivesLi1")}</li>
            <li>{t("qualityObjectivesLi2")}</li>
            <li>{t("qualityObjectivesLi3")}</li>
          </ul>
        </section>
      </div>
    </LandingLayout>
  );
}