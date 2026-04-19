import { useNavigate } from "react-router-dom";
import "./dropdown.css";

export default function DropdownMenu({ type, onClose }) {
  const navigate = useNavigate();

  const go = (path) => {
    navigate(path);
    onClose();
  };

  const content = {
    about: [
      {
        title: "About RAC",
        items: [
          { name: "Chairman", path: "/chairman" },
          { name: "Director", path: "/director" },
          { name: "Our Approach", path: "/approach" },
          { name: "About Us", path: "/about" },
        ],
      },
    ],

    programmes: [
      {
        title: "Programmes",
        items: [
          { name: "Recruitment", path: "/programmes/recruitment" },
          { name: "Assessment", path: "/programmes/assessment" },
          { name: "Selection for PG", path: "/programmes/selection-pg" },
          { name: "LDCE", path: "/programmes/ldce" },
        ],
      },
    ],

    career: [
      {
        title: "Career Opportunity",
        items: [
          { name: "Lateral Entry", path: "/lateral" },
          { name: "Direct Recruitment", path: "/direct-recruitment" },
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