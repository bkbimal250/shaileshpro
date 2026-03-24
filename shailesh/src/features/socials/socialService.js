import axios from "@/lib/axios";

export const getSocials = async () => {
  const res = await axios.get("/socials");
  return res.data.data;
};

export const getSocialById = async (id) => {
  const res = await axios.get(`/socials/${id}`);
  return res.data.data;
};

export const createSocial = async (data) => {
  const res = await axios.post("/socials", data);
  return res.data.data;
};

export const updateSocial = async (id, data) => {
  const res = await axios.put(`/socials/${id}`, data);
  return res.data.data;
};

export const deleteSocial = async (id) => {
  const res = await axios.delete(`/socials/${id}`);
  return res.data;
};
