import { useTranslation } from "react-i18next";
import LandingLayout from "../../../layouts/LandingLayout";

export default function Recruitment() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === "hi";

  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white shadow-sm px-6 py-6 text-gray-800 dark:border-sky-900 dark:bg-gray-800 dark:text-gray-200">
        <h1 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-400">
          {isHindi ? "भर्ती" : "Recruitment"}
        </h1>

        <div className="space-y-5 text-[15px] leading-8">
          <p>
            {isHindi
              ? "हर वर्ष RAC मुख्यतः प्रवेश स्तर (Scientist 'B') पर DRDS में वैज्ञानिकों की भर्ती करता है। हालांकि, अनुसंधान एवं विकास के विशेष क्षेत्रों की आवश्यकताओं के अनुसार, सीमित संख्या में वैज्ञानिकों की भर्ती उच्च ग्रेड (Scientist 'C' से Scientist 'H') में भी की जाती है।"
              : "Every year RAC recruits Scientists in DRDS mostly at entry level (Scientist 'B'). However, depending on the requirements in specialized areas of research & development, limited number of scientists are also recruited in higher grades (Scientist 'C' to Scientist 'H')."}
          </p>

          <p>
            {isHindi
              ? "RAC की अतिरिक्त जिम्मेदारियों में ADA (Aeronautical Development Agency) के लिए विभिन्न ग्रेडों में परियोजना अभियंताओं की संविदा आधार पर तथा वैज्ञानिकों / अभियंताओं की नियमित आधार पर भर्ती भी शामिल है। ADA, रक्षा अनुसंधान एवं विकास विभाग की नोडल एजेंसी है, जो LCA के डिजाइन एवं विकास के लिए कार्य करती है। RAC विधिवत गठित मूल्यांकन बोर्डों के माध्यम से ADA के वैज्ञानिकों / अभियंताओं की अगले उच्च ग्रेड में पदोन्नति हेतु उपयुक्तता का भी आकलन करता है।"
              : "One of additional responsibilities of RAC includes the induction of Project Engineers on contract basis and Scientists / Engineers on regular basis for various Grades for ADA (Aeronautical Development Agency). ADA, Department of Defence R&D is the nodal agency for the design & development of LCA. RAC also assess the suitability of ADA scientists / engineers for promotion to next higher grade through duly constituted Assessment Boards."}
          </p>

          <p>
            {isHindi ? "अधिक जानकारी के लिए देखें " : "For more information visit "}
            <span className="font-medium text-blue-700 underline dark:text-blue-400">
              ADA website www.ada.gov.in
            </span>
          </p>
        </div>

        <section className="mt-6">
          <h2 className="mb-3 text-2xl font-medium text-gray-900 dark:text-white">
            {isHindi
              ? "विज्ञान / अभियांत्रिकी श्रेणी में वैज्ञानिकों की भर्ती"
              : "Induction of Scientists in Science/ Engineering category"}
          </h2>

          <h3 className="mb-2 text-[20px] font-medium text-gray-900 dark:text-white">
            {isHindi ? "आवश्यक योग्यताएँ" : "Essential Qualifications"}
          </h3>

          <ol className="list-decimal space-y-2 pl-8 text-[15px] leading-8">
            <li>
              {isHindi
                ? "मान्यता प्राप्त विश्वविद्यालय या समकक्ष से विज्ञान विषयों, गणित या मनोविज्ञान में कम से कम प्रथम श्रेणी की मास्टर डिग्री, अथवा इंजीनियरिंग / प्रौद्योगिकी / धातुकर्म में प्रथम श्रेणी की स्नातक डिग्री।"
                : "At least first class Master's Degree in Science Subjects, Mathematics or Psychology or First Class Bachelor's Degree in Engineering or Technology or Metallurgy from a recognised University or equivalent."}
            </li>

            <li>
              {isHindi
                ? "Scientist 'C' के लिए कम से कम 3 वर्ष, Scientist 'D' के लिए 7 वर्ष, Scientist 'E' के लिए 10 वर्ष, Scientist 'F' के लिए 13 वर्ष तथा Scientist 'G'/Scientist 'H' के लिए 15 वर्ष का अनुसंधान / डिजाइन / विकास या उत्पादन के आवश्यक क्षेत्र में अनुभव।"
                : "Experience of at least 3 years for Scientist 'C', 7 years for Scientist 'D', 10 years for Scientist 'E', 13 years for Scientist 'F' and 15 years for Scientist 'G'/Scientist 'H' in research/ design/ development or production in the required area."}
            </li>
          </ol>

          <h3 className="mb-2 mt-6 text-[20px] font-medium text-gray-900 dark:text-white">
            {isHindi ? "वांछनीय योग्यताएँ" : "Desirable qualifications"}
          </h3>

          <ol className="list-decimal space-y-2 pl-8 text-[15px] leading-8">
            <li>
              {isHindi
                ? "चीनी, फ्रेंच, जर्मन, जापानी या रूसी भाषा का ज्ञान"
                : "Knowledge of Chinese, French, German, Japanese or Russian"}
            </li>

            <li>
              {isHindi
                ? "विज्ञान, गणित या मनोविज्ञान में डॉक्टरेट डिग्री या संबंधित विषय में इंजीनियरिंग / प्रौद्योगिकी / धातुकर्म में मास्टर डिग्री (Scientist 'C' एवं उससे ऊपर के लिए लागू)।"
                : "Doctorate degree in Science, Mathematics or Psychology or Master's degree in Engineering or Technology or Metallurgy in the subject concerned (applicable for Scientist 'C' & above)."}
            </li>
          </ol>

          <p className="mt-4 text-[15px]">
            {isHindi
              ? "AICTE दिशा-निर्देशों के अनुसार मान्यता प्राप्त विश्वविद्यालयों या समकक्ष की सूची जानने के लिए यहाँ क्लिक करें"
              : "Click here to know the list of recognised universities or equivalent as per AICTE guidelines"}
          </p>

          <div className="mt-2 text-right text-[15px] font-medium text-gray-900 dark:text-gray-100">
            {isHindi ? "(स्रोत: AICTE वेबसाइट)" : "(Source: AICTE website)"}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-2xl font-medium text-gray-900 dark:text-white">
            {isHindi
              ? "चिकित्सा / पशु चिकित्सा विज्ञान श्रेणी में वैज्ञानिकों की भर्ती"
              : "Induction of Scientists in Medical/ Veterinary Science category"}
          </h2>

          <h3 className="mb-2 text-[20px] font-medium text-gray-900 dark:text-white">
            {isHindi ? "आवश्यक योग्यताएँ" : "Essential qualifications"}
          </h3>

          <ol className="list-decimal space-y-3 pl-8 text-[15px] leading-8">
            <li>
              {isHindi
                ? "भारतीय चिकित्सा परिषद अधिनियम, 1956 की प्रथम अनुसूची, द्वितीय अनुसूची या तृतीय अनुसूची के भाग-II में सम्मिलित चिकित्सीय योग्यता। तृतीय अनुसूची के भाग-II में शामिल चिकित्सा योग्यता धारकों को उक्त अधिनियम की धारा 13 की उपधारा (3) में निर्दिष्ट शर्तें भी पूरी करनी होंगी।"
                : "A medical qualification included in the First Schedule or the Second Schedule or Part II of the Third Schedule to the Indian Medical Council Act, 1956 (102 of 1956). Holders of medical qualifications included in the Part II of the said Third Schedule should also fulfill the conditions specified in Sub-section (3) of Section 13 of the said Act."}
            </li>
          </ol>

          <p className="my-3 text-[15px]">{isHindi ? "या" : "Or"}</p>

          <ol className="list-decimal space-y-3 pl-8 text-[15px] leading-8">
            <li>
              {isHindi
                ? "दंत चिकित्सक अधिनियम, 1948 की अनुसूची के भाग-I, भाग-II या भाग-III में सम्मिलित दंत योग्यता।"
                : "A dental qualification included in the Part I, Part II or Part III of the Schedule to the Dentist Act, 1948 (16 of 1948)."}
            </li>
          </ol>

          <p className="my-3 text-[15px]">{isHindi ? "या" : "Or"}</p>

          <div className="space-y-3 text-[15px] leading-8">
            <p>
              {isHindi
                ? "वेटरनरी काउंसिल ऑफ इंडिया द्वारा मान्यता प्राप्त Bachelor’s Degree in Veterinary Science & Animal Husbandry (BVSc&AH)।"
                : "A Bachelor's Degree in Veterinary Science & Animal Husbandry (BVSc&AH) duly recognised by Veterinary Council of India."}
            </p>
          </div>

          <ol className="mt-3 list-decimal space-y-2 pl-8 text-[15px] leading-8">
            <li>
              {isHindi
                ? "अनिवार्य रोटेटिंग इंटर्नशिप की पूर्णता।"
                : "Completion of compulsory rotating Internship."}
            </li>

            <li>
              {isHindi
                ? "स्नातकोत्तर डिग्री तथा (Scientist 'C' एवं उससे ऊपर के लिए लागू) Scientist 'C' के लिए कम से कम 3 वर्ष, Scientist 'D' के लिए 7 वर्ष, Scientist 'E' के लिए 10 वर्ष, Scientist 'F' के लिए 13 वर्ष तथा Scientist 'G'/Scientist 'H' के लिए 15 वर्ष का व्यावहारिक एवं प्रशासनिक क्षेत्र का अनुभव, साथ ही चिकित्सा राहत, चिकित्सा अनुसंधान, चिकित्सा शिक्षा या जनस्वास्थ्य संगठन के आवश्यक क्षेत्र में अनुभव।"
                : "Post-graduate degree and (applicable for Scientist 'C' & above) experience of at least 3 years for Scientist 'C', 7 years for Scientist 'D', 10 years for Scientist 'E', 13 years for Scientist 'F' and 15 years for Scientist 'G'/Scientist 'H' in practical & administrative field and also in the required field of medical relief, medical research, medical education or public health organisation."}
            </li>
          </ol>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-2xl font-medium text-gray-900 dark:text-white">
            {isHindi ? "आयु सीमा" : "Age Limit"}
          </h2>

          <ol className="list-decimal space-y-2 pl-8 text-[15px] leading-8">
            <li>
              {isHindi
                ? "Scientist 'B' के लिए: 28 वर्ष से अधिक नहीं"
                : "For Scientist 'B': not exceeding 28 years"}
            </li>
            <li>
              {isHindi
                ? "Scientist 'C' के लिए: 35 वर्ष से अधिक नहीं"
                : "For Scientist 'C': not exceeding 35 years"}
            </li>
            <li>
              {isHindi
                ? "Scientist 'D' और Scientist 'E' के लिए: 45 वर्ष से अधिक नहीं"
                : "For Scientist 'D' and Scientist 'E': not exceeding 45 years"}
            </li>
            <li>
              {isHindi
                ? "Scientist 'F' और 'G' के लिए: 50 वर्ष से अधिक नहीं"
                : "For Scientist 'F' and 'G': not exceeding 50 years."}
            </li>
            <li>
              {isHindi
                ? "Scientist 'H' के लिए: 54 वर्ष से अधिक नहीं"
                : "For Scientist 'H': not exceeding 54 years."}
            </li>
          </ol>

          <p className="mt-5 text-[15px] leading-8">
            {isHindi
              ? "अधिकतम आयु सीमा में अनुसूचित जाति / अनुसूचित जनजाति उम्मीदवारों के लिए 5 वर्ष तथा अन्य पिछड़ा वर्ग (OBC) के लिए 3 वर्ष की छूट उनके लिए आरक्षित पदों पर दी जाती है। केंद्र / संघ राज्य क्षेत्र की नियमित सेवा में कार्यरत उम्मीदवारों के लिए आयु में छूट प्रचलित नियमों के अनुसार है। उपरोक्त के अतिरिक्त, समान विषयों में दिव्यांग व्यक्तियों के लिए 5 वर्ष की अतिरिक्त छूट भी लागू है, चाहे पद उनके लिए आरक्षित हों या नहीं। नियुक्ति का प्रस्ताव आवश्यक प्रमाणपत्रों के सत्यापन तथा भारत सरकार के Group 'A' (Class I Gazetted) तकनीकी पदों के लिए आवश्यक चिकित्सीय उपयुक्तता पर निर्भर करेगा, जिनमें फील्ड सेवा देयता भी शामिल है।"
              : "The upper age limit is relaxable upto 5 years in case of Scheduled Caste/ Scheduled Tribe candidates and 3 years for Other Backward Communities (OBC) against the post reserved for them. Relaxation of age for candidates in regular service of Central / Union Territory is as per rules in vogue. The upper age limit in addition to above is also relaxable by 5 yrs. for persons with disability in identical disciplines whether the posts are reserved for them or not. The offer of appointment is subject to verification of requisite certificates and medical fitness required for Group 'A' (Class I Gazetted) technical posts of Government of India with field service liability."}
          </p>
        </section>
      </div>
    </LandingLayout>
  );
}