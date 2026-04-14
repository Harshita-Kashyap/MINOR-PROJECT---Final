import { useState } from "react";
import { createVacancy } from "../services/vacancyService";
import { useNavigate } from "react-router-dom";

function CreateVacancy() {
  const [form, setForm] = useState({
    title: "",
    department: "",
    description: "",
    eligibility: "",
    deadline: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createVacancy(form);
    navigate("/admin/vacancies");
  };

  return (
    <div className="p-6 ml-64">
      <h2 className="text-2xl font-bold mb-4">Create Vacancy</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="title" placeholder="Title" onChange={handleChange} className="w-full p-2 border" />
        <input name="department" placeholder="Department" onChange={handleChange} className="w-full p-2 border" />

        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border" />

        <textarea name="eligibility" placeholder="Eligibility" onChange={handleChange} className="w-full p-2 border" />

        <input type="date" name="deadline" onChange={handleChange} className="w-full p-2 border" />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateVacancy;