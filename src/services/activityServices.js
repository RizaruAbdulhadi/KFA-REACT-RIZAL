import api from "./api";

export const activityService = {
  getAllActivity: async (param = {}) => {
    try {
      let response = await api.get("/activity-logs?page=1&limit=10", param);
      return response.data;
    } catch (error) {
      console.error("Data Activity Failed", error.response?.data);
      throw error;
    }
  },
};
