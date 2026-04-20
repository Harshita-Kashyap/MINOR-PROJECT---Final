import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

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

function CertificateFormats() {
  const navigate = useNavigate();

  const handleOpen = (key) => {
    navigate(`/certificate-formats/${key}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 transition-colors dark:bg-gray-900">
      <Header />

      {/* PAGE TITLE BAND */}
      <section className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-[1450px] px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wider text-blue-700 dark:text-blue-400">
            Downloads
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Certificate / Declaration Formats
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
            Access certificate and declaration formats required for recruitment,
            verification, category claims, and related submission processes.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-[1450px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* LEFT MAIN LIST */}
          <section className="xl:col-span-8">
            <Card className="overflow-hidden p-0">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900/50">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Available Formats
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Select a format from the list below to continue.
                </p>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {formatItems.map((item, index) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleOpen(item.key)}
                    className="group flex w-full items-start gap-4 px-6 py-4 text-left transition hover:bg-blue-50 dark:hover:bg-gray-900"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white dark:bg-blue-500">
                      {index + 1}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-6 text-gray-800 transition group-hover:text-blue-700 dark:text-gray-200 dark:group-hover:text-blue-400 sm:text-[15px]">
                        {item.label}
                      </p>
                    </div>

                    <span className="shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-blue-600 dark:text-gray-500 dark:group-hover:text-blue-400">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          </section>

          {/* RIGHT SIDE */}
          <aside className="xl:col-span-4">
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Instructions
                </h3>

                <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
                  <p>
                    Candidates should carefully select the appropriate
                    certificate or declaration format applicable to their
                    category, employment status, or advertisement requirement.
                  </p>

                  <p>
                    Ensure that all information is complete, accurate, and
                    properly supported before submission wherever required.
                  </p>

                  <p>
                    Keep a copy of the selected format for future record and
                    verification during the recruitment process.
                  </p>
                </div>
              </Card>

              <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300">
                  Important Note
                </h3>

                <p className="mt-3 text-sm leading-7 text-blue-900/80 dark:text-blue-200/90">
                  Clicking an item from the list will open its dedicated page.
                  Please verify the selected format title carefully before
                  proceeding.
                </p>
              </Card>

              <div className="flex">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  ← Back
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default CertificateFormats;