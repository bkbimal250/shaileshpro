import axios from "@/lib/axios";

export const getExperiences = async () => {
  const res = await axios.get("/experiences");
  return res.data.data;
};

export const createExperience = async (data) => {
  const res = await axios.post("/experiences", data);
  return res.data.data;
};

export const deleteExperience = async (id) => {
  const res = await axios.delete(`/experiences/${id}`);
  return res.data;
};
export const updateExperience = async (id, data) => {
  const res = await axios.put(`/experiences/${id}`, data);
  return res.data.data;
};
