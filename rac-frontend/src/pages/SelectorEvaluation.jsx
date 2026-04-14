import SelectorRibbon from "../components/SelectorRibbon";
import { useState } from "react";

export default function SelectorEvaluation() {
  const [remarks, setRemarks] = useState("");

  return (
    <div>
      <h2>Evaluation</h2>

      <p>GATE: 720</p>
      <p>Technical: 80</p>
      <p>Personality: 75</p>

      <textarea
        placeholder="Add remarks..."
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />

      <br />
      <button onClick={() => alert("Saved")}>Save</button>
    </div>
  );
}