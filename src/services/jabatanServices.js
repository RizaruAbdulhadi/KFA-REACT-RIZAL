import api from "./api.js";

export const jabatanService = {
  getAllJabatan: async (param = {}) => {
    try {
      let response = await api.get("/jabatan", param);
      return response.data;
    } catch (error) {
      console.error("Data Jabatan failed", error.response?.data);
      throw error;
    }
  },
};
