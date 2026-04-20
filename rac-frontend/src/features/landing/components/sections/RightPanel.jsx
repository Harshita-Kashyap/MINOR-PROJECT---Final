import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function RightPanel() {
  const { t } = useTranslation();
  const tabs = ["latest", "status", "notices", "queryStatus"];
  const [active, setActive] = useState("latest");

  const tabContent = {
    latest: [
      {
        type: "notice",
        title: t("rightPublicNotice"),
        pdf: "161.86 KB",
        text: t("rightNoticeText"),
        date: `${t("rightPublishedOn")} 27 Aug, 2025`,
      },
      {
        type: "advertisement",
        advNo: t("rightAdv156"),
        updated: `${t("rightLastUpdated")} 18 Mar, 2026 18:25 hrs.`,
        title: t("rightAdv156Title"),
        buttons: [
          t("rightTentativeSchedule"),
          t("rightCheckUpdates"),
          t("rightAdv156Btn3"),
          t("rightAdv156Btn4"),
          t("rightAdvertisement"),
        ],
        closing: t("rightAdv156Closing"),
        published: `${t("rightPublishedOn")} 20 May, 2025`,
      },
      {
        type: "advertisement",
        advNo: t("rightAdv152"),
        updated: `${t("rightLastUpdated")} 2 Jan, 2026 15:00 hrs.`,
        title: t("rightAdv152Title"),
        buttons: [
          t("rightAdvertisement"),
          t("rightFaq"),
          t("rightPayEquivalence"),
          t("rightTentativeSchedule"),
          t("rightCheckUpdates"),
        ],
        closing: t("rightAdv152Closing"),
        published: `${t("rightPublishedOn")} 17 Apr, 2025`,
      },
      {
        type: "advertisement",
        advNo: t("rightAdv154"),
        updated: `${t("rightLastUpdated")} 20 Aug, 2025 12:45 hrs.`,
        title: t("rightAdv154Title"),
        buttons: [
          t("rightAdvertisement"),
          t("rightPayEquivalence"),
          t("rightTentativeSchedule"),
        ],
        closing: t("rightAdv154Closing"),
        published: `${t("rightPublishedOn")} 10 Mar, 2025`,
      },
    ],
    status: [{ simple: true, text: t("rightStatusText") }],
    notices: [{ simple: true, text: t("rightNoticesText") }],
    queryStatus: [{ simple: true, text: t("rightQueryText") }],
  };

  const renderButton = (label, index) => {
    const isBlue = label === t("rightCheckUpdates");
    const isRed = label === t("rightTentativeSchedule");

    return (
      <button
        key={index}
        className={`rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${
          isBlue
            ? "bg-blue-700 text-white hover:bg-blue-800"
            : isRed
            ? "bg-red-700 text-white hover:bg-red-800"
            : "bg-gray-700 text-white hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500"
        }`}
      >
        {label}
      </button>
    );
  };

  const renderSimpleCard = (text, index) => (
    <div
      key={index}
      className="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 text-sm leading-7 text-gray-700 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-200"
    >
      {text}
    </div>
  );

  const renderNoticeCard = (item, index) => (
    <div
      key={index}
      className="overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-cyan-50 px-4 py-4 dark:border-gray-700 dark:from-gray-800 dark:to-gray-800">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {item.title}
          </h3>

          <div className="shrink-0 text-right">
            <span className="inline-flex rounded-md bg-red-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              PDF
            </span>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {item.pdf}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <p className="text-sm font-medium leading-7 text-gray-800 dark:text-gray-100">
          {item.text}
        </p>
      </div>

      <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-400">
        {item.date}
      </div>
    </div>
  );

  const renderAdvertisementCard = (item, index) => (
    <div
      key={index}
      className="overflow-hidden rounded-2xl border border-amber-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="border-b border-amber-200/70 bg-gradient-to-r from-amber-50 to-yellow-50 px-4 py-4 dark:border-gray-700 dark:from-gray-800 dark:to-gray-800">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-[#4b3d2f] dark:text-white">
              {item.advNo}
            </h3>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-amber-700 dark:text-amber-300">
              Advertisement Update
            </p>
          </div>

          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm text-amber-700 shadow-sm dark:bg-gray-700 dark:text-amber-300">
            ⓘ
          </span>
        </div>

        <p className="mt-4 text-xs font-medium leading-6 text-gray-600 dark:text-gray-300">
          {item.updated}
        </p>
      </div>

      <div className="px-4 py-5">
        <div className="mb-5 flex flex-wrap gap-2">
          {item.buttons.map((btn, btnIndex) => renderButton(btn, btnIndex))}
        </div>

        <h4 className="text-xl font-semibold leading-8 text-pink-700 dark:text-pink-400">
          {item.title}
        </h4>

        <p className="mt-4 text-sm leading-7 text-gray-700 dark:text-gray-200">
          <span className="font-semibold text-red-600 dark:text-red-400">
            {t("rightClosingDate")}{" "}
          </span>
          {item.closing}
        </p>
      </div>

      <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-400">
        {item.published}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-200 bg-white/80 p-3 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const isActive = active === tab;

            return (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-blue-700 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {tab === "latest" && t("rightLatestTab")}
                {tab === "status" && t("rightStatusTab")}
                {tab === "notices" && t("rightNoticesTab")}
                {tab === "queryStatus" && t("rightQueryStatusTab")}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {tabContent[active].map((item, index) => {
          if (item.simple) {
            return renderSimpleCard(item.text, index);
          }

          if (item.type === "notice") {
            return renderNoticeCard(item, index);
          }

          return renderAdvertisementCard(item, index);
        })}
      </div>
    </div>
  );
}