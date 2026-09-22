import { axiosInstance } from "./axios.js";
export const signup = async (signupData) => {
  const respond = await axiosInstance.post("/auth/signup", signupData);
  return respond.data;
};

export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};
