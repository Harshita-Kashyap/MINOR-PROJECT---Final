import { useState } from "react";
import LandingLayout from "../layouts/LandingLayout";

const faqItems = [
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
          <p className="text-blue-800 font-semibold text-2xl italic mt-2">
            director.rac@gov.in
          </p>
        </div>
      </>
    ),
  },
  {
    question: "Whom to contact for information?",
    answer: (
      <>
        <div className="space-y-4">
          <div>
            <p>Central Public Information Officer (CPIO)</p>
            <p>Ph No. +91-011-23971049</p>
          </div>
          <div>
            <p>Public Relation Officer (PRO)</p>
            <p>Ph No. +91-011-2383-0599</p>
            <p className="text-blue-800 font-semibold text-2xl italic mt-2">
              pro.recruitment@gov.in
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    question: "From where can I get more information on DRDO and RAC?",
    answer: (
      <div className="space-y-2">
        <p>For more information on DRDO visit: https://drdo.gov.in</p>
        <p>For more information on RAC visit: https://rac.gov.in</p>
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
    answer: <p>Laboratories and establishments are situated across multiple locations in India.</p>,
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
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-left text-sm">
            <thead className="bg-blue-50">
              <tr>
                <th className="border border-gray-300 px-3 py-2">Category</th>
                <th className="border border-gray-300 px-3 py-2">Sc 'B'</th>
                <th className="border border-gray-300 px-3 py-2">Sc 'C'</th>
                <th className="border border-gray-300 px-3 py-2">Sc 'D'</th>
                <th className="border border-gray-300 px-3 py-2">Sc 'E'</th>
                <th className="border border-gray-300 px-3 py-2">Sc 'F'</th>
                <th className="border border-gray-300 px-3 py-2">Sc 'G'</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2">Unreserved</td>
                <td className="border border-gray-300 px-3 py-2">35</td>
                <td className="border border-gray-300 px-3 py-2">40</td>
                <td className="border border-gray-300 px-3 py-2">50</td>
                <td className="border border-gray-300 px-3 py-2">50</td>
                <td className="border border-gray-300 px-3 py-2">50</td>
                <td className="border border-gray-300 px-3 py-2">50</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2">EWS</td>
                <td className="border border-gray-300 px-3 py-2">35</td>
                <td className="border border-gray-300 px-3 py-2">N.A.</td>
                <td className="border border-gray-300 px-3 py-2">N.A.</td>
                <td className="border border-gray-300 px-3 py-2">N.A.</td>
                <td className="border border-gray-300 px-3 py-2">N.A.</td>
                <td className="border border-gray-300 px-3 py-2">N.A.</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2">OBC</td>
                <td className="border border-gray-300 px-3 py-2">38</td>
                <td className="border border-gray-300 px-3 py-2">N.A.</td>
                <td className="border border-gray-300 px-3 py-2">N.A.</td>
                <td className="border border-gray-300 px-3 py-2">N.A.</td>
                <td className="border border-gray-300 px-3 py-2">N.A.</td>
                <td className="border border-gray-300 px-3 py-2">N.A.</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2">SC/ST</td>
                <td className="border border-gray-300 px-3 py-2">40</td>
                <td className="border border-gray-300 px-3 py-2">N.A.</td>
                <td className="border border-gray-300 px-3 py-2">N.A.</td>
                <td className="border border-gray-300 px-3 py-2">N.A.</td>
                <td className="border border-gray-300 px-3 py-2">N.A.</td>
                <td className="border border-gray-300 px-3 py-2">N.A.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">Note: Relaxations for PH candidates apply as per government rules.</p>
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
      <>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-left text-sm">
            <thead className="bg-blue-50">
              <tr>
                <th className="border border-gray-300 px-3 py-2">Post</th>
                <th className="border border-gray-300 px-3 py-2">
                  Science / Engineering / Technical
                </th>
                <th className="border border-gray-300 px-3 py-2">Medical</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Scientist 'B'", "Nil", "Nil"],
                ["Scientist 'C'", "3", "3"],
                ["Scientist 'D'", "7", "7"],
                ["Scientist 'E'", "10", "10"],
                ["Scientist 'F'", "13", "13"],
                ["Scientist 'G'", "15", "15"],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell} className="border border-gray-300 px-3 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    question: "What are the main subjects of relevance to DRDO scientific positions?",
    answer: (
      <>
        <p className="mb-3">Main subjects of interest include:</p>
        <ul className="list-disc pl-6 columns-1 md:columns-2 gap-8 space-y-1">
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
          <li>No Objection Certificate, if employed in government or similar service</li>
          <li>Applicable service documents for departmental or armed forces candidates</li>
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
        <p className="text-blue-800 font-semibold text-2xl italic">
          director.rac@gov.in
        </p>
      </>
    ),
  },
  {
    question: "I have done Diploma in Electronics, can I apply for a Scientist post in DRDO?",
    answer: <p>No. Diploma holders are not eligible for the post of Scientist in DRDS.</p>,
  },
  {
    question:
      "My Essential Qualification and Higher Qualification (HQ) subjects are different, can I apply according to my HQ subject?",
    answer: <p>No. You cannot apply only on the basis of your HQ subject if it does not match the required essential qualification criteria.</p>,
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
    answer: <p>No. Applications are not accepted after the last/closing date of the advertisement.</p>,
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white px-6 py-6 shadow-sm text-gray-900">
        <h1 className="mb-6 text-4xl font-bold text-amber-900">FAQs</h1>

        <h2 className="mb-8 text-5xl font-normal tracking-wide text-gray-800">
          Frequently Asked Questions (FAQs)
        </h2>

        <div className="space-y-5">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="border-b border-gray-200 pb-4">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left"
                >
                  <p className="text-[15px] font-semibold leading-8 hover:text-blue-700 transition">
                    . {item.question}
                  </p>
                </button>

                {isOpen && (
                  <div className="mt-2 pl-4 text-[15px] leading-8 text-gray-800">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </LandingLayout>
  );
}