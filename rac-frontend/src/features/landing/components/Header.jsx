import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../../../shared/components/ui/Button";
import ThemeToggle from "../../../shared/components/navigation/ThemeToggle";
import GoogleTranslate from "../../../shared/components/navigation/GoogleTranslate";
import ashok from "../../../assets/images/ashok.png";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const pathname = location.pathname;

  const user = useMemo(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, [pathname]);

  const isAuthPage = pathname === "/login" || pathname === "/register";

  const isDashboardPage =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/applicant") ||
    pathname.startsWith("/selector");

  const isPublicPage = !isAuthPage && !isDashboardPage;

  const handleLogin = () => navigate("/login");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const roleLabel = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "";

  return (
    <header className="border-b border-gray-200 bg-white px-4 py-4 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <img
            src="https://rac.gov.in/images/rac_logo_2025_sm.png"
            alt="RAC Logo"
            className="h-20 w-auto shrink-0 object-contain transition-transform duration-300 hover:scale-[1.02] sm:h-24"
          />

          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold leading-tight text-gray-900 dark:text-white sm:text-xl">
              {t("headerTitle")}
            </h1>

            <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-200">
              {t("headerLine1")}
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t("headerLine2")}
            </p>

            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-blue-700 dark:text-blue-400">
              {t("headerIso")}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-between gap-4 lg:justify-end">
          <div className="flex flex-col items-end gap-2">
            {/* Login / Logout */}
            <div>
              {isPublicPage && (
                <Button size="sm" onClick={handleLogin}>
                  {t("login")}
                </Button>
              )}

              {isDashboardPage && user && (
                <div className="flex items-center gap-2">
                  <span className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 transition-colors duration-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200">
                    {roleLabel}
                  </span>

                  <Button size="sm" variant="outline" onClick={handleLogout}>
                    {t("logout")}
                  </Button>
                </div>
              )}
            </div>

            {/* Toggles */}
            <div className="flex flex-wrap items-center justify-end gap-2 rounded-xl border border-gray-200 bg-gray-50 px-2 py-1 transition-all duration-300 dark:border-gray-700 dark:bg-gray-900">
              {isPublicPage && (
                <div className="flex items-center overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600">
                  <button
                    type="button"
                    onClick={() => changeLanguage("en")}
                    className={`px-3 py-1 text-xs font-medium transition ${
                      i18n.language === "en"
                        ? "bg-blue-700 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    EN
                  </button>

                  <button
                    type="button"
                    onClick={() => changeLanguage("hi")}
                    className={`px-3 py-1 text-xs font-medium transition ${
                      i18n.language === "hi"
                        ? "bg-blue-700 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    हिं
                  </button>
                </div>
              )}

              {isDashboardPage && <GoogleTranslate />}

              <ThemeToggle />
            </div>
          </div>

          {/* National Emblem */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-2 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/60">
            <img
              src={ashok}
              alt="National Emblem"
              className="h-16 w-auto object-contain sm:h-20 md:h-24"
            />
          </div>
        </div>
      </div>
    </header>
  );
}