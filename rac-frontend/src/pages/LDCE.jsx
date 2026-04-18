import LandingLayout from "../layouts/LandingLayout";

export default function LDCE() {
  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white px-6 py-6 shadow-sm text-gray-800 dark:border-sky-900 dark:bg-gray-800 dark:text-gray-200">
        <h1 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-400">
          Limited Departmental Competitive Examination (LDCE)
        </h1>

        <div className="space-y-5 text-[15px] leading-8">
          <p>
            RAC conducts LDCE for entry to Defence Research &amp; Development
            Service (DRDS) as Scientist &apos;B&apos;. Any person holding the
            post of Technical Officers &apos;A&apos; or Technical Officers
            &apos;B&apos; and having five years regular service and other
            technical personnel in the lower grades with ten years regular
            service in DRDO and possessing the educational qualifications
            prescribed for the post of Scientist &apos;B&apos; in Schedule-III
            of DRDS Rules shall be eligible to appear at the said examination
            for which there shall be no upper age limit. Unless otherwise
            specified by the Government in this behalf, no candidate shall be
            allowed to avail of more than five chances at the said departmental
            examination.
          </p>
        </div>
      </div>
    </LandingLayout>
  );
}