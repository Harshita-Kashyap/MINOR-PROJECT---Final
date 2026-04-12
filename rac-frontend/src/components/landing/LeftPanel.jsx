import Card from "../ui/Card";
import { useTranslation } from "react-i18next";
import Input from "../ui/Input";

export default function LeftPanel() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">

      <Card>
        <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center">
          ▶ Video
        </div>
        <p className="text-sm mt-2 dark:text-gray-300">
          {t("videoText")}
        </p>
      </Card>

      <Card>
        <Input placeholder={t("search")} />
      </Card>

      <Card>
        <h3 className="font-medium mb-2 dark:text-white">
          {t("disclaimer")}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-300">
          {t("disclaimerText")}
        </p>
      </Card>

    </div>
  );
}