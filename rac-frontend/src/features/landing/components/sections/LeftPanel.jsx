import Card from "../../../../shared/components/ui/Card";
import { useTranslation } from "react-i18next";

export default function LeftPanel() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <Card className="group overflow-hidden border border-gray-200/80 p-0 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/80">
        <div className="relative flex h-56 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-200 via-gray-200 to-slate-300 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_40%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_40%)]" />

          <div className="relative px-6 text-center">
            <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 text-2xl shadow-sm backdrop-blur-sm dark:bg-gray-900/40">
              🎥
            </div>

            <p className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-100">
              {t("leftVideoPlaceholder")}
            </p>

            <p className="mt-2 text-xs leading-6 text-gray-600 dark:text-gray-400">
              {t("leftVideoSubtext")}
            </p>
          </div>
        </div>
      </Card>

      <Card className="border border-amber-200/80 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-amber-900/70 dark:from-amber-950/30 dark:to-orange-950/20">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-base text-amber-700 shadow-sm dark:bg-amber-900/50 dark:text-amber-300">
              ⚠
            </span>

            <div>
              <h3 className="text-base font-semibold text-amber-900 dark:text-amber-300">
                {t("disclaimer")}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-amber-700/80 dark:text-amber-400/80">
                Important Information
              </p>
            </div>
          </div>

          <p className="border-l-4 border-amber-300 pl-4 text-sm font-medium leading-7 text-gray-800 dark:border-amber-700 dark:text-gray-200">
            {t("leftDisclaimerIntro")}
          </p>

          <div className="space-y-3 text-sm leading-7 text-gray-700 dark:text-gray-300">
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