import LandingLayout from "../layouts/LandingLayout";

export default function SelectionPG() {
  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white px-6 py-6 shadow-sm text-gray-800 dark:border-sky-900 dark:bg-gray-800 dark:text-gray-200">
        <h1 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-400">
          Selection for DRDO Employees and Service Officers of Armed Forces for
          Sponsored Post-Graduate Courses
        </h1>

        <div className="space-y-5 text-[15px] leading-8">
          <p>
            Selection of DRDO Employees to be sponsored by DRDO for pursuing
            ME/ MTech under the Research &amp; Training (R&amp;T) scheme of DRDO
            is carried out through RAC. The number of vacancies in different
            disciplines against various institutes/universities where ME/ MTech
            courses are sponsored, are announced for every academic year.
          </p>

          <p>
            Applicants from DRDO who are meeting eligibility criteria and other
            terms and conditions (as applicable), are selected for the course
            through an interview process by duly constituted Interview Board for
            that particular year.
          </p>

          <p>
            Similarly, RAC also conducts interviews for selection of candidates
            for ME/ MTech courses under Post Graduate Training (PGT) Scheme for
            Army, Navy and Air Force Personnel.
          </p>

          <p>
            The interviews for R&amp;T and PGT Scheme are conducted during
            April/ May, every year.
          </p>
        </div>
      </div>
    </LandingLayout>
  );
}