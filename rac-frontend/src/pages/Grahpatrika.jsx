import LandingLayout from "../layouts/LandingLayout";

export default function Grahpatrika() {
  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white px-6 py-6 shadow-sm text-gray-900">
        
        {/* TITLE */}
        <h1 className="mb-6 text-4xl font-bold text-amber-900">
          गृहपत्रिका
        </h1>

        {/* IMAGE CONTAINER */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl bg-gray-100 p-6 shadow-inner">
            <img
              src="https://rac.gov.in/download/publications/hindi/2020/chayanika_29102020.jpg"
              alt="Grahpatrika"
              className="w-full object-contain rounded"
            />
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}