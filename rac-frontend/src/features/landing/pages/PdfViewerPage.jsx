import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import certificateContent from "../../../data/certificateContent";

/* ---------- PDF MAP (from your old file) ---------- */
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
};

/* ---------- LABEL LIST (from new file) ---------- */
const formatItems = [
  { label: "Bonafide Certificate", key: "bonafideCertificate" },
  { label: "Intimation to CCA Format", key: "intimationLetter" },
  { label: "OBC Certificate Proforma", key: "obcProof" },
  { label: "OBC Declaration", key: "obcDeclaration" },
  { label: "EWS Certificate Proforma", key: "ewsCertificate" },
  { label: "EWS Declaration", key: "ewsDeclaration" },
  { label: "SC/ST Proforma", key: "scstProof" },
  { label: "PWD Certificate Proforma", key: "pwdProof" },
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

  const proxiedPdfUrl = pdfData
    ? `http://localhost:5000/api/pdf-proxy?url=${encodeURIComponent(
        pdfData.url
      )}`
    : null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="mx-auto max-w-[1450px] px-4 py-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">

          {/* LEFT SIDE (PDF + CONTENT) */}
          <section className="xl:col-span-9">
            <Card className="overflow-hidden p-0">

              {/* HEADER */}
              <div className="flex items-center justify-between border-b px-6 py-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {currentItem?.label || pdfData?.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    PDF Preview + Content View
                  </p>
                </div>

                <Button variant="outline" onClick={() => navigate(-1)}>
                  ← Back
                </Button>
              </div>

              {/* PDF VIEWER */}
              {pdfData && (
                <div className="h-[70vh] w-full bg-gray-100">
                  <iframe
                    src={`${proxiedPdfUrl}#toolbar=0`}
                    title={pdfData.title}
                    className="h-full w-full"
                  />
                </div>
              )}

              {/* CONTENT VIEW */}
              <div className="p-6">
                <div className="rounded-xl border bg-white p-4 shadow-sm">
                  {selectedContent ? (
                    selectedContent.content
                  ) : (
                    <p className="text-gray-500">
                      No formatted content available.
                    </p>
                  )}
                </div>
              </div>

            </Card>
          </section>

          {/* RIGHT SIDE */}
          <aside className="xl:col-span-3">
            <Card>
              <h3 className="text-lg font-semibold">Document Info</h3>
              <p className="mt-2 text-sm text-gray-600">
                {currentItem?.label || pdfData?.title}
              </p>
            </Card>
          </aside>

        </div>
      </main>
    </div>
  );
}

export default PdfViewerPage;