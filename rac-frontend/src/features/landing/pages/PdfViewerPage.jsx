import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import certificateContent from "../../../data/certificateContent";

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

const formatItems = [
  { label: "Bonafide Certificate", key: "bonafideCertificate" },
  { label: "Intimation to CCA Format", key: "intimationLetter" },
  { label: "OBC Certificate Proforma", key: "obcProof" },
  { label: "OBC Declaration", key: "obcDeclaration" },
  { label: "EWS Certificate Proforma", key: "ewsCertificate" },
  { label: "EWS Declaration", key: "ewsDeclaration" },
  { label: "SC/ST Proforma", key: "scstProof" },
  { label: "PWD Certificate Proforma", key: "pwdProof" },
  { label: "Intimation to CCA Format (ADVT-145)", key: "ccaDeclaration142" },
  {
    label: "Declaration Intimation to CCA Format (ADVT-145)",
    key: "declarationIntimation145",
  },
  {
    label: "Intimation Letter to CCA Format (ADA ADVT-123)",
    key: "intimationAda123",
  },
  { label: "No Recording Undertaking (147)", key: "noRecording147" },
  {
    label: "Intimation Letter to CCA Format (ADVT-154)",
    key: "ccaDeclaration154",
  },
  {
    label: "Intimation Letter to CCA Format (ADA ADVT-128)",
    key: "ccaDeclarationAda128",
  },
  { label: "CCA Declaration (Advt-152)", key: "ccaDeclaration152" },
  {
    label:
      "Intimation-cum-Undertaking (for temporary government employee unable to get NOC) (Advt-156)",
    key: "intimationUndertaking156",
  },
  {
    label:
      "Intimation Letter (for permanent/temporary government employee) (Advt-156)",
    key: "intimationLetter156",
  },
  { label: "Declaration to CCA (Advt-156)", key: "ccaDeclaration156" },
  { label: "NET Declaration", key: "netDeclaration" },
  {
    label: "Declaration for Final Year Candidates",
    key: "finalYearDeclaration",
  },
  {
    label: "Central Government Civilian Employee",
    key: "centralGovtDeclaration",
  },
];

function PdfViewerPage() {
  const navigate = useNavigate();
  const { pdfKey } = useParams();

  const currentItem = useMemo(
    () => formatItems.find((item) => item.key === pdfKey),
    [pdfKey]
  );

  const pdfData = pdfMap[pdfKey];
  const selectedContent = certificateContent[pdfKey];

  if (!pdfData && !selectedContent) {
    return (
      <div className="min-h-screen bg-gray-100 transition-colors dark:bg-gray-900">
        <Header />

        <main className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">
          <Card>
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
              Document not found
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

  const backendBaseUrl = "http://localhost:5000";
  const proxiedPdfUrl = pdfData
    ? `${backendBaseUrl}/api/pdf-proxy?url=${encodeURIComponent(pdfData.url)}`
    : null;

  return (
    <div className="min-h-screen bg-gray-100 transition-colors dark:bg-gray-900">
      <Header />

      <section className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-[1450px] px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wider text-blue-700 dark:text-blue-400">
            Document Viewer
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            {currentItem?.label || pdfData?.title || "Certificate / Declaration"}
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
            Review the selected certificate or declaration format below.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1450px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <section className="xl:col-span-9">
            <Card className="overflow-hidden p-0">
              <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900/50">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {currentItem?.label || pdfData?.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Content view
                  </p>
                </div>

                <Button variant="outline" onClick={() => navigate(-1)}>
                  ← Back
                </Button>
              </div>

              {pdfData && (
                <div className="flex items-center justify-end gap-3 border-b border-gray-200 bg-white px-6 py-3 dark:border-gray-700 dark:bg-gray-800">
                  <a
                    href={proxiedPdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-blue-700 hover:underline dark:text-blue-400"
                  >
                    Open PDF in new tab
                  </a>
                  <a
                    href={pdfData.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-blue-700 hover:underline dark:text-blue-400"
                  >
                    Open original PDF
                  </a>
                </div>
              )}

              <div className="bg-gray-100 p-6 dark:bg-gray-800/40">
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  {selectedContent ? (
                    selectedContent.content
                  ) : (
                    <div className="p-10">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {currentItem?.label || "Content not available"}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                        Formatted page content has not been added yet for this
                        document.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </section>

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
                    {currentItem?.label || pdfData?.title || "Not found"}
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