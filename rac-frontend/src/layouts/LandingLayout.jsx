import Header from "../components/landing/Header";
import LandingNavbar from "../components/landing/LandingNavbar";
import LeftPanel from "../components/landing/LeftPanel";
import CenterPanel from "../components/landing/CenterPanel";
import RightPanel from "../components/landing/RightPanel";

export default function LandingLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* HEADER */}
      <Header />

      {/* NAVBAR */}
      <LandingNavbar />

      {/* CUSTOM PAGE CONTENT */}
      {children ? (
        <main className="max-w-[98%] mx-auto px-4 md:px-6 py-6">{children}</main>
      ) : (
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <aside className="lg:col-span-3">
              <LeftPanel />
            </aside>

            <section className="lg:col-span-6">
              <CenterPanel />
            </section>

            <aside className="lg:col-span-3">
              <RightPanel />
            </aside>
          </div>
        </main>
      )}
    </div>
  );
}