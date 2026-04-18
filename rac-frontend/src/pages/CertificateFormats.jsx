import { useNavigate } from "react-router-dom";

const formatItems = [
  { label: "Bonafide Certificate", key: "bonafideCertificate" },
  { label: "Intimation to CCA Format", key: "intimationLetter" },
  { label: "OBC Certificate Proforma", key: "obcProof" },
  { label: "OBC Declaration", key: "obcDeclaration" },
  { label: "EWS Certificate Proforma", key: "ewsCertificate" },
  { label: "EWS Declaration", key: "ewsDeclaration" },
  { label: "SC/ST Proforma", key: "scstProof" },
  { label: "PWD Certificate Proforma", key: "pwdProof" },
  { label: "Intimation to CCA Format(ADVT-145)", key: "ccaDeclaration142" },
  {
    label: "Declaration Intimation to CCA Format(ADVT-145)",
    key: "declarationIntimation145",
  },
  {
    label: "Intimation Letter to CCA Format(ADA(ADVT-123))",
    key: "intimationAda123",
  },
  { label: "No Recording Undertaking (147)", key: "noRecording147" },
  {
    label: "Intimation Letter to CCA Format(ADVT-154)",
    key: "ccaDeclaration154",
  },
  {
    label: "Intimation Letter to CCA Format(ADA(ADVT-128))",
    key: "ccaDeclarationAda128",
  },
  { label: "CCA Declaration (Advt-152)", key: "ccaDeclaration152" },
  {
    label:
      "Intimation-cum-Undertaking (for Temporary govt employee who are unable to get NOC) (Advt-156)",
    key: "intimationUndertaking156",
  },
  {
    label:
      "Intimation Letter (for Permanent govt/Temporary govt employee) (Advt-156)",
    key: "intimationLetter156",
  },
  { label: "Declaration to CCA (Advt-156)", key: "ccaDeclaration156" },
  { label: "NET Declaration", key: "netDeclaration" },
  {
    label: "Declaration For Final Year Candidates",
    key: "finalYearDeclaration",
  },
  { label: "Central Govt Civilian Employee", key: "centralGovtDeclaration" },
];

function CertificateFormats() {
  const navigate = useNavigate();

  const handleOpen = (key) => {
    navigate(`/certificate-formats/${key}`);
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800">
        <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-8 py-6">
          <img
            src="https://rac.gov.in/images/rac_logo_2025_sm.png"
            alt="RAC Logo"
            className="h-24 w-24 object-contain"
          />

          <div className="leading-tight text-black dark:text-white">
            <h1 className="text-2xl font-bold uppercase">
              Recruitment &amp; Assessment Centre
            </h1>
            <p className="text-[2rem]">DRDO, Ministry of Defence</p>
            <p className="text-[2rem]">Delhi, India</p>
          </div>
        </div>
      </div>

      <div
        className="relative h-[210px] border-b-4 border-orange-400 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://rac.gov.in/assets/img/slider/slider1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/55" />
        <div className="relative mx-auto flex h-full max-w-[1600px] items-start justify-end px-10 py-12">
          <p className="text-3xl text-white">
            Certificate / Declaration Formats
          </p>
        </div>
      </div>

      <div className="mx-auto -mt-10 max-w-[1500px] rounded-md bg-white px-10 py-10 shadow dark:bg-gray-800">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[690px_1fr]">
          <div className="bg-[#f5f2f2] p-8 dark:bg-gray-900">
            <h2 className="mb-8 text-5xl font-normal text-gray-700 dark:text-gray-100">
              Certificate / Declaration Formats
            </h2>

            <div className="space-y-2 text-[16px] leading-8 text-gray-700 dark:text-gray-200">
              {formatItems.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleOpen(item.key)}
                  className="block cursor-pointer text-left hover:text-blue-700 hover:underline dark:hover:text-blue-400"
                >
                  {index + 1}) {item.label}
                </button>
              ))}
            </div>
          </div>

          <div />
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-4 py-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm text-blue-700 hover:underline dark:text-blue-400"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default CertificateFormats;