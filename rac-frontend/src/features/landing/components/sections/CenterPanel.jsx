import AdvertisementCard from "../AdvertisementCard";
import { useTranslation } from "react-i18next";
import Button from "../../../../shared/components/ui/Button";
import Card from "../../../../shared/components/ui/Card";

export default function CenterPanel() {
  const { t } = useTranslation();

  const generalInfoItems = [
    t("centerInfo1"),
    t("centerInfo2"),
    t("centerInfo3"),
    t("centerInfo4"),
  ];

  const renderWithLink = (text) => {
    if (!text.includes("https://drdo.gov.in")) return text;

    const [before, after] = text.split("https://drdo.gov.in");

    return (
      <>
        {before}
        <a
          href="https://drdo.gov.in"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4 transition hover:text-blue-800 dark:text-blue-400 dark:decoration-blue-700"
        >
          https://drdo.gov.in
        </a>
        {after}
      </>
    );
  };

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 p-6 text-white shadow-sm sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />
        <div className="absolute -right-10 top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-cyan-300/10 blur-2xl" />

        <div className="relative">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-[0.16em] text-blue-100 uppercase backdrop-blur-sm">
            Recruitment & Assessment
          </span>

          <h2 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">
            {t("heroTitle")}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100 sm:text-[15px]">
            {t("heroSubtitle")}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="secondary">{t("applyNow")}</Button>
            <Button variant="outlineWhite">{t("viewAd")}</Button>
          </div>
        </div>
      </section>

      <div className="flex items-end justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t("activeAds")}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Current and recently published opportunities
          </p>
        </div>

        <button
          type="button"
          className="text-sm font-semibold text-blue-700 transition hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
        >
          {t("centerViewAll")}
        </button>
      </div>

      <div className="space-y-4">
        <div className="transition-transform duration-300 hover:-translate-y-0.5">
          <AdvertisementCard />
        </div>
        <div className="transition-transform duration-300 hover:-translate-y-0.5">
          <AdvertisementCard />
        </div>
      </div>

      <Card className="border border-blue-100/80 shadow-sm dark:border-gray-700">
        <div className="mb-5 flex items-start justify-between gap-3 border-b border-gray-200 pb-4 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("centerGeneralInfoTitle")}
            </h3>
            <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
              {t("centerGeneralInfoSub")}
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            {t("centerImportant")}
          </span>
        </div>

        <div className="space-y-4">
          {generalInfoItems.map((item, index) => (
            <div
              key={index}
              className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50/80 px-4 py-4 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/60 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900/40 dark:hover:border-blue-800 dark:hover:bg-blue-950/20"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white shadow-sm transition-transform duration-300 group-hover:scale-105 dark:bg-blue-500">
                {index + 1}
              </span>

              <p className="text-sm leading-7 text-gray-700 dark:text-gray-300">
                {renderWithLink(item)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}