import { useTranslation } from "react-i18next";
import LandingLayout from "../../../layouts/LandingLayout";

export default function SelectionPG() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === "hi";

  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white px-6 py-6 shadow-sm text-gray-800 dark:border-sky-900 dark:bg-gray-800 dark:text-gray-200">
        
        <h1 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-400">
          {isHindi
            ? "DRDO कर्मचारियों एवं सशस्त्र बलों के अधिकारियों के लिए प्रायोजित स्नातकोत्तर पाठ्यक्रमों हेतु चयन"
            : "Selection for DRDO Employees and Service Officers of Armed Forces for Sponsored Post-Graduate Courses"}
        </h1>

        <div className="space-y-5 text-[15px] leading-8">

          <p>
            {isHindi
              ? "DRDO के कर्मचारियों को ME/MTech करने हेतु DRDO के Research & Training (R&T) योजना के अंतर्गत प्रायोजित करने के लिए चयन प्रक्रिया RAC द्वारा संचालित की जाती है। विभिन्न संस्थानों/विश्वविद्यालयों में ME/MTech पाठ्यक्रमों के लिए विभिन्न विषयों में उपलब्ध सीटों की संख्या प्रत्येक शैक्षणिक वर्ष के लिए घोषित की जाती है।"
              : "Selection of DRDO Employees to be sponsored by DRDO for pursuing ME/ MTech under the Research & Training (R&T) scheme of DRDO is carried out through RAC. The number of vacancies in different disciplines against various institutes/universities where ME/ MTech courses are sponsored, are announced for every academic year."}
          </p>

          <p>
            {isHindi
              ? "DRDO के वे आवेदक जो पात्रता मानदंड एवं अन्य नियमों और शर्तों (जैसा लागू हो) को पूरा करते हैं, उनका चयन संबंधित वर्ष के लिए विधिवत गठित साक्षात्कार बोर्ड द्वारा साक्षात्कार प्रक्रिया के माध्यम से किया जाता है।"
              : "Applicants from DRDO who are meeting eligibility criteria and other terms and conditions (as applicable), are selected for the course through an interview process by duly constituted Interview Board for that particular year."}
          </p>

          <p>
            {isHindi
              ? "इसी प्रकार RAC, सेना, नौसेना और वायु सेना के कर्मियों के लिए Post Graduate Training (PGT) योजना के अंतर्गत ME/MTech पाठ्यक्रमों के लिए उम्मीदवारों के चयन हेतु साक्षात्कार भी आयोजित करता है।"
              : "Similarly, RAC also conducts interviews for selection of candidates for ME/ MTech courses under Post Graduate Training (PGT) Scheme for Army, Navy and Air Force Personnel."}
          </p>

          <p>
            {isHindi
              ? "R&T तथा PGT योजनाओं के लिए साक्षात्कार प्रत्येक वर्ष अप्रैल/मई के दौरान आयोजित किए जाते हैं।"
              : "The interviews for R&T and PGT Scheme are conducted during April/ May, every year."}
          </p>

        </div>
      </div>
    </LandingLayout>
  );
}