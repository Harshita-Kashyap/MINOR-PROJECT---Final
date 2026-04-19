import AdvertisementCard from "./AdvertisementCard";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import Card from "../ui/Card";

export default function CenterPanel() {
  const { t } = useTranslation();

  const generalInfoItems = [
    "For latest updates, applicants are requested to visit this website at least twice a week.",
    "All advertisements for inviting applications for Junior Research Fellowships and Apprenticeship positions are regularly posted on the DRDO website https://drdo.gov.in.",
    "RAC will not be addressing Junior Research Fellowship, Apprenticeship and Student Internship requests or queries. Students requesting Junior Research Fellowship, Apprenticeship or Internship are advised to visit the DRDO website https://drdo.gov.in for the guidelines.",
    "For the Direct Recruitment to the post of Scientist B in DRDO, candidates are required to possess a valid GATE score in the relevant discipline for which GATE is conducted, including the disciplines of Engineering Sciences, Life Sciences, and Humanities & Social Sciences.",
  ];

  return (
    <div className="space-y-6">
      {/* HERO */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 p-6 text-white shadow-sm">
        <h2 className="text-xl font-semibold sm:text-2xl">
          {t("heroTitle", "Recruitment & Assessment Centre")}
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100 sm:text-[15px]">
          {t(
            "heroSubtitle",
            "Explore recruitment updates, official notices, eligibility details, and opportunities related to DRDO scientific positions."
          )}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="secondary">
            {t("applyNow", "Apply Now")}
          </Button>

          <Button variant="outlineWhite">
            {t("viewAd", "View Advertisement")}
          </Button>
        </div>
      </div>

      {/* ACTIVE ADVERTISEMENTS */}
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t("activeAds", "Active Advertisements")}
        </h3>

        <button
          type="button"
          className="text-sm font-medium text-blue-700 transition hover:underline dark:text-blue-400"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        <AdvertisementCard />
        <AdvertisementCard />
      </div>

      {/* GENERAL INFORMATION */}
      <Card className="border-blue-100 dark:border-gray-700">
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              General Information
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Important guidance for applicants and students
            </p>
          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
            Important
          </span>
        </div>

        <div className="space-y-4">
          {generalInfoItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-900/40"
            >
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white dark:bg-blue-500">
                {index + 1}
              </span>

              <p className="text-sm leading-7 text-gray-700 dark:text-gray-300">
                {item.includes("https://drdo.gov.in") ? (
                  <>
                    {item.split("https://drdo.gov.in")[0]}
                    <a
                      href="https://drdo.gov.in"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-blue-700 underline underline-offset-2 dark:text-blue-400"
                    >
                      https://drdo.gov.in
                    </a>
                    {item.split("https://drdo.gov.in")[1]}
                  </>
                ) : (
                  item
                )}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}