import { useNavigate, useParams } from "react-router-dom";

const pdfMap = {
  bonafideCertificate: {
    title: "Bonafide Certificate",
    url: "https://rac.gov.in/drdo/public/docs_formats/bonafideCertificate.pdf",
  },
  ccaDeclaration142: {
    title: "CCA Declaration",
    url: "https://rac.gov.in/drdo/public/docs_formats/CCA%20Declaration_142.pdf",
  },
  obcProof: {
    title: "OBC Certificate Proforma",
    url: "https://rac.gov.in/drdo/public/docs_formats/obc_proof.pdf",
  },
  obcDeclaration: {
    title: "OBC Declaration",
    url: "https://rac.gov.in/drdo/public/docs_formats/obc_declaration.pdf",
  },
  ewsCertificate: {
    title: "EWS Certificate Proforma",
    url: "https://rac.gov.in/drdo/public/docs_formats/income_asset_format.pdf",
  },
  ewsDeclaration: {
    title: "EWS Declaration",
    url: "https://rac.gov.in/drdo/public/docs_formats/EWS_Declaration.pdf",
  },
  scstProof: {
    title: "SC/ST Proforma",
    url: "https://rac.gov.in/drdo/public/docs_formats/sc_st_proof.pdf",
  },
  pwdProof: {
    title: "PWD Certificate Proforma",
    url: "https://rac.gov.in/drdo/public/docs_formats/ph_proof.pdf",
  },
  intimationLetter: {
    title: "Intimation to CCA Format",
    url: "https://rac.gov.in/drdo/public/docs_formats/Intimation_letter.pdf",
  },
  declarationIntimation145: {
    title: "Declaration Intimation to CCA Format",
    url: "https://rac.gov.in/drdo/public/docs_formats/Declaration_for_intimation.pdf",
  },
  intimationAda123: {
    title: "Intimation Letter to CCA Format (ADA Advt-123)",
    url: "https://rac.gov.in/drdo/public/docs_formats/CCA_Intimation%20format_ADA_Advt123.pdf",
  },
  noRecording147: {
    title: "No Recording Undertaking (147)",
    url: "https://rac.gov.in/drdo/public/docs_formats/no_recording_undertaking_147.pdf",
  },
  ccaDeclaration154: {
    title: "Intimation Letter to CCA Format (Advt-154)",
    url: "https://rac.gov.in/drdo/public/docs_formats/CCA_Declaration_154.pdf",
  },
  ccaDeclarationAda128: {
    title: "Intimation Letter to CCA Format (ADA Advt-128)",
    url: "https://rac.gov.in/drdo/public/docs_formats/CCA_Declaration_ADA_128.pdf",
  },
  ccaDeclaration152: {
    title: "CCA Declaration (Advt-152)",
    url: "https://rac.gov.in/drdo/public/docs_formats/CCA_Declaration_152.pdf",
  },
  intimationUndertaking156: {
    title: "Intimation-cum-Undertaking (Advt-156)",
    url: "https://rac.gov.in/drdo/public/docs_formats/Intimation_cum_Undertaking_156.pdf",
  },
  intimationLetter156: {
    title: "Intimation Letter (Advt-156)",
    url: "https://rac.gov.in/drdo/public/docs_formats/Intimation_cum_Undertaking1_156.pdf",
  },
  ccaDeclaration156: {
    title: "CCA Declaration (Advt-156)",
    url: "https://rac.gov.in/drdo/public/docs_formats/CCA_Declaration_156.pdf",
  },
  netDeclaration: {
    title: "NET Declaration",
    url: "https://rac.gov.in/drdo/public/docs_formats/declaration-from-candidates-due-to-appear-for-NET-2020.pdf",
  },
  finalYearDeclaration: {
    title: "Declaration For Final Year Candidates",
    url: "https://rac.gov.in/drdo/public/docs_formats/declaration_for_final_year_candidates.pdf",
  },
  centralGovtDeclaration: {
    title: "Central Govt Civilian Employee",
    url: "https://rac.gov.in/drdo/public/docs_formats/Declaration_for_intimation_ADA_128.pdf",
  },
};

function PdfViewerPage() {
  const navigate = useNavigate();
  const { pdfKey } = useParams();

  const pdfData = pdfMap[pdfKey];

  if (!pdfData) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] p-8 dark:bg-gray-900">
        <p className="text-xl text-red-600 dark:text-red-400">PDF not found.</p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-700 hover:underline dark:text-blue-400"
        >
          Back
        </button>
      </div>
    );
  }

  const proxiedPdfUrl = `http://localhost:5000/api/pdf-proxy?url=${encodeURIComponent(
    pdfData.url
  )}`;

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
        className="relative z-0 h-[210px] border-b-4 border-orange-400 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://rac.gov.in/assets/img/slider/slider1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/55" />
        <div className="relative mx-auto flex h-full max-w-[1600px] items-start justify-end px-10 py-12">
          <p className="text-3xl text-white">{pdfData.title}</p>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-6 max-w-[1500px] rounded-md bg-white px-6 py-6 shadow dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {pdfData.title}
          </h2>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm text-blue-700 hover:underline dark:text-blue-400"
          >
            Back
          </button>
        </div>

        <div className="h-[80vh] w-full overflow-hidden rounded border border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-900">
          <iframe
            src={`${proxiedPdfUrl}#toolbar=0`}
            title={pdfData.title}
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default PdfViewerPage;