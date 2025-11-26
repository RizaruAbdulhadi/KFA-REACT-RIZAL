import api from "./api";

export const customerService = {
  getAllCustomer: async (credentials) => {
    try {
      let response = await api.get("/customer", credentials);
      return response.data;
    } catch (error) {
      console.error("Data customer failed", error.response?.data);
      throw error;
    }
  },
};
