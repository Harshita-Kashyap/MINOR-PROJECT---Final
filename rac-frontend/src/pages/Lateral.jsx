import LandingLayout from "../layouts/LandingLayout";

export default function Lateral() {
  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white px-6 py-6 shadow-sm">
        
        {/* TITLE */}
        <h1 className="mb-6 text-4xl font-bold text-amber-900">
          Lateral Entry
        </h1>

        {/* CONTENT */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
          
          {/* IMAGE */}
          <div>
            <div className="inline-block border border-gray-300 bg-white p-2 shadow-md">
              <img
                src="https://rac.gov.in/images/content/brahmos.jpg"
                alt="Lateral Entry"
                className="h-auto w-full max-w-[260px] object-cover"
              />
            </div>
          </div>

          {/* TEXT */}
          <div className="text-[15px] leading-8 text-gray-800">
            <p>
              Recruitment of Scientists in middle &amp; senior grades
              (Scientist 'C' to Scientist 'H') based on qualification and
              experience in specialized fields relevant to DRDO is covered
              under this category of recruitment.
            </p>

            <p className="mt-4">
              RAC issues advertisement from time to time through RAC and
              DRDO websites &amp; "The Employment News" to meet the
              requirement of scientific manpower having specialized
              experience in areas of interest to DRDO.
            </p>
          </div>

        </div>
      </div>
    </LandingLayout>
  );
}