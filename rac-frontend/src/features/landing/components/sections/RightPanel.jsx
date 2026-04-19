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
        bg: "bg-[#cfeff7]",
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
        className={`w-full rounded-md px-3 py-2 text-sm font-semibold shadow-sm transition ${
          isBlue
            ? "bg-blue-700 text-white hover:bg-blue-800"
            : isRed
            ? "bg-red-700 text-white hover:bg-red-800"
            : "bg-gray-600 text-white hover:bg-gray-700"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-3 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`rounded-t-md border px-4 py-2 text-sm font-medium transition ${
              active === tab
                ? "border-pink-300 bg-white text-pink-600 shadow-sm dark:bg-gray-700 dark:text-pink-400"
                : "border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            {tab === "latest" && t("rightLatestTab")}
            {tab === "status" && t("rightStatusTab")}
            {tab === "notices" && t("rightNoticesTab")}
            {tab === "queryStatus" && t("rightQueryStatusTab")}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {tabContent[active].map((item, index) => {
          if (item.simple) {
            return (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              >
                {item.text}
              </div>
            );
          }

          if (item.type === "notice") {
            return (
              <div
                key={index}
                className={`overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-600 ${item.bg}`}
              >
                <div className="flex items-center justify-between border-b border-gray-300 px-4 py-3">
                  <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <span className="rounded bg-red-600 px-2 py-0.5 text-xs text-white">
                      PDF
                    </span>
                    <span>{item.pdf}</span>
                  </div>
                </div>

                <div className="bg-white px-4 py-4 dark:bg-gray-800">
                  <p className="text-base font-semibold leading-7 text-gray-800 dark:text-white">
                    {item.text}
                  </p>
                </div>

                <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  {item.date}
                </div>
              </div>
            );
          }

          return (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-[#d8d1a6] bg-[#f7edbd] shadow-sm dark:border-gray-600 dark:bg-gray-700"
            >
              <div className="border-b border-gray-300 px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-2xl font-bold text-[#4b3d2f] dark:text-white">
                    {item.advNo}
                  </h3>
                  <span className="text-xl text-[#4b3d2f] dark:text-white">ⓘ</span>
                </div>

                <p className="mt-3 text-right text-sm font-semibold tracking-wide text-[#4b3d2f] dark:text-gray-200">
                  {item.updated}
                </p>
              </div>

              <div className="bg-white px-4 py-5 dark:bg-gray-800">
                <div className="mb-4 grid gap-3 sm:grid-cols-2">
                  {item.buttons.map((btn, btnIndex) => renderButton(btn, btnIndex))}
                </div>

                <h4 className="mb-3 text-2xl font-bold leading-9 text-pink-600 dark:text-pink-400">
                  {item.title}
                </h4>

                <p className="mb-4 text-base leading-8 text-gray-700 dark:text-gray-200">
                  <span className="font-bold text-red-600">
                    {t("rightClosingDate")}{" "}
                  </span>
                  {item.closing}
                </p>
              </div>

              <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300">
                {item.published}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}