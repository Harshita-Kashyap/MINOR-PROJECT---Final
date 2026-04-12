import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

export default function AdvertisementCard({
  title = "Junior Research Fellow (JRF)",
  deadline = "15 Aug 2024",
  eligibility = "B.Tech / M.Tech",
  selection = "Interview",
  status = "Open",
}) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-sm hover:shadow-md transition">

      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-lg dark:text-white">
            {title}
          </h4>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t("deadline")}: {deadline}
          </p>

          <div className="mt-2">
            <Badge>{status}</Badge>
          </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-blue-700 dark:text-blue-400 text-sm font-medium hover:underline"
        >
          {open ? t("hide") : t("view")}
        </button>
      </div>

      {open && (
        <div className="mt-4 border-t border-gray-200 dark:border-gray-600 pt-3 text-sm text-gray-600 dark:text-gray-300 space-y-2">

          <p><b>{t("eligibility")}:</b> {eligibility}</p>
          <p><b>{t("selection")}:</b> {selection}</p>

          <Button className="mt-2 w-full">
            {t("applyNow")}
          </Button>
        </div>
      )}
    </div>
  );
}