import { useTranslation } from "react-i18next";

export default function LandingNavbar() {
  const { t } = useTranslation();

  const navItems = [
    t("home"),
    t("vacancies"),
    t("notices"),
    t("about"),
    t("help"),
  ];

  return (
    <div className="bg-gray-900 text-white px-6 py-2 flex gap-6 text-sm font-medium">
      {navItems.map((item) => (
        <span key={item} className="cursor-pointer hover:text-blue-400 transition">
          {item}
        </span>
      ))}
    </div>
  );
}