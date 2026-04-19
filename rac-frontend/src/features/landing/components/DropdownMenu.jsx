import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/dropdown.css";

export default function DropdownMenu({ type, onClose }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const go = (path) => {
    navigate(path);
    onClose();
  };

  const content = {
    about: [
      {
        title: t("dropdownAboutTitle"),
        items: [
          { name: t("dropdownChairman"), path: "/chairman" },
          { name: t("dropdownDirector"), path: "/director" },
          { name: t("dropdownApproach"), path: "/approach" },
          { name: t("dropdownAboutUs"), path: "/about" },
        ],
      },
    ],
    programmes: [
      {
        title: t("dropdownProgrammesTitle"),
        items: [
          { name: t("dropdownRecruitment"), path: "/programmes/recruitment" },
          { name: t("dropdownAssessment"), path: "/programmes/assessment" },
          { name: t("dropdownSelectionPg"), path: "/programmes/selection-pg" },
          { name: t("dropdownLdce"), path: "/programmes/ldce" },
        ],
      },
    ],
    career: [
      {
        title: t("dropdownCareerTitle"),
        items: [
          { name: t("dropdownLateral"), path: "/lateral" },
          { name: t("dropdownDirectRecruitment"), path: "/direct-recruitment" },
        ],
      },
    ],
  };

  if (!content[type]) return null;

  return (
    <div className="dropdown-overlay" onClick={onClose}>
      <div className="dropdown-panel" onClick={(e) => e.stopPropagation()}>
        <div className="dropdown-columns">
          {content[type].map((col, i) => (
            <div key={i} className="dropdown-column">
              <h4>{col.title}</h4>

              <div className="dropdown-items">
                {col.items.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="dropdown-link"
                    onClick={() => go(item.path)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}