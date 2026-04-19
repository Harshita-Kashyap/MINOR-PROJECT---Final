import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/landing/Header";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

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
      <div className="min-h-screen bg-gray-100 transition-colors dark:bg-gray-900">
        <Header />

        <main className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">
          <Card>
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
              PDF not found
            </h1>
            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              The requested document could not be located. Please go back and
              select a valid certificate or declaration format.
            </p>

            <div className="mt-6">
              <Button variant="outline" onClick={() => navigate(-1)}>
                ← Back
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  const proxiedPdfUrl = `http://localhost:5000/api/pdf-proxy?url=${encodeURIComponent(
    pdfData.url
  )}`;

  return (
    <div className="min-h-screen bg-gray-100 transition-colors dark:bg-gray-900">
      <Header />

      {/* PAGE TITLE BAND */}
      <section className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-[1450px] px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wider text-blue-700 dark:text-blue-400">
            Document Viewer
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            {pdfData.title}
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
            Review the selected certificate or declaration format below. You may
            go back to the previous page to choose another document.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-[1450px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* PDF VIEWER */}
          <section className="xl:col-span-9">
            <Card className="overflow-hidden p-0">
              <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900/50">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {pdfData.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Embedded PDF preview
                  </p>
                </div>

                <Button variant="outline" onClick={() => navigate(-1)}>
                  ← Back
                </Button>
              </div>

              <div className="h-[78vh] w-full bg-gray-100 dark:bg-gray-900">
                <iframe
                  src={`${proxiedPdfUrl}#toolbar=0`}
                  title={pdfData.title}
                  className="h-full w-full"
                />
              </div>
            </Card>
          </section>

          {/* SIDE INFO */}
          <aside className="xl:col-span-3">
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Document Information
                </h3>

                <div className="mt-4 space-y-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                  <p>
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      Title:
                    </span>{" "}
                    {pdfData.title}
                  </p>

                  <p>
                    This page displays the selected RAC certificate or
                    declaration format for review and reference.
                  </p>
                </div>
              </Card>

              <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300">
                  Instructions
                </h3>

                <div className="mt-3 space-y-3 text-sm leading-7 text-blue-900/80 dark:text-blue-200/90">
                  <p>
                    Read the document carefully before using it for any official
                    submission purpose.
                  </p>

                  <p>
                    Ensure that the selected format matches your applicable
                    category, advertisement, or declaration requirement.
                  </p>
                </div>
              </Card>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default PdfViewerPage;