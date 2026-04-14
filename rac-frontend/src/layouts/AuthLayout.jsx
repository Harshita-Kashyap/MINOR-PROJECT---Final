import { Link } from "react-router-dom";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white text-gray-900 dark:bg-gray-950 dark:text-white transition-colors">
      {/* LEFT PANEL */}
      <div className="hidden md:flex flex-col justify-center bg-blue-900 text-white p-12 dark:bg-blue-950">
        <div className="flex items-center gap-3 mb-6">
          <img
            src="https://rac.gov.in/images/rac_logo_2025_sm.png"
            alt="RAC Logo"
            className="w-12 h-12 object-contain bg-white rounded-full p-1"
          />
          <h1 className="text-xl font-semibold">RAC-DRDO</h1>
        </div>

        <h2 className="text-lg font-semibold">
          Recruitment &amp; Assessment Centre
        </h2>

        <p className="text-sm mt-2 opacity-80">
          Ministry of Defence, Government of India
        </p>

        <div className="mt-10">
          <Link
            to="/certificate-formats"
            className="text-sm underline cursor-pointer hover:opacity-90"
          >
            Certificates &amp; Declaration Formats
          </Link>
        </div>

        <p className="text-xs mt-auto opacity-60">© 2026 Govt. of India</p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center bg-gray-100 p-4 dark:bg-gray-900">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;