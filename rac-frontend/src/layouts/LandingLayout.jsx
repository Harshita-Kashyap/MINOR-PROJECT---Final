import Header from "../features/landing/components/Header";
import LandingNavbar from "../features/landing/components/LandingNavbar";
import OfficialFooter from "../features/landing/components/OfficialFooter";
import PanelCard from "../features/landing/components/PanelCard";

import LeftPanel from "../features/landing/components/sections/LeftPanel";
import CenterPanel from "../features/landing/components/sections/CenterPanel";
import RightPanel from "../features/landing/components/sections/RightPanel";

export default function LandingLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 text-gray-900 transition-colors duration-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 dark:text-gray-100">
      <Header />
      <LandingNavbar />

      <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        {children ? (
          <PanelCard className="p-4 sm:p-6">{children}</PanelCard>
        ) : (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            <aside className="xl:col-span-3">
              <PanelCard>
                <LeftPanel />
              </PanelCard>
            </aside>

            <section className="xl:col-span-6">
              <PanelCard>
                <CenterPanel />
              </PanelCard>
            </section>

            <aside className="xl:col-span-3">
              <PanelCard>
                <RightPanel />
              </PanelCard>
            </aside>
          </div>
        )}
      </main>

      <OfficialFooter />
    </div>
  );
}