import axios from "@/lib/axios";

export const getAnalytics = async () => {
  const res = await axios.get("/analytics");
  return res.data;
};