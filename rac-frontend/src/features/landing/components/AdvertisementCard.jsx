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
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-lg font-semibold dark:text-white">
            {finalTitle}
          </h4>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t("deadline")}: {deadline}
          </p>

          <div className="mt-2">
            <Badge>{finalStatus}</Badge>
          </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-sm font-medium text-blue-700 hover:underline dark:text-blue-400"
        >
          {open ? t("hide") : t("view")}
        </button>
      </div>

      {open && (
        <div className="mt-4 space-y-2 border-t border-gray-200 pt-3 text-sm text-gray-600 dark:border-gray-600 dark:text-gray-300">
          <p>
            <b>{t("eligibility")}:</b> {finalEligibility}
          </p>
          <p>
            <b>{t("selection")}:</b> {finalSelection}
          </p>

          <Button className="mt-2 w-full">{t("applyNow")}</Button>
        </div>
      )}
    </div>
  );
}