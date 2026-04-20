import { useTranslation } from "react-i18next";
import LandingLayout from "../../../layouts/LandingLayout";

export default function LDCE() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === "hi";

  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white px-6 py-6 shadow-sm text-gray-800 dark:border-sky-900 dark:bg-gray-800 dark:text-gray-200">
        <h1 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-400">
          {isHindi
            ? "सीमित विभागीय प्रतियोगी परीक्षा (LDCE)"
            : "Limited Departmental Competitive Examination (LDCE)"}
        </h1>

        <div className="space-y-5 text-[15px] leading-8">
          <p>
            {isHindi
              ? "RAC, Defence Research & Development Service (DRDS) में Scientist 'B' के रूप में प्रवेश हेतु LDCE आयोजित करता है। Technical Officer 'A' या Technical Officer 'B' के पद पर कार्यरत कोई भी व्यक्ति, जिसके पास पाँच वर्ष की नियमित सेवा हो, तथा निचले ग्रेड के अन्य तकनीकी कार्मिक, जिनके पास DRDO में दस वर्ष की नियमित सेवा हो और जो DRDS Rules की Schedule-III में Scientist 'B' के पद के लिए निर्धारित शैक्षणिक योग्यताएँ रखते हों, उक्त परीक्षा में बैठने के पात्र होंगे। इसके लिए कोई अधिकतम आयु सीमा नहीं होगी। जब तक सरकार द्वारा अन्यथा निर्दिष्ट न किया जाए, कोई भी उम्मीदवार इस विभागीय परीक्षा में पाँच से अधिक अवसरों का लाभ नहीं ले सकेगा।"
              : "RAC conducts LDCE for entry to Defence Research & Development Service (DRDS) as Scientist 'B'. Any person holding the post of Technical Officers 'A' or Technical Officers 'B' and having five years regular service and other technical personnel in the lower grades with ten years regular service in DRDO and possessing the educational qualifications prescribed for the post of Scientist 'B' in Schedule-III of DRDS Rules shall be eligible to appear at the said examination for which there shall be no upper age limit. Unless otherwise specified by the Government in this behalf, no candidate shall be allowed to avail of more than five chances at the said departmental examination."}
          </p>
        </div>
      </div>
    </LandingLayout>
  );
}