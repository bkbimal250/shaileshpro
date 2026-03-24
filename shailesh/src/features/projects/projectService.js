import axios from "@/lib/axios";

export const getProjects = async () => {
  const res = await axios.get("/projects");
  return res.data.data;
};

export const getProjectById = async (id) => {
  const res = await axios.get(`/projects/${id}`);
  return res.data.data;
};

export const createProject = async (data) => {
  const res = await axios.post("/projects", data);
  return res.data.data;
};

export const updateProject = async (id, data) => {
  const res = await axios.put(`/projects/${id}`, data);
  return res.data.data;
};

export const deleteProject = async (id) => {
  const res = await axios.delete(`/projects/${id}`);
  return res.data;
};