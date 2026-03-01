import axios from "axios";

const API_URL = "http://localhost:5000/api/profile"; // backend profile routes

class ProfileService {
  // 🔹 Get profile of logged-in user
  async getProfile() {
    try {
      const res = await axios.get(`${API_URL}`, { withCredentials: true });
      return res.data;
    } catch (error) {
      console.error("Error getting profile:", error.response?.data || error.message);
      throw error;
    }
  }

  // 🔹 Create / Update profile (Upsert)
  async upsertProfile(profileData) {
    try {
      const res = await axios.post(`${API_URL}`, profileData, { withCredentials: true });
      return res.data;
    } catch (error) {
      console.error("Error upserting profile:", error.response?.data || error.message);
      throw error;
    }
  }
}

export default new ProfileService();