import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import LandingLayout from "../layouts/LandingLayout";
import Card from "../components/ui/Card";

const rawFaqItems = [
  {
    question: "What are the primary responsibilities of RAC?",
    answer:
      "RAC mainly handles scientific recruitment and assessment activities under the DRDS system. It supports selection processes for multiple scientific levels and related training-based induction schemes.",
  },
  {
    question: "How can I contact RAC?",
    answer:
      "You may send your queries to Director, Recruitment & Assessment Centre, Defence Research and Development Organisation, Ministry of Defence, Government of India, Lucknow Road, Timarpur, Delhi 110054.",
  },
  {
    question: "From where can I get more information on DRDO and RAC?",
    answer:
      "For more information on DRDO visit https://drdo.gov.in and for more information on RAC visit https://rac.gov.in.",
  },
  {
    question: "What is LDCE?",
    answer:
      "LDCE stands for Limited Departmental Competitive Examination. It is used to induct eligible technical cadre personnel of DRDO into the DRDS cadre as Scientist 'B'.",
  },
];

function FAQItem({ item, index, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/90 transition-all duration-200 hover:border-blue-200 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800/90 dark:hover:border-blue-800">
      <button
        type="button"
        onClick={() => onToggle(index)}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="flex items-start gap-3">
          <span className="mt-1 text-sm font-semibold text-blue-700 dark:text-blue-400">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="text-[15px] font-semibold leading-7 text-gray-900 transition-colors hover:text-blue-700 dark:text-gray-100 dark:hover:text-blue-400">
            {item.question}
          </p>
        </div>

        <span className="mt-1 shrink-0 text-xl font-light text-gray-500 dark:text-gray-300">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-gray-100 px-5 pb-5 pl-12 pt-4 text-[15px] leading-7 text-gray-700 dark:border-gray-700 dark:text-gray-300">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(0);
  const { t } = useTranslation();

  const faqItems = useMemo(() => {
    const seen = new Set();
    return rawFaqItems.filter((item) => {
      const key = item.question.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <LandingLayout>
      <div className="w-full">
        <Card className="border-sky-200 bg-white px-5 py-6 shadow-sm dark:border-sky-900 dark:bg-gray-800 sm:px-6 sm:py-7">
          <div className="mb-8 border-b border-gray-200 pb-5 dark:border-gray-700">
            <h1 className="text-3xl font-bold tracking-tight text-amber-900 dark:text-amber-400 sm:text-4xl">
              {t("faqTitle")}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-[15px]">
              {t("faqIntro")}
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <FAQItem
                key={item.question}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={toggleFaq}
              />
            ))}
          </div>
        </Card>
      </div>
    </LandingLayout>
  );
}