import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";

export default function Header() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 px-6 py-3 shadow-sm">

      <div>
        <h1 className="font-semibold text-lg dark:text-white">
          Recruitment & Assessment Centre (RAC)
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          DRDO, Government of India
        </p>
      </div>

      <div className="flex items-center gap-4 text-sm">

        {/* Language */}
        <div className="flex gap-2">
          <button onClick={() => i18n.changeLanguage("en")} className="hover:underline dark:text-white">EN</button>
          <button onClick={() => i18n.changeLanguage("hi")} className="hover:underline dark:text-white">हिंदी</button>
        </div>

        {/* Theme */}
        <button onClick={() => setDark(!dark)} className="dark:text-white">
          {dark ? "☀️" : "🌙"}
        </button>

        <Button onClick={() => navigate("/login")}>
          {t("login")}
        </Button>

      </div>
    </div>
  );
}