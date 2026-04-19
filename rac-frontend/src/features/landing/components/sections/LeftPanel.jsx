import Card from "../../../../shared/components/ui/Card";
import { useTranslation } from "react-i18next";

export default function LeftPanel() {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <Card className="overflow-hidden p-0">
        <div className="flex h-56 w-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700">
          <div className="px-4 text-center">
            <div className="mb-2 text-3xl">🎥</div>

            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {t("leftVideoPlaceholder")}
            </p>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {t("leftVideoSubtext")}
            </p>
          </div>
        </div>
      </Card>

      <Card className="border-amber-200 bg-amber-50/70 dark:border-amber-900 dark:bg-amber-950/30">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm dark:bg-amber-900/60">
              ⚠
            </span>
            <h3 className="text-base font-semibold text-amber-900 dark:text-amber-300">
              {t("disclaimer")}
            </h3>
          </div>

          <p className="text-sm font-medium leading-6 text-gray-800 dark:text-gray-200">
            {t("leftDisclaimerIntro")}
          </p>

          <div className="space-y-3 text-xs leading-6 text-gray-700 dark:text-gray-300">
            <p>{t("leftDisclaimerP1")}</p>
            <p>{t("leftDisclaimerP2")}</p>
            <p>{t("leftDisclaimerP3")}</p>
            <p>{t("leftDisclaimerP4")}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}