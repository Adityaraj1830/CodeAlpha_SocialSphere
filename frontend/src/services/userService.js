import api from "./api";

const getToken = () => localStorage.getItem("socialsphereToken");

const userService = {
  // Get all users
  getUsers: async () => {
    const { data } = await api.get("/users");
    return data;
  },

  // Get single user
  getUser: async (id) => {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },

  // Follow / Unfollow
  followUser: async (id) => {
    const { data } = await api.put(
      `/users/${id}/follow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return data;
  },

  // Logged in user profile
  getMyProfile: async () => {
    const { data } = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return data;
  },
};

export default userService;