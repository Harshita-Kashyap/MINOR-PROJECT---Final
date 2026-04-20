import { useTranslation } from "react-i18next";
import LandingLayout from "../layouts/LandingLayout";

export default function SelectionPG() {
  const { t } = useTranslation();

  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white px-6 py-6 shadow-sm text-gray-800 dark:border-sky-900 dark:bg-gray-800 dark:text-gray-200">
        <h1 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-400">
          {t("selectionPgTitle")}
        </h1>

        <div className="space-y-5 text-[15px] leading-8">
          <p>{t("selectionPgP1")}</p>
          <p>{t("selectionPgP2")}</p>
          <p>{t("selectionPgP3")}</p>
          <p>{t("selectionPgP4")}</p>
        </div>
      </div>
    </LandingLayout>
  );
}