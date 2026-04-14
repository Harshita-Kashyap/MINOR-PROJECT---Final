import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateVacancy } from "../services/vacancyService";
import API from "../services/api";

function EditVacancy() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    department: "",
    description: "",
    eligibility: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const res = await API.get("/vacancies");
        const vacancy = res.data.find((v) => v.id == id);

        if (vacancy) {
          setForm({
            title: vacancy.title || "",
            department: vacancy.department || "",
            description: vacancy.description || "",
            eligibility: vacancy.eligibility || "",
            deadline: vacancy.deadline?.split("T")[0] || "",
          });
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVacancy();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateVacancy(id, form);
      alert("Updated successfully");
      navigate("/admin/vacancies");
    } catch (error) {
      alert("Update failed");
    }
  };

  if (loading) return <div className="p-6 ml-64">Loading...</div>;

  return (
    <div className="p-6 ml-64">
      <h2 className="text-2xl font-bold mb-4">Edit Vacancy</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <input
          name="department"
          value={form.department}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <textarea
          name="eligibility"
          value={form.eligibility}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditVacancy;