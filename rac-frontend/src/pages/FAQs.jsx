import { useMemo, useState } from "react";
import LandingLayout from "../layouts/LandingLayout";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

const rawFaqItems = [
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
          <p className="mt-2 text-lg font-semibold italic text-blue-800 dark:text-blue-400 break-all">
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
          <p className="mt-2 text-lg font-semibold italic text-blue-800 dark:text-blue-400 break-all">
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
        DRDS pay scales vary by scientific grade. You can refer to the DRDS page
        in your ribbon for the pay matrix and initial pay details.
      </p>
    ),
  },
  {
    question: "What are the salient features and promotion policy of DRDS?",
    answer: (
      <>
        <p className="mb-3">
          DRDO scientists work under a merit-based promotion system. Advancement
          to higher grades depends on eligibility, performance review, and
          structured assessment or peer review.
        </p>
        <p className="mb-3">
          Minimum residency varies by grade, and in some cases relaxation may be
          available for consistently strong performance.
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
        Laboratories and establishments are situated across multiple locations in
        India.
      </p>
    ),
  },
  {
    question: "What are various modes of induction of scientists into DRDO system?",
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
          The upper age limit is considered with reference to the closing date of
          application. Typical limits are:
        </p>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-blue-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
              <tr>
                {["Category", "Sc 'B'", "Sc 'C'", "Sc 'D'", "Sc 'E'", "Sc 'F'", "Sc 'G'"].map((head) => (
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
    question: "What is the minimum qualification required for different posts?",
    answer: (
      <>
        <p className="mb-3">
          Qualification requirements depend on post and discipline. In general,
          science, engineering, psychology, mathematics, medical, dental, and
          veterinary qualifications are relevant depending on the grade and role.
        </p>
        <p>
          For higher grades, required experience and in some cases higher
          educational qualifications are also considered.
        </p>
      </>
    ),
  },
  {
    question: "What is the minimum relevant experience required for different posts?",
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
    question: "What are the main subjects of relevance to DRDO scientific positions?",
    answer: (
      <>
        <p className="mb-3">Main subjects of interest include:</p>
        <ul className="list-disc pl-6 columns-1 gap-8 space-y-1 md:columns-2">
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
        <p className="mt-3">...and other related subjects relevant to DRDO.</p>
      </>
    ),
  },
  {
    question:
      "I have some experience in Research & Development in the areas of interest to DRDO. Can I join DRDO at a higher post?",
    answer: (
      <p>
        Yes. Apart from entry-level recruitment, DRDO also inducts scientists at
        higher grades through lateral recruitment, depending on experience,
        specialization, and requirement of laboratories.
      </p>
    ),
  },
  {
    question: "Is it possible to acquire higher education after joining the Organisation?",
    answer: (
      <p>
        Yes. Scientists may pursue M.E./M.Tech./Ph.D. through approved academic
        routes, including external registration or sponsorship for higher studies
        after completing required service conditions.
      </p>
    ),
  },
  {
    question: "Is there any scope in DRDO for Graduates/Postgraduates in Arts?",
    answer: (
      <p>
        In general, DRDO scientific recruitment requires first class postgraduate
        qualifications in science or first class graduate degree in engineering.
        However, specific subjects like Mathematics, Statistics, Operational
        Research, and Psychology may also be relevant in some cases.
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
        Yes. You may apply for more than one post in the same advertisement, but
        a separate application should be submitted for each post.
      </p>
    ),
  },
  {
    question: "What is LDCE?",
    answer: (
      <p>
        LDCE stands for Limited Departmental Competitive Examination. It is used
        to induct eligible technical cadre personnel of DRDO into the DRDS cadre
        as Scientist &apos;B&apos;.
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
            Passport-size photograph and original certificates, mark sheets, and
            testimonials
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
        Eligible candidates called for interview may be paid traveling allowance
        as per applicable rules, generally limited to the admissible class and
        shortest route criteria.
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
        <p className="text-lg font-semibold italic text-blue-800 dark:text-blue-400 break-all">
          director.rac@gov.in
        </p>
      </>
    ),
  },
  {
    question: "I have done Diploma in Electronics, can I apply for a Scientist post in DRDO?",
    answer: (
      <p>No. Diploma holders are not eligible for the post of Scientist in DRDS.</p>
    ),
  },
  {
    question:
      "My Essential Qualification and Higher Qualification (HQ) subjects are different, can I apply according to my HQ subject?",
    answer: (
      <p>
        No. You cannot apply only on the basis of your HQ subject if it does not
        match the required essential qualification criteria.
      </p>
    ),
  },
  {
    question: "What is the procedure for doing summer Training in DRDO?",
    answer: (
      <p>
        You may apply for summer training to the Director of a suitable DRDO lab
        as per your discipline. The DRDO website may be used for further details.
      </p>
    ),
  },
  {
    question: "The last date for submission of applications has just passed, can I apply now?",
    answer: (
      <p>
        No. Applications are not accepted after the last/closing date of the
        advertisement.
      </p>
    ),
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
              Frequently Asked Questions
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-[15px]">
              Find quick answers related to RAC, DRDO scientific recruitment,
              eligibility, application process, qualifications, and interview
              requirements.
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