@266404305571929 
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import ThemeToggle from "../common/ThemeToggle";

export default function Header() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const user = (() => {
  try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="flex flex-col gap-4 bg-white px-6 py-4 shadow-sm transition-colors dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between">
      
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Logo */}
        <img
          src="https://rac.gov.in/images/rac_logo_2025_sm.png"
          alt="RAC Logo"
          className="h-12 w-auto object-contain"
        />

        {/* Text */}
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recruitment &amp; Assessment Centre (RAC)
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            DRDO, Government of India
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        
        {/* Language Switcher */}
        <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-900">
          <button
            type="button"
            onClick={() => i18n.changeLanguage("en")}
            className={`rounded-md px-3 py-1 transition ${
              i18n.language === "en"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            EN
          </button>

          <button
            type="button"
            onClick={() => i18n.changeLanguage("hi")}
            className={`rounded-md px-3 py-1 transition ${
              i18n.language === "hi"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            हिंदी
          </button>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Auth Section */}
        {!user ? (
          <Button onClick={() => navigate("/login")}>
            {t("login")}
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-gray-100 px-3 py-2 text-sm capitalize text-gray-700 dark:bg-gray-700 dark:text-gray-200">
              {user.role}
            </span>
            <Button variant="outline" onClick={handleLogout}>
              {t("logout")}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}