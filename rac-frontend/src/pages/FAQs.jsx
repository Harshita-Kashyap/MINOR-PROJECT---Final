import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import LandingLayout from "../layouts/LandingLayout";
import Card from "../components/ui/Card";

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
  const { t, i18n } = useTranslation();

  const faqItems = useMemo(() => {
    const isHindi = i18n.language === "hi";

    const itemsEn = [
      {
        question: "What are the primary responsibilities of RAC?",
        answer: (
          <>
            <p className="mb-3">
              RAC mainly handles scientific recruitment and assessment activities
              under the DRDS system. It supports selection processes for multiple
              scientific levels and related training-based induction schemes.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Recruitment of scientists for DRDO</li>
              <li>Assessment for promotion to higher scientific grades</li>
              <li>
                Selection of candidates for higher study and training schemes of
                DRDO and armed forces
              </li>
            </ul>
          </>
        ),
      },
      {
        question: "How can I contact RAC?",
        answer: (
          <>
            <p>You may send your queries to:</p>
            <div className="mt-3 space-y-1">
              <p>Director</p>
              <p>Recruitment &amp; Assessment Centre</p>
              <p>Defence Research and Development Organisation</p>
              <p>Ministry of Defence, Government of India</p>
              <p>Lucknow Road, Timarpur</p>
              <p>Delhi 110054</p>
              <p className="mt-3">Telefax: +91-011-23812690, +91-011-23817833</p>
              <p className="mt-2 break-all text-lg font-semibold italic text-blue-800 dark:text-blue-400">
                director.rac@gov.in
              </p>
            </div>
          </>
        ),
      },
      {
        question: "Whom to contact for information?",
        answer: (
          <div className="space-y-4">
            <div>
              <p>Central Public Information Officer (CPIO)</p>
              <p>Ph No. +91-011-23971049</p>
            </div>
            <div>
              <p>Public Relation Officer (PRO)</p>
              <p>Ph No. +91-011-2383-0599</p>
              <p className="mt-2 break-all text-lg font-semibold italic text-blue-800 dark:text-blue-400">
                pro.recruitment@gov.in
              </p>
            </div>
          </div>
        ),
      },
      {
        question: "From where can I get more information on DRDO and RAC?",
        answer: (
          <div className="space-y-2">
            <p>
              For more information on DRDO visit:{" "}
              <a
                href="https://drdo.gov.in"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-blue-700 underline underline-offset-2 dark:text-blue-400"
              >
                https://drdo.gov.in
              </a>
            </p>
            <p>
              For more information on RAC visit:{" "}
              <a
                href="https://rac.gov.in"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-blue-700 underline underline-offset-2 dark:text-blue-400"
              >
                https://rac.gov.in
              </a>
            </p>
          </div>
        ),
      },
      {
        question: "What are the pay scales of scientists at various levels?",
        answer: (
          <p>
            DRDS pay scales vary by scientific grade. You can refer to the DRDS
            page in your ribbon for the pay matrix and initial pay details.
          </p>
        ),
      },
      {
        question: "What are the salient features and promotion policy of DRDS?",
        answer: (
          <>
            <p className="mb-3">
              DRDO scientists work under a merit-based promotion system.
              Advancement to higher grades depends on eligibility, performance
              review, and structured assessment or peer review.
            </p>
            <p className="mb-3">
              Minimum residency varies by grade, and in some cases relaxation may
              be available for consistently strong performance.
            </p>
            <p>
              DRDO also supports higher education, training, and professional
              development through recognized academic and training institutions.
            </p>
          </>
        ),
      },
      {
        question: "Where are the labs of DRDO situated?",
        answer: (
          <p>
            Laboratories and establishments are situated across multiple locations
            in India.
          </p>
        ),
      },
      {
        question:
          "What are various modes of induction of scientists into DRDO system?",
        answer: (
          <ul className="list-disc pl-6 space-y-1">
            <li>Direct recruitment at entry level</li>
            <li>Lateral recruitment for higher grades</li>
            <li>Limited Departmental Competitive Examination (LDCE)</li>
            <li>Other specialized recruitment schemes as notified</li>
          </ul>
        ),
      },
      {
        question: "What is the upper age limit to join the Organisation?",
        answer: (
          <>
            <p className="mb-3">
              The upper age limit is considered with reference to the closing date
              of application. Typical limits are:
            </p>

            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-blue-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                  <tr>
                    {[
                      "Category",
                      "Sc 'B'",
                      "Sc 'C'",
                      "Sc 'D'",
                      "Sc 'E'",
                      "Sc 'F'",
                      "Sc 'G'",
                    ].map((head) => (
                      <th
                        key={head}
                        className="border-b border-gray-200 px-3 py-2 font-semibold dark:border-gray-700"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800">
                  {[
                    ["Unreserved", "35", "40", "50", "50", "50", "50"],
                    ["EWS", "35", "N.A.", "N.A.", "N.A.", "N.A.", "N.A."],
                    ["OBC", "38", "N.A.", "N.A.", "N.A.", "N.A.", "N.A."],
                    ["SC/ST", "40", "N.A.", "N.A.", "N.A.", "N.A.", "N.A."],
                  ].map((row) => (
                    <tr
                      key={row[0]}
                      className="border-t border-gray-200 dark:border-gray-700"
                    >
                      {row.map((cell, i) => (
                        <td
                          key={`${row[0]}-${i}`}
                          className="px-3 py-2 text-gray-700 dark:text-gray-200"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Note: Relaxations for PH candidates apply as per government rules.
            </p>
          </>
        ),
      },
      {
        question:
          "What is the minimum qualification required for different posts?",
        answer: (
          <>
            <p className="mb-3">
              Qualification requirements depend on post and discipline. In
              general, science, engineering, psychology, mathematics, medical,
              dental, and veterinary qualifications are relevant depending on the
              grade and role.
            </p>
            <p>
              For higher grades, required experience and in some cases higher
              educational qualifications are also considered.
            </p>
          </>
        ),
      },
      {
        question:
          "What is the minimum relevant experience required for different posts?",
        answer: (
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-blue-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                <tr>
                  <th className="border-b border-gray-200 px-3 py-2 font-semibold dark:border-gray-700">
                    Post
                  </th>
                  <th className="border-b border-gray-200 px-3 py-2 font-semibold dark:border-gray-700">
                    Science / Engineering / Technical
                  </th>
                  <th className="border-b border-gray-200 px-3 py-2 font-semibold dark:border-gray-700">
                    Medical
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800">
                {[
                  ["Scientist 'B'", "Nil", "Nil"],
                  ["Scientist 'C'", "3", "3"],
                  ["Scientist 'D'", "7", "7"],
                  ["Scientist 'E'", "10", "10"],
                  ["Scientist 'F'", "13", "13"],
                  ["Scientist 'G'", "15", "15"],
                ].map((row) => (
                  <tr
                    key={row[0]}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    {row.map((cell, i) => (
                      <td
                        key={`${row[0]}-${i}`}
                        className="px-3 py-2 text-gray-700 dark:text-gray-200"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
      },
      {
        question:
          "What are the main subjects of relevance to DRDO scientific positions?",
        answer: (
          <>
            <p className="mb-3">Main subjects of interest include:</p>
            <ul className="list-disc columns-1 gap-8 space-y-1 pl-6 md:columns-2">
              <li>Aeronautical Engineering</li>
              <li>Agricultural Sciences</li>
              <li>Chemical Engineering</li>
              <li>Chemistry</li>
              <li>Civil Engineering</li>
              <li>Computer Science</li>
              <li>Electronics and Communication Engineering</li>
              <li>Electrical Engineering</li>
              <li>Environmental Science</li>
              <li>Food Science</li>
              <li>Fire Engineering</li>
              <li>Life Sciences</li>
              <li>Mathematics / Statistics / OR</li>
              <li>Mechanical Engineering</li>
              <li>Metallurgy</li>
              <li>Oceanography</li>
              <li>Physics</li>
              <li>Psychology</li>
              <li>Textile Engineering</li>
              <li>Medicine / Nuclear Medicine</li>
            </ul>
            <p className="mt-3">
              ...and other related subjects relevant to DRDO.
            </p>
          </>
        ),
      },
      {
        question:
          "I have some experience in Research & Development in the areas of interest to DRDO. Can I join DRDO at a higher post?",
        answer: (
          <p>
            Yes. Apart from entry-level recruitment, DRDO also inducts scientists
            at higher grades through lateral recruitment, depending on experience,
            specialization, and requirement of laboratories.
          </p>
        ),
      },
      {
        question:
          "Is it possible to acquire higher education after joining the Organisation?",
        answer: (
          <p>
            Yes. Scientists may pursue M.E./M.Tech./Ph.D. through approved
            academic routes, including external registration or sponsorship for
            higher studies after completing required service conditions.
          </p>
        ),
      },
      {
        question:
          "Is there any scope in DRDO for Graduates/Postgraduates in Arts?",
        answer: (
          <p>
            In general, DRDO scientific recruitment requires first class
            postgraduate qualifications in science or first class graduate degree
            in engineering. However, specific subjects like Mathematics,
            Statistics, Operational Research, and Psychology may also be relevant
            in some cases.
          </p>
        ),
      },
      {
        question: "I am MBA, in what position can I join DRDO?",
        answer: (
          <p>
            DRDO primarily recruits scientists and technologists with science or
            engineering backgrounds. MBA may be useful only in limited cases where
            such qualification is specifically desirable.
          </p>
        ),
      },
      {
        question: "Can I send the application online?",
        answer: (
          <p>
            Yes. Applications are submitted online along with the required fee, if
            applicable, before the closing date of the advertisement.
          </p>
        ),
      },
      {
        question: "Can I apply for more than one post in one advertisement?",
        answer: (
          <p>
            Yes. You may apply for more than one post in the same advertisement,
            but a separate application should be submitted for each post.
          </p>
        ),
      },
      {
        question: "What is LDCE?",
        answer: (
          <p>
            LDCE stands for Limited Departmental Competitive Examination. It is
            used to induct eligible technical cadre personnel of DRDO into the
            DRDS cadre as Scientist &apos;B&apos;.
          </p>
        ),
      },
      {
        question: "What documents are required at the time of interview?",
        answer: (
          <>
            <p className="mb-3">Candidates are generally expected to bring:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Proof of relevant experience</li>
              <li>
                Passport-size photograph and original certificates, mark sheets,
                and testimonials
              </li>
              <li>Self-attested copies for verification</li>
              <li>Project report / thesis / publications, where relevant</li>
              <li>
                No Objection Certificate, if employed in government or similar
                service
              </li>
              <li>
                Applicable service documents for departmental or armed forces
                candidates
              </li>
            </ul>
          </>
        ),
      },
      {
        question: "What is the procedure for payment of TA?",
        answer: (
          <p>
            Eligible candidates called for interview may be paid traveling
            allowance as per applicable rules, generally limited to the
            admissible class and shortest route criteria.
          </p>
        ),
      },
      {
        question: "Whom to contact for any suggestion in current FAQ?",
        answer: (
          <>
            <p className="mb-3">
              Suggestions for adding questions or revising the FAQ may be sent to
              Director RAC.
            </p>
            <p className="break-all text-lg font-semibold italic text-blue-800 dark:text-blue-400">
              director.rac@gov.in
            </p>
          </>
        ),
      },
      {
        question:
          "I have done Diploma in Electronics, can I apply for a Scientist post in DRDO?",
        answer: (
          <p>
            No. Diploma holders are not eligible for the post of Scientist in
            DRDS.
          </p>
        ),
      },
      {
        question:
          "My Essential Qualification and Higher Qualification (HQ) subjects are different, can I apply according to my HQ subject?",
        answer: (
          <p>
            No. You cannot apply only on the basis of your HQ subject if it does
            not match the required essential qualification criteria.
          </p>
        ),
      },
      {
        question: "What is the procedure for doing summer Training in DRDO?",
        answer: (
          <p>
            You may apply for summer training to the Director of a suitable DRDO
            lab as per your discipline. The DRDO website may be used for further
            details.
          </p>
        ),
      },
      {
        question:
          "The last date for submission of applications has just passed, can I apply now?",
        answer: (
          <p>
            No. Applications are not accepted after the last/closing date of the
            advertisement.
          </p>
        ),
      },
    ];

    const itemsHi = [
      {
        question: "RAC की मुख्य जिम्मेदारियाँ क्या हैं?",
        answer: (
          <>
            <p className="mb-3">
              RAC मुख्य रूप से DRDS प्रणाली के अंतर्गत वैज्ञानिक भर्ती और
              मूल्यांकन गतिविधियों का कार्य करता है। यह विभिन्न वैज्ञानिक
              स्तरों के चयन तथा प्रशिक्षण-आधारित योजनाओं से संबंधित प्रक्रियाओं
              को संभालता है।
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>DRDO के लिए वैज्ञानिकों की भर्ती</li>
              <li>उच्च वैज्ञानिक ग्रेड में पदोन्नति हेतु मूल्यांकन</li>
              <li>
                DRDO तथा सशस्त्र बलों की उच्च अध्ययन और प्रशिक्षण योजनाओं हेतु
                अभ्यर्थियों का चयन
              </li>
            </ul>
          </>
        ),
      },
      {
        question: "मैं RAC से कैसे संपर्क कर सकता/सकती हूँ?",
        answer: (
          <>
            <p>आप अपनी जिज्ञासाएँ यहाँ भेज सकते हैं:</p>
            <div className="mt-3 space-y-1">
              <p>निदेशक</p>
              <p>भर्ती एवं मूल्यांकन केंद्र</p>
              <p>रक्षा अनुसंधान एवं विकास संगठन</p>
              <p>रक्षा मंत्रालय, भारत सरकार</p>
              <p>लखनऊ रोड, तिमारपुर</p>
              <p>दिल्ली 110054</p>
              <p className="mt-3">टेलीफैक्स: +91-011-23812690, +91-011-23817833</p>
              <p className="mt-2 break-all text-lg font-semibold italic text-blue-800 dark:text-blue-400">
                director.rac@gov.in
              </p>
            </div>
          </>
        ),
      },
      {
        question: "जानकारी के लिए किससे संपर्क करें?",
        answer: (
          <div className="space-y-4">
            <div>
              <p>केंद्रीय लोक सूचना अधिकारी (CPIO)</p>
              <p>फोन नं. +91-011-23971049</p>
            </div>
            <div>
              <p>जनसंपर्क अधिकारी (PRO)</p>
              <p>फोन नं. +91-011-2383-0599</p>
              <p className="mt-2 break-all text-lg font-semibold italic text-blue-800 dark:text-blue-400">
                pro.recruitment@gov.in
              </p>
            </div>
          </div>
        ),
      },
      {
        question: "DRDO और RAC के बारे में अधिक जानकारी कहाँ से मिल सकती है?",
        answer: (
          <div className="space-y-2">
            <p>
              DRDO के बारे में अधिक जानकारी के लिए देखें:{" "}
              <a
                href="https://drdo.gov.in"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-blue-700 underline underline-offset-2 dark:text-blue-400"
              >
                https://drdo.gov.in
              </a>
            </p>
            <p>
              RAC के बारे में अधिक जानकारी के लिए देखें:{" "}
              <a
                href="https://rac.gov.in"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-blue-700 underline underline-offset-2 dark:text-blue-400"
              >
                https://rac.gov.in
              </a>
            </p>
          </div>
        ),
      },
      {
        question: "विभिन्न स्तरों पर वैज्ञानिकों के वेतनमान क्या हैं?",
        answer: (
          <p>
            DRDS में वेतनमान वैज्ञानिक ग्रेड के अनुसार अलग-अलग होते हैं। वेतन
            मैट्रिक्स और प्रारंभिक वेतन के लिए आप DRDS पेज देख सकते हैं।
          </p>
        ),
      },
      {
        question: "DRDS की मुख्य विशेषताएँ और पदोन्नति नीति क्या है?",
        answer: (
          <>
            <p className="mb-3">
              DRDO वैज्ञानिक योग्यता-आधारित पदोन्नति प्रणाली के अंतर्गत कार्य
              करते हैं। उच्चतर ग्रेड में उन्नति पात्रता, प्रदर्शन मूल्यांकन और
              संरचित मूल्यांकन/पीयर रिव्यू पर आधारित होती है।
            </p>
            <p className="mb-3">
              विभिन्न ग्रेडों के लिए न्यूनतम निवास अवधि अलग होती है, और कुछ
              मामलों में उत्कृष्ट प्रदर्शन पर छूट भी मिल सकती है।
            </p>
            <p>
              DRDO उच्च शिक्षा, प्रशिक्षण और व्यावसायिक विकास के अवसर भी प्रदान
              करता है।
            </p>
          </>
        ),
      },
      {
        question: "DRDO की प्रयोगशालाएँ कहाँ-कहाँ स्थित हैं?",
        answer: (
          <p>प्रयोगशालाएँ और प्रतिष्ठान भारत के अनेक स्थानों पर स्थित हैं।</p>
        ),
      },
      {
        question:
          "DRDO प्रणाली में वैज्ञानिकों की भर्ती के विभिन्न तरीके क्या हैं?",
        answer: (
          <ul className="list-disc pl-6 space-y-1">
            <li>प्रवेश स्तर पर सीधी भर्ती</li>
            <li>उच्च ग्रेडों के लिए पार्श्व भर्ती</li>
            <li>सीमित विभागीय प्रतियोगी परीक्षा (LDCE)</li>
            <li>अन्य विशेष भर्ती योजनाएँ</li>
          </ul>
        ),
      },
      {
        question: "संगठन में शामिल होने की अधिकतम आयु सीमा क्या है?",
        answer: (
          <>
            <p className="mb-3">
              अधिकतम आयु सीमा आवेदन की अंतिम तिथि के आधार पर निर्धारित की जाती
              है। सामान्यतः सीमाएँ इस प्रकार हैं:
            </p>

            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-blue-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                  <tr>
                    {[
                      "श्रेणी",
                      "Sc 'B'",
                      "Sc 'C'",
                      "Sc 'D'",
                      "Sc 'E'",
                      "Sc 'F'",
                      "Sc 'G'",
                    ].map((head) => (
                      <th
                        key={head}
                        className="border-b border-gray-200 px-3 py-2 font-semibold dark:border-gray-700"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800">
                  {[
                    ["अनारक्षित", "35", "40", "50", "50", "50", "50"],
                    ["EWS", "35", "N.A.", "N.A.", "N.A.", "N.A.", "N.A."],
                    ["OBC", "38", "N.A.", "N.A.", "N.A.", "N.A.", "N.A."],
                    ["SC/ST", "40", "N.A.", "N.A.", "N.A.", "N.A.", "N.A."],
                  ].map((row) => (
                    <tr
                      key={row[0]}
                      className="border-t border-gray-200 dark:border-gray-700"
                    >
                      {row.map((cell, i) => (
                        <td
                          key={`${row[0]}-${i}`}
                          className="px-3 py-2 text-gray-700 dark:text-gray-200"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              नोट: दिव्यांग अभ्यर्थियों हेतु शिथिलता सरकारी नियमों के अनुसार लागू
              होगी।
            </p>
          </>
        ),
      },
      {
        question: "विभिन्न पदों के लिए न्यूनतम शैक्षणिक योग्यता क्या है?",
        answer: (
          <>
            <p className="mb-3">
              योग्यता पद और विषय के अनुसार भिन्न होती है। सामान्यतः विज्ञान,
              इंजीनियरिंग, मनोविज्ञान, गणित, चिकित्सा, दंत चिकित्सा तथा पशु
              चिकित्सा से संबंधित योग्यताएँ लागू होती हैं।
            </p>
            <p>
              उच्च पदों के लिए अनुभव और कुछ मामलों में उच्च शैक्षणिक योग्यता भी
              आवश्यक हो सकती है।
            </p>
          </>
        ),
      },
      {
        question: "विभिन्न पदों के लिए न्यूनतम प्रासंगिक अनुभव कितना चाहिए?",
        answer: (
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-blue-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                <tr>
                  <th className="border-b border-gray-200 px-3 py-2 font-semibold dark:border-gray-700">
                    पद
                  </th>
                  <th className="border-b border-gray-200 px-3 py-2 font-semibold dark:border-gray-700">
                    विज्ञान / इंजीनियरिंग / तकनीकी
                  </th>
                  <th className="border-b border-gray-200 px-3 py-2 font-semibold dark:border-gray-700">
                    चिकित्सा
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800">
                {[
                  ["Scientist 'B'", "Nil", "Nil"],
                  ["Scientist 'C'", "3", "3"],
                  ["Scientist 'D'", "7", "7"],
                  ["Scientist 'E'", "10", "10"],
                  ["Scientist 'F'", "13", "13"],
                  ["Scientist 'G'", "15", "15"],
                ].map((row) => (
                  <tr
                    key={row[0]}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    {row.map((cell, i) => (
                      <td
                        key={`${row[0]}-${i}`}
                        className="px-3 py-2 text-gray-700 dark:text-gray-200"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
      },
      {
        question:
          "DRDO के वैज्ञानिक पदों के लिए मुख्य विषय कौन-कौन से हैं?",
        answer: (
          <>
            <p className="mb-3">मुख्य विषयों में शामिल हैं:</p>
            <ul className="list-disc columns-1 gap-8 space-y-1 pl-6 md:columns-2">
              <li>एरोनॉटिकल इंजीनियरिंग</li>
              <li>कृषि विज्ञान</li>
              <li>रासायनिक इंजीनियरिंग</li>
              <li>रसायन विज्ञान</li>
              <li>सिविल इंजीनियरिंग</li>
              <li>कंप्यूटर साइंस</li>
              <li>इलेक्ट्रॉनिक्स एवं संचार इंजीनियरिंग</li>
              <li>इलेक्ट्रिकल इंजीनियरिंग</li>
              <li>पर्यावरण विज्ञान</li>
              <li>फूड साइंस</li>
              <li>फायर इंजीनियरिंग</li>
              <li>लाइफ साइंसेज</li>
              <li>गणित / सांख्यिकी / OR</li>
              <li>मैकेनिकल इंजीनियरिंग</li>
              <li>मेटलर्जी</li>
              <li>ओशनोग्राफी</li>
              <li>फिजिक्स</li>
              <li>मनोविज्ञान</li>
              <li>टेक्सटाइल इंजीनियरिंग</li>
              <li>मेडिसिन / न्यूक्लियर मेडिसिन</li>
            </ul>
            <p className="mt-3">
              ...तथा अन्य संबंधित विषय जो DRDO के लिए प्रासंगिक हों।
            </p>
          </>
        ),
      },
      {
        question:
          "मेरे पास R&D क्षेत्र में अनुभव है। क्या मैं DRDO में उच्च पद पर शामिल हो सकता/सकती हूँ?",
        answer: (
          <p>
            हाँ। प्रवेश स्तर की भर्ती के अलावा, DRDO आवश्यकता और अनुभव के
            आधार पर उच्च ग्रेडों में पार्श्व भर्ती भी करता है।
          </p>
        ),
      },
      {
        question:
          "क्या संगठन में शामिल होने के बाद उच्च शिक्षा प्राप्त करना संभव है?",
        answer: (
          <p>
            हाँ। वैज्ञानिक निर्धारित सेवा अवधि पूरी करने के बाद स्वीकृत शैक्षणिक
            मार्गों के माध्यम से M.E./M.Tech./Ph.D. कर सकते हैं।
          </p>
        ),
      },
      {
        question:
          "क्या Arts में Graduate/Postgraduate अभ्यर्थियों के लिए DRDO में कोई अवसर है?",
        answer: (
          <p>
            सामान्यतः DRDO वैज्ञानिक भर्ती के लिए विज्ञान में प्रथम श्रेणी की
            स्नातकोत्तर डिग्री या इंजीनियरिंग में प्रथम श्रेणी की स्नातक डिग्री
            आवश्यक होती है। हालांकि गणित, सांख्यिकी, ऑपरेशनल रिसर्च और
            मनोविज्ञान जैसे विषय कुछ मामलों में प्रासंगिक हो सकते हैं।
          </p>
        ),
      },
      {
        question: "मैं MBA हूँ, मैं DRDO में किस पद पर शामिल हो सकता/सकती हूँ?",
        answer: (
          <p>
            DRDO मुख्यतः विज्ञान और इंजीनियरिंग पृष्ठभूमि वाले वैज्ञानिकों और
            तकनीकी विशेषज्ञों की भर्ती करता है। MBA केवल सीमित मामलों में उपयोगी
            हो सकता है।
          </p>
        ),
      },
      {
        question: "क्या मैं आवेदन ऑनलाइन भेज सकता/सकती हूँ?",
        answer: (
          <p>
            हाँ। आवेदन विज्ञापन की अंतिम तिथि से पहले आवश्यक शुल्क सहित ऑनलाइन
            जमा किए जाते हैं।
          </p>
        ),
      },
      {
        question: "क्या मैं एक विज्ञापन में एक से अधिक पदों के लिए आवेदन कर सकता/सकती हूँ?",
        answer: (
          <p>
            हाँ। आप एक ही विज्ञापन में एक से अधिक पदों के लिए आवेदन कर सकते हैं,
            लेकिन प्रत्येक पद के लिए अलग आवेदन करना होगा।
          </p>
        ),
      },
      {
        question: "LDCE क्या है?",
        answer: (
          <p>
            LDCE का अर्थ है Limited Departmental Competitive Examination। यह
            DRDO के पात्र तकनीकी कर्मियों को DRDS संवर्ग में Scientist 'B' के
            रूप में शामिल करने के लिए आयोजित की जाती है।
          </p>
        ),
      },
      {
        question: "साक्षात्कार के समय कौन-कौन से दस्तावेज़ आवश्यक होते हैं?",
        answer: (
          <>
            <p className="mb-3">
              अभ्यर्थियों से सामान्यतः निम्न दस्तावेज़ लाने की अपेक्षा की जाती
              है:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>प्रासंगिक अनुभव का प्रमाण</li>
              <li>
                पासपोर्ट आकार का फोटो तथा मूल प्रमाणपत्र, अंकतालिकाएँ और
                प्रशंसापत्र
              </li>
              <li>सत्यापन हेतु स्वयं-अभिप्रमाणित प्रतियाँ</li>
              <li>प्रोजेक्ट रिपोर्ट / थीसिस / प्रकाशन, जहाँ लागू हो</li>
              <li>
                यदि सरकारी या समान सेवा में कार्यरत हों तो अनापत्ति प्रमाणपत्र
              </li>
              <li>
                विभागीय या सशस्त्र बल अभ्यर्थियों हेतु लागू सेवा दस्तावेज़
              </li>
            </ul>
          </>
        ),
      },
      {
        question: "TA भुगतान की प्रक्रिया क्या है?",
        answer: (
          <p>
            साक्षात्कार हेतु बुलाए गए पात्र अभ्यर्थियों को लागू नियमों के अनुसार
            यात्रा भत्ता दिया जा सकता है।
          </p>
        ),
      },
      {
        question: "वर्तमान FAQ में सुझाव देने के लिए किससे संपर्क करें?",
        answer: (
          <>
            <p className="mb-3">
              FAQ में प्रश्न जोड़ने या संशोधन के सुझाव निदेशक RAC को भेजे जा
              सकते हैं।
            </p>
            <p className="break-all text-lg font-semibold italic text-blue-800 dark:text-blue-400">
              director.rac@gov.in
            </p>
          </>
        ),
      },
      {
        question:
          "मैंने Electronics में Diploma किया है, क्या मैं DRDO में Scientist पद के लिए आवेदन कर सकता/सकती हूँ?",
        answer: (
          <p>नहीं। Diploma धारक DRDS में Scientist पद हेतु पात्र नहीं हैं।</p>
        ),
      },
      {
        question:
          "मेरी Essential Qualification और Higher Qualification के विषय अलग हैं, क्या मैं HQ विषय के आधार पर आवेदन कर सकता/सकती हूँ?",
        answer: (
          <p>
            नहीं। यदि आपका HQ विषय आवश्यक शैक्षणिक योग्यता से मेल नहीं खाता, तो
            आप केवल उसके आधार पर आवेदन नहीं कर सकते।
          </p>
        ),
      },
      {
        question: "DRDO में summer training करने की प्रक्रिया क्या है?",
        answer: (
          <p>
            आप अपने विषय के अनुसार उपयुक्त DRDO प्रयोगशाला के निदेशक को आवेदन
            भेज सकते हैं। अधिक जानकारी के लिए DRDO वेबसाइट देखी जा सकती है।
          </p>
        ),
      },
      {
        question:
          "आवेदन जमा करने की अंतिम तिथि निकल गई है, क्या मैं अब आवेदन कर सकता/सकती हूँ?",
        answer: (
          <p>
            नहीं। अंतिम तिथि के बाद आवेदन स्वीकार नहीं किए जाते।
          </p>
        ),
      },
    ];

    return isHindi ? itemsHi : itemsEn;
  }, [i18n.language]);

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
                key={`${i18n.language}-${index}`}
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