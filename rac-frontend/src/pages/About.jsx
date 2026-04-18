import LandingLayout from "../layouts/LandingLayout";

export default function About() {
  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white px-6 py-6 shadow-sm dark:border-sky-900 dark:bg-gray-800">
        <h1 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-400">
          About Us
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
          <div>
            <div className="inline-block border border-gray-300 bg-white p-2 shadow-md dark:border-gray-700 dark:bg-gray-900">
              <img
                src="https://rac.gov.in/images/content/rac-building.jpg"
                alt="RAC Building"
                className="h-auto w-full max-w-[260px] object-cover"
              />
            </div>
          </div>

          <div className="space-y-5 text-[15px] leading-8 text-gray-800 dark:text-gray-200">
            <p>
              RAC, the <strong>Recruitment and Assessment Centre</strong> of
              DRDO was set up on 23 July 1985 after getting exemption from the
              purview of Union Public Service Commission (UPSC). It is situated
              at Lucknow Road, Timarpur, Delhi.
            </p>

            <p>
              RAC has undertaken various recruitment programmes to induct
              scientists each year in variety of scientific and engineering
              disciplines relevant to DRDO Laboratories and assessed the
              suitability of DRDO scientists for promotion to next higher grade
              through duly constituted Assessment Boards/Peer Committee.
            </p>

            <h3 className="mt-4 text-lg font-semibold text-red-600 dark:text-red-400">
              The primary responsibilities of RAC
            </h3>

            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Recruitment of Scientists (Group 'A' Class I Gazetted Post) in
                DRDO
              </li>
              <li>
                Assessments of Scientists of DRDO for promotion to the next
                higher grades
              </li>
              <li>
                Selection of candidates for higher study course (ME/ M. Tech/
                MSc Engg) under Research & Training Scheme of DRDO and Post
                Graduate Training scheme of Army, Navy and Air Force
              </li>
              <li>
                Any other assignment specified by Secretary, Department of
                Defence R&amp;D and Chairman, DRDO
              </li>
            </ol>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}