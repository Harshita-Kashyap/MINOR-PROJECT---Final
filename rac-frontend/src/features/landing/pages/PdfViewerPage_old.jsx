import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/landing/Header";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import certificateContent from "../data/certificateContent";

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

  const selectedContent = certificateContent[pdfKey];

  return (
    <div className="min-h-screen bg-gray-100 transition-colors dark:bg-gray-900">
      <Header />

      <main className="mx-auto max-w-[1450px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <section className="xl:col-span-9">
            <Card className="overflow-hidden p-0">
              <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-5 dark:border-gray-700 dark:bg-gray-900/50">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {currentItem?.label || "Certificate / Declaration"}
                  </h1>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Displayed as page content
                  </p>
                </div>

                <Button variant="outline" onClick={() => navigate(-1)}>
                  ← Back
                </Button>
              </div>

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
                        This item is listed, but its formatted page content has
                        not been added yet.
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

                <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
                  <p>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Title:
                    </span>{" "}
                    {currentItem?.label || "Not found"}
                  </p>

                  <p>
                    This page displays the selected RAC certificate or
                    declaration content directly inside the page.
                  </p>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Instructions
                </h3>

                <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
                  <p>
                    Read the displayed format carefully before using it for any
                    official submission purpose.
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