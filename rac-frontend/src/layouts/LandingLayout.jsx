import Header from "../features/landing/components/Header";
import LandingNavbar from "../features/landing/components/LandingNavbar";
import LeftPanel from "../features/landing/components/sections/LeftPanel";
import CenterPanel from "../features/landing/components/sections/CenterPanel";
import RightPanel from "../features/landing/components/sections/RightPanel";

export default function LandingLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 text-gray-900 transition-colors duration-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 dark:text-gray-100">
      <Header />
      <LandingNavbar />

      {children ? (
        <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/60 sm:p-6">
            {children}
          </div>
        </main>
      ) : (
        <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            <aside className="xl:col-span-3">
              <div className="xl:sticky xl:top-6">
                <LeftPanel />
              </div>
            </aside>

            <section className="xl:col-span-6">
              <CenterPanel />
            </section>

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