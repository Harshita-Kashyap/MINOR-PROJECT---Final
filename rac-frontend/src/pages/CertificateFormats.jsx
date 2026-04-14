import { useNavigate } from "react-router-dom";

const formatItems = [
  "Bonafide Certificate",
  "Intimation to CCA Format",
  "OBC Certificate Proforma",
  "OBC Declaration",
  "EWS Certificate Proforma",
  "EWS Declaration",
  "SC/ST Proforma",
  "PWD Certificate Proforma",
  "Intimation to CCA Format(ADVT-145)",
  "Declaration Intimation to CCA Format(ADVT-145)",
  "Intimation Letter to CCA Format(ADA(ADVT-123))",
  "No Recording Undertaking (147)",
  "Intimation Letter to CCA Format(ADVT-154)",
  "Intimation Letter to CCA Format(ADA(ADVT-128))",
  "CCA Declaration (Advt-152)",
  "Intimation-cum-Undertaking (for Temporary govt employee who are unable to get NOC) (Advt-156)",
  "Intimation Letter (for Permanent govt/Temporary govt employee) (Advt-156)",
  "Declaration to CCA (Advt-156)",
  "NET Declaration",
  "Declaration For Final Year Candidates",
  "Central Govt Civilian Employee",
];

function CertificateFormats() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      {/* TOP HEADER */}
      <div className="bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-8 py-6">
          <img
            src="https://rac.gov.in/images/rac_logo_2025_sm.png"
            alt="RAC Logo"
            className="h-24 w-24 object-contain"
          />

          <div className="leading-tight text-black">
            <h1 className="text-2xl font-bold uppercase">
              Recruitment &amp; Assessment Centre
            </h1>
            <p className="text-[2rem]">DRDO, Ministry of Defence</p>
            <p className="text-[2rem]">Delhi, India</p>
          </div>
        </div>
      </div>

      {/* BANNER */}
      <div
        className="relative h-[210px] border-b-4 border-orange-400 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://rac.gov.in/assets/img/slider/slider1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/55" />
        <div className="relative mx-auto flex h-full max-w-[1600px] items-start justify-end px-10 py-12">
          <p className="text-3xl text-white">Certificate / Declaration Formats</p>
        </div>
      </div>

      {/* CONTENT CARD */}
      <div className="mx-auto -mt-10 max-w-[1500px] rounded-md bg-white px-10 py-10 shadow">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[690px_1fr]">
          <div className="bg-[#f5f2f2] p-8">
            <h2 className="mb-8 text-5xl font-normal text-gray-700">
              Certificate / Declaration Formats
            </h2>

            <div className="space-y-2 text-[16px] leading-8 text-gray-700">
              {formatItems.map((item, index) => (
                <p key={index}>
                  {index + 1}) {item}
                </p>
              ))}
            </div>
          </div>

          <div />
        </div>
      </div>

      {/* BACK BUTTON OPTIONAL */}
      <div className="mx-auto max-w-[1500px] px-4 py-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm text-blue-700 hover:underline"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default CertificateFormats;