import api from "./api";

const getToken = () => localStorage.getItem("socialsphereToken");

const postService = {
  getPosts: async () => {
    const { data } = await api.get("/posts");
    return data;
  },

  getPost: async (id) => {
    const { data } = await api.get(`/posts/${id}`);
    return data;
  },

  createPost: async (postData) => {
    const { data } = await api.post("/posts", postData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return data;
  },

  toggleLike: async (id) => {
    const { data } = await api.put(
      `/posts/${id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return data;
  },

  addComment: async (id, text) => {
    const { data } = await api.post(
      `/posts/${id}/comment`,
      { text },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return data;
  },

  deletePost: async (id) => {
    const { data } = await api.delete(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return data;
  },
};

export default postService;