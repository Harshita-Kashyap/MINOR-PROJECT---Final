import { useTranslation } from "react-i18next";
import LandingLayout from "../layouts/LandingLayout";

export default function Recruitment() {
  const { t } = useTranslation();

  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white px-6 py-6 text-gray-800 shadow-sm dark:border-sky-900 dark:bg-gray-800 dark:text-gray-200">
        <h1 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-400">
          {t("recruitmentTitle")}
        </h1>

        <div className="space-y-5 text-[15px] leading-8">
          <p>{t("recruitmentP1")}</p>
          <p>{t("recruitmentP2")}</p>

          <p>
            {t("recruitmentP3")}{" "}
            <span className="font-medium text-blue-700 underline dark:text-blue-400">
              {t("recruitmentAdaLink")}
            </span>
          </p>
        </div>

        <section className="mt-6">
          <h2 className="mb-3 text-2xl font-medium text-gray-900 dark:text-white">
            {t("recruitmentSection1")}
          </h2>

          <h3 className="mb-2 text-[20px] font-medium text-gray-900 dark:text-white">
            {t("recruitmentEssentialQualifications")}
          </h3>

          <ol className="list-decimal space-y-2 pl-8 text-[15px] leading-8">
            <li>{t("recruitmentS1Li1")}</li>
            <li>{t("recruitmentS1Li2")}</li>
          </ol>

          <h3 className="mb-2 mt-6 text-[20px] font-medium text-gray-900 dark:text-white">
            {t("recruitmentDesirableQualifications")}
          </h3>

          <ol className="list-decimal space-y-2 pl-8 text-[15px] leading-8">
            <li>{t("recruitmentS1Li3")}</li>
            <li>{t("recruitmentS1Li4")}</li>
          </ol>

          <p className="mt-4 text-[15px]">{t("recruitmentClickHere")}</p>

          <div className="mt-2 text-right text-[15px] font-medium text-gray-900 dark:text-gray-100">
            {t("recruitmentSource")}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-2xl font-medium text-gray-900 dark:text-white">
            {t("recruitmentSection2")}
          </h2>

          <h3 className="mb-2 text-[20px] font-medium text-gray-900 dark:text-white">
            {t("recruitmentMedicalEssential")}
          </h3>

          <ol className="list-decimal space-y-3 pl-8 text-[15px] leading-8">
            <li>{t("recruitmentS2Li1")}</li>
          </ol>

          <p className="my-3 text-[15px]">{t("recruitmentOr")}</p>

          <ol className="list-decimal space-y-3 pl-8 text-[15px] leading-8">
            <li>{t("recruitmentS2Li2")}</li>
          </ol>

          <p className="my-3 text-[15px]">{t("recruitmentOr")}</p>

          <div className="space-y-3 text-[15px] leading-8">
            <p>{t("recruitmentS2Li3")}</p>
          </div>

          <ol className="mt-3 list-decimal space-y-2 pl-8 text-[15px] leading-8">
            <li>{t("recruitmentS2Li4")}</li>
            <li>{t("recruitmentS2Li5")}</li>
          </ol>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-2xl font-medium text-gray-900 dark:text-white">
            {t("recruitmentAgeLimit")}
          </h2>

          <ol className="list-decimal space-y-2 pl-8 text-[15px] leading-8">
            <li>{t("recruitmentAge1")}</li>
            <li>{t("recruitmentAge2")}</li>
            <li>{t("recruitmentAge3")}</li>
            <li>{t("recruitmentAge4")}</li>
            <li>{t("recruitmentAge5")}</li>
          </ol>

          <p className="mt-5 text-[15px] leading-8">
            {t("recruitmentAgeNote")}
          </p>
        </section>
      </div>
    </LandingLayout>
  );
}