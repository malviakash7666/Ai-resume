import API from "../api/api";

export const register = async (data: { name: string; email: string; password: string }) => {
  // Backend registration ke saath cookie bhi set kar raha hai
  return API.post("/register", data);
};

export const login = async (data: { email: string; password: string }) => {
  // Credentials (cookies) automatically API instance handle karega
  const res = await API.post("/login", data);
  return res;
};

// 🔍 Persistence ke liye naya function
export const getMe = async () => {
  // Ye function check karega ki browser mein valid session cookie hai ya nahi
  return API.get("/me");
};

export const logout = async () => {
  try {
    await API.post("/logout");
  } finally {
    // Frontend state clear karne ke liye logic yahan handling ke baad Dashboard/Context mein hoga
    console.log("Logged out successfully");
  }
};