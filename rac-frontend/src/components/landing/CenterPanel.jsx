import AdvertisementCard from "./AdvertisementCard";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";

export default function CenterPanel() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold">
          {t("heroTitle")}
        </h2>

        <p className="text-sm mt-2 text-blue-100">
          {t("heroSubtitle")}
        </p>

        <div className="mt-4 flex gap-3">
          <Button variant="secondary">
            {t("applyNow")}
          </Button>

          <Button variant="outlineWhite">
            {t("viewAd")}
          </Button>
        </div>
      </div>

      {/* ADS */}
      <h3 className="text-lg font-medium dark:text-white">
        {t("activeAds")}
      </h3>

      <AdvertisementCard />
      <AdvertisementCard />
    </div>
  );
}