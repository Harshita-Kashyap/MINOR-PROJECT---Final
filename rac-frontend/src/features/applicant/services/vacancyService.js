// ✅ NAMED EXPORTS (IMPORTANT)

export const getVacancies = async () => {
  const res = await fetch("http://localhost:5000/api/vacancies", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.vacancies;
};


export const getVacancyById = async (id) => {
  const res = await fetch(`http://localhost:5000/api/vacancies/${id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.vacancy;
};