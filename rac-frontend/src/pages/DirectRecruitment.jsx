import { useTranslation } from "react-i18next";
import LandingLayout from "../layouts/LandingLayout";

export default function DirectRecruitment() {
  const { t } = useTranslation();

  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white px-6 py-6 shadow-sm dark:border-sky-900 dark:bg-gray-800">
        <h1 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-400">
          {t("directRecruitmentTitle")}
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
          <div>
            <div className="inline-block border border-gray-300 bg-white p-2 shadow-md dark:border-gray-700 dark:bg-gray-900">
              <img
                src="https://rac.gov.in/images/content/brahmos.jpg"
                alt="Direct Recruitment"
                className="h-auto w-full max-w-[260px] object-cover"
              />
            </div>
          </div>

          <div className="space-y-5 text-[15px] leading-8 text-gray-800 dark:text-gray-200">
            <p>{t("directRecruitmentP1")}</p>
            <p>{t("directRecruitmentP2")}</p>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}