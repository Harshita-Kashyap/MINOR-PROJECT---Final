import Header from "../components/landing/Header";
import LandingNavbar from "../components/landing/LandingNavbar";
import LeftPanel from "../components/landing/LeftPanel";
import CenterPanel from "../components/landing/CenterPanel";
import RightPanel from "../components/landing/RightPanel";

export default function LandingLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 text-gray-900 transition-colors duration-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 dark:text-gray-100">
      {/* HEADER */}
      <Header />

      {/* NAVBAR */}
      <LandingNavbar />

      {/* PAGE CONTENT */}
      {children ? (
        <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/60 sm:p-6">
            {children}
          </div>
        </main>
      ) : (
        <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            {/* LEFT PANEL */}
            <aside className="xl:col-span-3">
              <div className="xl:sticky xl:top-6">
                <LeftPanel />
              </div>
            </aside>

            {/* CENTER PANEL */}
            <section className="xl:col-span-6">
              <CenterPanel />
            </section>

            {/* RIGHT PANEL */}
            <aside className="xl:col-span-3">
              <div className="xl:sticky xl:top-6">
                <RightPanel />
              </div>
            </aside>
          </div>
        </main>
      )}
    </div>
  );
}