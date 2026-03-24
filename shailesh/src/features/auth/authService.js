import axios from "@/lib/axios";

export const login = async (data) => {
  const res = await axios.post("/auth/login", data);
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify({ email: res.data.email, _id: res.data._id }));
  }
  return res.data;
};

export const register = async (data) => {
  const res = await axios.post("/auth/register", data);
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify({ email: res.data.email, _id: res.data._id }));
  }
  return res.data;
};

export const sendOTP = async (email) => {
  const res = await axios.post("/auth/send-otp", { email });
  return res.data;
};

export const verifyOTP = async (data) => {
  const res = await axios.post("/auth/verify-otp", data);
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify({ email: data.email, _id: res.data._id }));
  }
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.reload();
};