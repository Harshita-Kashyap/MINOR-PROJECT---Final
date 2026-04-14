import LandingLayout from "../layouts/LandingLayout";

const faqItems = [
  "What are the primary responsibilities of RAC?",
  "How can I contact RAC?",
  "Whom to contact for information?",
  "From where can I get more information on DRDO and RAC?",
  "What are the pay scales of scientists at various levels?",
  "What are the salient features and promotion policy of DRDS?",
  "Where are the labs of DRDO situated?",
  "What are various modes of induction of scientists into DRDO system?",
  "What is the upper age limit to join the Organisation?",
  "What is the minimum qualification required for different posts?",
  "What is the minimum relevant experience required for different posts?",
  "What are the main subjects of relevance to DRDO scientific positions?",
  "I have some experience in Research & Development in the areas of interest to DRDO. Can I join DRDO at a higher post?",
  "Is it possible to acquire higher education after joining the Organisation?",
  "Is there any scope in DRDO for Graduates/Postgraduates in Arts?",
  "I am MBA, in what position can I join DRDO?",
  "Can I send the application online?",
  "Can I apply for more than one post in one advertisement?",
  "What is LDCE?",
  "What documents are required at the time of interview?",
  "What is the procedure for payment of TA?",
  "Whom to contact for any suggestion in current FAQ?",
  "I have done Diploma in Electronics, can I apply for a Scientist post in DRDO?",
  "My Essential Qualification and Higher Qualification (HQ) subjects are different, can I apply according to my HQ subject?",
  "What is the procedure for doing summer Training in DRDO?",
  "The last date for submission of applications has just passed, can I apply now?",
];

export default function FAQs() {
  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white px-6 py-6 shadow-sm text-gray-900">
        {/* SMALL TITLE */}
        <h1 className="mb-6 text-4xl font-bold text-amber-900">FAQs</h1>

        {/* LARGE HEADING */}
        <h2 className="mb-6 text-5xl font-normal tracking-wide text-gray-800">
          Frequently Asked Questions (FAQs)
        </h2>

        {/* QUESTIONS */}
        <div className="space-y-2 text-[15px] font-semibold leading-8">
          {faqItems.map((item, index) => (
            <p key={index}>. {item}</p>
          ))}
        </div>
      </div>
    </LandingLayout>
  );
}