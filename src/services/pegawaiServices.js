import api from "./api";

const pegawaiService = {
  // Get all users dengan pagination dan search
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/pegawai", { params });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Get user by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/pegawai/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Create new user
  create: async (userData) => {
    try {
      const response = await api.post("/pegawai", userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Update user
  update: async (id, userData) => {
    try {
      const response = await api.put(`/pegawai/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Delete user
  delete: async (id) => {
    try {
      const response = await api.delete(`/pegawai/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
};

export default pegawaiService;
