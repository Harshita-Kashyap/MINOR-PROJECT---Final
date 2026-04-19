import Card from "../ui/Card";
import Input from "../ui/Input";
import { useTranslation } from "react-i18next";
import racVideo from "../../assets/rac-video.mp4";

export default function LeftPanel() {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      {/* Video Section */}
      <Card className="overflow-hidden p-0">
        <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
          <h3 className="text-sm font-semibold tracking-wide text-gray-900 dark:text-white">
            {t("featuredVideo", "Featured Video")}
          </h3>
        </div>

        <div className="bg-black">
          <video
            className="h-56 w-full object-cover"
            controls
            preload="metadata"
          >
            <source src={racVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="px-4 py-3">
          <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
            {t(
              "videoText",
              "Watch the overview video to understand the purpose and flow of this selector–applicant simulation portal."
            )}
          </p>
        </div>
      </Card>

      {/* Disclaimer Section */}
      <Card className="border-amber-200 bg-amber-50/70 dark:border-amber-900 dark:bg-amber-950/30">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm dark:bg-amber-900/60">
              ⚠
            </span>
            <h3 className="text-base font-semibold text-amber-900 dark:text-amber-300">
              {t("disclaimer", "Disclaimer")}
            </h3>
          </div>

          <p className="text-sm font-medium leading-6 text-gray-800 dark:text-gray-200">
            This is an educational project and is not the official RAC website.
          </p>

          <div className="space-y-3 text-xs leading-6 text-gray-700 dark:text-gray-300">
            <p>
              URL{" "}
              <span className="font-semibold text-blue-700 dark:text-blue-400">
                https://rac.gov.in
              </span>{" "}
              is the official website of the Recruitment &amp; Assessment Centre
              (RAC).
            </p>

            <p>
              Please be aware that unauthorized websites may mislead users while
              displaying{" "}
              <span className="font-semibold text-blue-700 dark:text-blue-400">
                https://rac.gov.in
              </span>{" "}
              as a hyperlink that redirects to their own web pages.
            </p>

            <p>
              RAC shall not be responsible for any misinformation arising out of
              the use, reference to, or reliance on any information contained in
              any fake hyperlink or website operating in its name.
            </p>

            <p>
              For authentic and up-to-date information on DRDO recruitments, as
              issued by RAC, please visit the official RAC website by typing{" "}
              <span className="font-semibold text-blue-700 dark:text-blue-400">
                https://rac.gov.in
              </span>{" "}
              directly in the browser address bar.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}