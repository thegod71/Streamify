import { axiosInstance } from "./axios.js";
export const signup = async (signupData) => {
  console.log("signupData in api.js:", signupData); // Log the signupData for debugging
  const respond = await axiosInstance.post("/auth/signup", signupData);
  return respond.data;
};

export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const completeOnboarding = async (userData) => {
  //console.log("userData in completeOnboarding:", userData); // Log the userData for debugging
  const res = await axiosInstance.post("/auth/onboarding", userData);
  return res.data;
};


export const login = async (loginData) => {
  const res = await axiosInstance.post("/auth/login", loginData);
  return res.data;
};
