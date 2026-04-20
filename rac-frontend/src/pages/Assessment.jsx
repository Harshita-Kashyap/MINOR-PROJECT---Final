import { useTranslation } from "react-i18next";
import LandingLayout from "../layouts/LandingLayout";

export default function Assessment() {
  const { t } = useTranslation();

  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white px-6 py-6 shadow-sm text-gray-800 dark:border-sky-900 dark:bg-gray-800 dark:text-gray-200">
        <h1 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-400">
          {t("assessmentTitle")}
        </h1>

        <div className="space-y-5 text-[15px] leading-8">
          <p>{t("assessmentP1")}</p>
          <p>{t("assessmentP2")}</p>
        </div>

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">
            {t("assessmentProcedure")}
          </h2>

          <div className="space-y-5 text-[15px] leading-8">
            <p>{t("assessmentProc1")}</p>
            <p>{t("assessmentProc2")}</p>
            <p>{t("assessmentProc3")}</p>

            <ol className="list-decimal space-y-2 pl-8">
              <li>{t("assessmentLi1")}</li>
              <li>{t("assessmentLi2")}</li>
            </ol>

            <p>{t("assessmentProc4")}</p>
            <p>{t("assessmentProc5")}</p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">
            {t("assessmentPeerReview")}
          </h2>

          <div className="space-y-5 text-[15px] leading-8">
            <p>{t("assessmentPeer1")}</p>
            <p>{t("assessmentPeer2")}</p>
            <p>{t("assessmentPeer3")}</p>
            <p>{t("assessmentPeer4")}</p>
            <p>{t("assessmentPeer5")}</p>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}