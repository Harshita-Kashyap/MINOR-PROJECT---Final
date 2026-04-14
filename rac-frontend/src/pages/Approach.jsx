import LandingLayout from "../layouts/LandingLayout";

export default function Approach() {
  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white shadow-sm px-6 py-6">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-amber-900 mb-6">
          Our Approach
        </h1>

        {/* VISION */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Vision</h2>
          <p className="mb-2">To become a centre of excellence and</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Provider of Quality deliverables in stipulated functional domains</li>
            <li>Generator of new knowledge in Scientific Performance Measurement</li>
            <li>Trainer to create a seamless community of HRD practitioners in advanced selection techniques</li>
          </ul>
        </section>

        {/* MISSION */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Mission</h2>
          <p className="mb-2">To realise the vision by</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Adopting highly professional approach in our job execution</li>
            <li>Acquiring state of art capabilities and facilities</li>
            <li>Strengthening our knowledge generation competencies through R&amp;D</li>
            <li>Nurturing total quality management culture</li>
            <li>Establishing strategic linkage with the world's best agencies</li>
          </ul>
        </section>

        {/* MOTTO */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Motto</h2>
          <ul className="list-disc pl-6">
            <li>Acting with Accuracy, Confidentiality and Timeliness</li>
          </ul>
        </section>

        {/* QUALITY POLICY */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Quality Policy</h2>

          <p className="mb-2">
            We are committed to provide quality services to DRDO in terms of
            smooth execution, timely completion and delivery of output for:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Recruitment of Scientists</li>
            <li>Assessment of Scientists for promotion to the next higher grades</li>
            <li>
              Selection of candidates for Research &amp; Training scheme of DRDO
              and Post Graduate Training scheme of Indian Armed Forces
            </li>
          </ul>

          <p className="mt-2">
            We are also committed to effect Continual Improvement in our services
            for the enhanced customer satisfaction
          </p>
        </section>

        {/* QUALITY OBJECTIVES */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            Quality Objectives
          </h2>

          <ul className="list-disc pl-6 space-y-1">
            <li>
              To accomplish Recruitments and Assessments within the stipulated
              period as defined by HQ or estimated by RAC
            </li>
            <li>
              To enhance the customer satisfaction in providing the recruitment
              and assessment services by maintaining Customer Satisfaction Index
              more than 80%
            </li>
            <li>To minimise &amp; rectify the customer complaints</li>
          </ul>
        </section>

      </div>
    </LandingLayout>
  );
}