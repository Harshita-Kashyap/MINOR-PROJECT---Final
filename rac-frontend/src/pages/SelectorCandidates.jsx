import { useNavigate } from "react-router-dom";

const candidates = [
  { id: 1, name: "Rahul", vacancy: "Scientist B", status: "Pending" },
  { id: 2, name: "Anjali", vacancy: "Scientist C", status: "Evaluated" },
];

export default function SelectorCandidates() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Candidate List</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Vacancy</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {candidates.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.vacancy}</td>
              <td>{c.status}</td>
              <td>
                <button onClick={() => navigate(`/selector/candidate/${c.id}`)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}