import api from "./api";

export const transaksiService = {
  getAllTransaksi: async (param = {}) => {
    try {
      let response = await api.get("/transaksi", param);
      return response.data;
    } catch (error) {
      console.error("Data Activity Failed", error.response?.data);
      throw error;
    }
  },
};
