import axios from "@/lib/axios";

export const getStats = async () => {
  const res = await axios.get("/dashboard/stats");
  return res.data.data;
};
