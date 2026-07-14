import api from "./api";

const authService = {
  register: async (userData) => {
    const { data } = await api.post("/auth/register", userData);
    return data;
  },

  login: async (userData) => {
    const { data } = await api.post("/auth/login", userData);
    return data;
  },

  getProfile: async (token) => {
    const { data } = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
};

export default authService;