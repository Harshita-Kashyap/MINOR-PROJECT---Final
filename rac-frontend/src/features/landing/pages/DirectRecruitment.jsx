import { useTranslation } from "react-i18next";
import LandingLayout from "../../../layouts/LandingLayout";

export default function DirectRecruitment() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === "hi";

  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white px-6 py-6 shadow-sm dark:border-sky-900 dark:bg-gray-800">
        <h1 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-400">
          {isHindi ? "प्रत्यक्ष भर्ती" : "Direct Recruitment"}
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
          <div>
            <div className="inline-block border border-gray-300 bg-white p-2 shadow-md dark:border-gray-700 dark:bg-gray-900">
              <img
                src="https://rac.gov.in/images/content/brahmos.jpg"
                alt={isHindi ? "प्रत्यक्ष भर्ती" : "Direct Recruitment"}
                className="h-auto w-full max-w-[260px] object-cover"
              />
            </div>
          </div>

          <div className="space-y-5 text-[15px] leading-8 text-gray-800 dark:text-gray-200">
            <p>
              {isHindi
                ? "इस विज्ञापन में वैज्ञानिक और अभियांत्रिकी विषयों में Scientist 'B' के पद भी शामिल होते हैं, जो DRDO से संबंधित हैं और Scientist Entry Test (SET) के अंतर्गत नहीं आते। ये विज्ञापन प्रत्येक कैलेंडर वर्ष की दूसरी और अंतिम तिमाही के दौरान जारी किए जाते हैं।"
                : "The advertisement also includes Scientist 'B' posts in scientific and engineering subjects of relevance to DRDO, which are not covered under Scientist Entry Test (SET). These advertisements are issued during the second and last quarter of the calendar year."}
            </p>

            <p>
              {isHindi
                ? "इस चयन श्रेणी के उम्मीदवारों को लिखित परीक्षा में बैठने की आवश्यकता नहीं होती। उम्मीदवारों को उनके GATE Score के आधार पर साक्षात्कार के लिए शॉर्टलिस्ट किया जाता है। वैज्ञानिकों का चयन चयन साक्षात्कार में उनके प्रदर्शन की रैंकिंग के आधार पर किया जाता है।"
                : "The candidates under this category of selection need not have to appear for the written test. The candidates are short-listed for interview based on their GATE Score. The selection of scientists is based on their performance ranking in the selection interviews."}
            </p>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}