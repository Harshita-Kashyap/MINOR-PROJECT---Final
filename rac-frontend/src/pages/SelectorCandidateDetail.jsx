import { useParams, useNavigate } from "react-router-dom";

const candidates = [
  {
    id: 1,
    name: "Rahul",
    profile: "Mechanical Engineer",
    qualification: "B.Tech",
    gate: 720,
    tech: 80,
    personality: 75,
  },
];

export default function SelectorCandidateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const c = candidates.find((x) => x.id === Number(id));

  return (
    <div>
      <h2>Candidate Detail</h2>

      <p>Name: {c.name}</p>
      <p>Profile: {c.profile}</p>
      <p>Qualification: {c.qualification}</p>
      <p>GATE Score: {c.gate}</p>
      <p>Technical: {c.tech}</p>
      <p>Personality: {c.personality}</p>

      <button onClick={() => navigate(`/selector/evaluation/${c.id}`)}>
        Evaluate
      </button>
    </div>
  );
}