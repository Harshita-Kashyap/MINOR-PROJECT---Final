import { NavLink } from "react-router-dom";

export default function SelectorRibbon() {
  return (
    <div style={ribbonStyle}>
      <NavLink to="/selector" style={linkStyle}>Dashboard</NavLink>
      <NavLink to="/selector/candidates" style={linkStyle}>Candidates</NavLink>
      <NavLink to="/selector/analytics" style={linkStyle}>Analytics</NavLink>
    </div>
  );
}

const ribbonStyle = {
  display: "flex",
  gap: "30px",
  padding: "12px 20px",
  background: "#0f172a",
  color: "#fff",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500",
};