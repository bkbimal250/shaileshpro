import axios from "@/lib/axios";

export const getAbout = async () => {
  const res = await axios.get("/about");
  return res.data.data;
};

export const updateAbout = async (data) => {
  const res = await axios.post("/about", data);
  return res.data.data;
};
