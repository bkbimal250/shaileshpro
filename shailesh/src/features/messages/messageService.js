import axios from "@/lib/axios";

export const sendMessage = async (data) => {
  const res = await axios.post("/messages", data);
  return res.data;
};