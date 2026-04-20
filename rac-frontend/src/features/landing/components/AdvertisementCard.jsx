import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";

export default function AdvertisementCard({
  title,
  deadline = "15 Aug 2024",
  eligibility,
  selection,
  status,
}) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const finalTitle = title || t("adTitle");
  const finalEligibility = eligibility || t("adEligibility");
  const finalSelection = selection || t("adSelection");
  const finalStatus = status || t("adStatus");

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge>{finalStatus}</Badge>

              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {t("deadline")}: {deadline}
              </span>
            </div>

            <h4 className="text-lg font-semibold leading-7 text-gray-900 transition-colors duration-300 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400 sm:text-xl">
              {finalTitle}
            </h4>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              {t("selection")}: {finalSelection}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="shrink-0 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-blue-700 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800 dark:border-gray-600 dark:bg-gray-700 dark:text-blue-400 dark:hover:border-blue-700 dark:hover:bg-gray-600"
          >
            {open ? t("hide") : t("view")}
          </button>
        </div>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            open
              ? "mt-5 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
              <div className="space-y-3 text-sm leading-7 text-gray-700 dark:text-gray-300">
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {t("eligibility")}:
                  </span>{" "}
                  {finalEligibility}
                </p>

                <p>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {t("selection")}:
                  </span>{" "}
                  {finalSelection}
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {t("deadline")}: {deadline}
                </p>

                <div className="sm:w-auto">
                  <Button className="w-full sm:w-auto">{t("applyNow")}</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}