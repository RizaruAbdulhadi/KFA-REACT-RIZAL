import api from "./api.js";

export const unitKerjaService = {
  getAllUnitKerja: async (param = {}) => {
    try {
      let response = await api.get("./unit-kerja", param);
      return response.data;
    } catch (error) {
      console.error("Data Unit-Kerja failed", error.response?.data);
      throw error;
    }
  },
};
