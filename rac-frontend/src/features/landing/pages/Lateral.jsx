import { useTranslation } from "react-i18next";
import LandingLayout from "../../../layouts/LandingLayout";

export default function Lateral() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === "hi";

  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white px-6 py-6 shadow-sm dark:border-sky-900 dark:bg-gray-800">
        <h1 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-400">
          {isHindi ? "पार्श्व प्रवेश" : "Lateral Entry"}
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
          <div>
            <div className="inline-block border border-gray-300 bg-white p-2 shadow-md dark:border-gray-700 dark:bg-gray-900">
              <img
                src="https://rac.gov.in/images/content/brahmos.jpg"
                alt={isHindi ? "पार्श्व प्रवेश" : "Lateral Entry"}
                className="h-auto w-full max-w-[260px] object-cover"
              />
            </div>
          </div>

          <div className="text-[15px] leading-8 text-gray-800 dark:text-gray-200">
            <p>
              {isHindi
                ? "विशेषीकृत क्षेत्रों में योग्यता और अनुभव के आधार पर DRDO से संबंधित मध्य एवं वरिष्ठ ग्रेड (Scientist 'C' से Scientist 'H') में वैज्ञानिकों की भर्ती इस श्रेणी के अंतर्गत की जाती है।"
                : "Recruitment of Scientists in middle & senior grades (Scientist 'C' to Scientist 'H') based on qualification and experience in specialized fields relevant to DRDO is covered under this category of recruitment."}
            </p>

            <p className="mt-4">
              {isHindi
                ? 'RAC समय-समय पर RAC और DRDO वेबसाइटों तथा "The Employment News" के माध्यम से विज्ञापन जारी करता है, ताकि DRDO की रुचि के क्षेत्रों में विशेष अनुभव रखने वाले वैज्ञानिक जनशक्ति की आवश्यकता पूरी की जा सके।'
                : 'RAC issues advertisement from time to time through RAC and DRDO websites & "The Employment News" to meet the requirement of scientific manpower having specialized experience in areas of interest to DRDO.'}
            </p>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}