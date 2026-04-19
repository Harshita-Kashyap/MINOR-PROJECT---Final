import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DropdownMenu from "./DropdownMenu";
import "../styles/dropdown.css";

export default function LandingNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const { t } = useTranslation();

  const navItems = [
    { label: t("home"), type: "link", path: "/?notice=open" },
    { label: t("navAboutRac"), type: "dropdown", key: "about" },
    { label: t("navProgrammes"), type: "dropdown", key: "programmes" },
    { label: t("navCareer"), type: "dropdown", key: "career" },
    { label: t("drds"), type: "link", path: "/drds" },
    { label: t("faqs"), type: "link", path: "/faqs" },
    { label: t("grahpatrika"), type: "link", path: "/grahpatrika" },
  ];

  const handleItemClick = (item) => {
    if (item.type === "link") {
      setActiveMenu(null);

      if (item.path === "/?notice=open") {
        navigate("/?notice=open");
        return;
      }

      navigate(item.path);
      return;
    }

    setActiveMenu((prev) => (prev === item.key ? null : item.key));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setActiveMenu(null);
  }, [location.pathname, location.search]);

  return (
    <div ref={navRef} className="navbar-wrapper">
      <nav className="rac-navbar">
        <div className="rac-navbar-inner">
          {navItems.map((item) => {
            const isOpen = activeMenu === item.key;

            return (
              <button
                key={item.label}
                type="button"
                className={`rac-nav-item ${isOpen ? "active" : ""}`}
                onClick={() => handleItemClick(item)}
              >
                <span>{item.label}</span>

                {item.type === "dropdown" && (
                  <span className={`rac-nav-arrow ${isOpen ? "open" : ""}`}>
                    ▾
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {activeMenu && (
        <DropdownMenu
          type={activeMenu}
          onClose={() => setActiveMenu(null)}
        />
      )}
    </div>
  );
}