import SelectorRibbon from "../components/SelectorRibbon";
import { useNavigate } from "react-router-dom";

export default function SelectorDashboard() {
  const navigate = useNavigate();

  return (
    <div>

      {/* ✅ HEADER already from your Landing (reuse if in layout) */}

      {/* 🔥 RIBBON */}
      <SelectorRibbon />

      {/* MAIN */}
      <div style={{ display: "flex", padding: "20px", gap: "20px" }}>

        {/* LEFT */}
        <div style={{ width: "22%" }}>
          <div style={card}>
            <h4>Assigned Candidates</h4>
            <h2>12</h2>
          </div>

          <div style={card}>
            <input placeholder="Search..." style={input} />
          </div>

          <div style={card}>
            <h4>Quick Actions</h4>
            <button onClick={() => navigate("/selector/candidates")}>
              View Candidates
            </button>
          </div>
        </div>

        {/* CENTER */}
        <div style={{ width: "55%" }}>
          <div style={banner}>
            <h2>Selector Panel</h2>
            <p>Evaluate & shortlist candidates</p>
            <button onClick={() => navigate("/selector/candidates")}>
              Start Evaluation
            </button>
          </div>

          <h3>Pending Evaluations</h3>

          {[1, 2].map((id) => (
            <div key={id} style={card}>
              <h4>Rahul Sharma</h4>
              <p>Scientist B</p>
              <button onClick={() => navigate(`/selector/candidate/${id}`)}>
                Evaluate
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div style={{ width: "23%" }}>
          <div style={card}>
            <h4>Latest Updates</h4>
            <p>New candidates assigned</p>
            <p>Deadline approaching</p>
          </div>

          <div style={card}>
            <h4>Analytics</h4>
            <button onClick={() => navigate("/selector/analytics")}>
              View Analytics
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// 🎨 Styles
const card = {
  background: "#fff",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

const banner = {
  background: "linear-gradient(to right, #1d4ed8, #2563eb)",
  color: "#fff",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px"
};

const input = {
  width: "100%",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};