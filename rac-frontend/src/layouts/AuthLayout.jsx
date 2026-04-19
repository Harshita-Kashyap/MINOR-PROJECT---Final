import { Link } from "react-router-dom";

function AuthLayout({ children }) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-white text-gray-900 transition-colors dark:bg-gray-950 dark:text-white md:grid-cols-2">
      
      {/* LEFT PANEL */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 px-12 py-14 text-white md:flex md:flex-col md:justify-center">
        
        {/* Background accents */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 top-12 h-56 w-56 animate-pulse rounded-full bg-blue-400 blur-3xl" />
          <div className="absolute bottom-10 right-0 h-72 w-72 animate-pulse rounded-full bg-cyan-300 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-xl animate-[fadeInUp_0.8s_ease-out]">
          
          {/* LOGO + TITLE */}
          <div className="mb-10 flex items-center gap-4">
            <div className="rounded-full bg-white p-2 shadow-lg">
              <img
                src="https://rac.gov.in/images/rac_logo_2025_sm.png"
                alt="RAC Logo"
                className="h-14 w-14 object-contain"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-wide">RAC-DRDO</h1>
              
              {/* NEW SUBLINE (your requirement) */}
              <p className="text-sm text-blue-100/90">
                Recruitment &amp; Assessment Portal
              </p>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold leading-tight lg:text-4xl">
              Recruitment &amp; Assessment Centre
            </h2>

            <p className="text-lg font-medium leading-8 text-slate-100">
              Department of Defence Research &amp; Development
            </p>

            <p className="text-base leading-7 text-blue-100/90">
              Ministry of Defence, Government of India
            </p>

            <p className="max-w-lg text-base leading-8 text-slate-200/90">
              Access recruitment-related information, sign in securely, and
              continue your application process through a structured and
              user-friendly portal.
            </p>
          </div>

          {/* SUPPORT INFO (NEW ADDITION) */}
          <div className="mt-10 rounded-xl border border-white/15 bg-white/5 p-4 text-sm leading-6 text-blue-100/90">
            <p className="font-medium text-white">
              Registration Support
            </p>

            <p className="mt-1">
              For registration-related issues or corrections (Date of Birth,
              Mobile Number, Email, etc.), please contact:
            </p>

            <p className="mt-2 font-semibold text-blue-300 break-all">
              pro.recruitment@gov.in
            </p>
          </div>

          {/* LINK */}
          <div className="mt-8">
            <Link
              to="/certificate-formats"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-base font-medium text-white transition duration-300 hover:translate-x-1 hover:bg-white/15"
            >
              Certificates &amp; Declaration Formats
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* FOOTER */}
          <div className="mt-14 border-t border-white/15 pt-5">
            <p className="text-sm text-slate-300/80">
              © 2026 RAC-DRDO, Govt. of India. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center bg-gray-100 p-4 dark:bg-gray-900">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800">
          {children}
        </div>
      </div>

      {/* ANIMATION */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(18px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default AuthLayout;