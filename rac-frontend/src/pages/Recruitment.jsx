import LandingLayout from "../layouts/LandingLayout";

export default function Recruitment() {
  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white shadow-sm px-6 py-6 text-gray-800 dark:border-sky-900 dark:bg-gray-800 dark:text-gray-200">
        <h1 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-400">
          Recruitment
        </h1>

        <div className="space-y-5 text-[15px] leading-8">
          <p>
            Every year RAC recruits Scientists in DRDS mostly at entry level
            (Scientist &apos;B&apos;). However, depending on the requirements in
            specialized areas of research &amp; development, limited number of
            scientists are also recruited in higher grades (Scientist
            &apos;C&apos; to Scientist &apos;H&apos;).
          </p>

          <p>
            One of additional responsibilities of RAC includes the induction of
            Project Engineers on contract basis and Scientists / Engineers on
            regular basis for various Grades for ADA (Aeronautical Development
            Agency). ADA, Department of Defence R&amp;D is the nodal agency for
            the design &amp; development of LCA. RAC also assess the suitability
            of ADA scientists / engineers for promotion to next higher grade
            through duly constituted Assessment Boards.
          </p>

          <p>
            For more information visit{" "}
            <span className="font-medium text-blue-700 underline dark:text-blue-400">
              ADA website www.ada.gov.in
            </span>
          </p>
        </div>

        <section className="mt-6">
          <h2 className="mb-3 text-2xl font-medium text-gray-900 dark:text-white">
            Induction of Scientists in Science/ Engineering category
          </h2>

          <h3 className="mb-2 text-[20px] font-medium text-gray-900 dark:text-white">
            Essential Qualifications
          </h3>
          <ol className="list-decimal space-y-2 pl-8 text-[15px] leading-8">
            <li>
              At least first class Master&apos;s Degree in Science Subjects,
              Mathematics or Psychology or First Class Bachelor&apos;s Degree in
              Engineering or Technology or Metallurgy from a recognised
              University or equivalent.
            </li>
            <li>
              Experience of at least 3 years for Scientist &apos;C&apos;, 7 years
              for Scientist &apos;D&apos;, 10 years for Scientist &apos;E&apos;,
              13 years for Scientist &apos;F&apos; and 15 years for Scientist
              &apos;G&apos;/Scientist &apos;H&apos; in research/ design/
              development or production in the required area.
            </li>
          </ol>

          <h3 className="mb-2 mt-6 text-[20px] font-medium text-gray-900 dark:text-white">
            Desirable qualifications
          </h3>
          <ol className="list-decimal space-y-2 pl-8 text-[15px] leading-8">
            <li>Knowledge of Chinese, French, German, Japanese or Russian</li>
            <li>
              Doctorate degree in Science, Mathematics or Psychology or
              Master&apos;s degree in Engineering or Technology or Metallurgy in
              the subject concerned (applicable for Scientist &apos;C&apos; &amp;
              above).
            </li>
          </ol>

          <p className="mt-4 text-[15px]">
            Click here to know the list of recognised universities or equivalent
            as per AICTE guidelines
          </p>

          <div className="mt-2 text-right text-[15px] font-medium text-gray-900 dark:text-gray-100">
            (Source: AICTE website)
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-2xl font-medium text-gray-900 dark:text-white">
            Induction of Scientists in Medical/ Veterinary Science category
          </h2>

          <h3 className="mb-2 text-[20px] font-medium text-gray-900 dark:text-white">
            Essential qualifications
          </h3>

          <ol className="list-decimal space-y-3 pl-8 text-[15px] leading-8">
            <li>
              A medical qualification included in the First Schedule or the
              Second Schedule or Part II of the Third Schedule to the Indian
              Medical Council Act, 1956 (102 of 1956). Holders of medical
              qualifications included in the Part II of the said Third Schedule
              should also fulfill the conditions specified in Sub-section (3) of
              Section 13 of the said Act.
            </li>
          </ol>

          <p className="my-3 text-[15px]">Or</p>

          <ol className="list-decimal space-y-3 pl-8 text-[15px] leading-8">
            <li>
              A dental qualification included in the Part I, Part II or Part III
              of the Schedule to the Dentist Act, 1948 (16 of 1948).
            </li>
          </ol>

          <p className="my-3 text-[15px]">Or</p>

          <div className="space-y-3 text-[15px] leading-8">
            <p>
              A Bachelor&apos;s Degree in Veterinary Science &amp; Animal
              Husbandry (BVSc&amp;AH) duly recognised by Veterinary Council of
              India.
            </p>
          </div>

          <ol className="mt-3 list-decimal space-y-2 pl-8 text-[15px] leading-8">
            <li>Completion of compulsory rotating Internship.</li>
            <li>
              Post-graduate degree and (applicable for Scientist &apos;C&apos; &amp;
              above) experience of at least 3 years for Scientist &apos;C&apos;,
              7 years for Scientist &apos;D&apos;, 10 years for Scientist
              &apos;E&apos;, 13 years for Scientist &apos;F&apos; and 15 years
              for Scientist &apos;G&apos;/Scientist &apos;H&apos; in practical
              &amp; administrative field and also in the required field of
              medical relief, medical research, medical education or public
              health organisation.
            </li>
          </ol>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-2xl font-medium text-gray-900 dark:text-white">
            Age Limit
          </h2>

          <ol className="list-decimal space-y-2 pl-8 text-[15px] leading-8">
            <li>For Scientist &apos;B&apos;: not exceeding 28 years</li>
            <li>For Scientist &apos;C&apos;: not exceeding 35 years</li>
            <li>
              For Scientist &apos;D&apos; and Scientist &apos;E&apos;: not
              exceeding 45 years
            </li>
            <li>
              For Scientist &apos;F&apos; and &apos;G&apos;: not exceeding 50
              years.
            </li>
            <li>For Scientist &apos;H&apos;: not exceeding 54 years.</li>
          </ol>

          <p className="mt-5 text-[15px] leading-8">
            The upper age limit is relaxable upto 5 years in case of Scheduled
            Caste/ Scheduled Tribe candidates and 3 years for Other Backward
            Communities (OBC) against the post reserved for them. Relaxation of
            age for candidates in regular service of Central / Union Territory is
            as per rules in vogue. The upper age limit in addition to above is
            also relaxable by 5 yrs. for persons with disability in identical
            disciplines whether the posts are reserved for them or not. The offer
            of appointment is subject to verification of requisite certificates
            and medical fitness required for Group &apos;A&apos; (Class I
            Gazetted) technical posts of Government of India with field service
            liability.
          </p>
        </section>
      </div>
    </LandingLayout>
  );
}