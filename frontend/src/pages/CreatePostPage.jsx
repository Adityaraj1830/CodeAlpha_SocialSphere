import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../components/layout/MainLayout";
import postService from "../services/postService";

const CreatePostPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    caption: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await postService.createPost({
        caption: formData.caption,
        image: {
          public_id: "sample",
          url: formData.imageUrl,
        },
      });

      toast.success("Post created successfully");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create post"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="auth-container">
        <div className="auth-card">

          <h1>Create Post</h1>

          <form onSubmit={handleSubmit}>

            <textarea
              name="caption"
              placeholder="What's on your mind?"
              rows="5"
              value={formData.caption}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Posting..." : "Create Post"}
            </button>

          </form>

        </div>
      </div>
    </MainLayout>
  );
};

export default CreatePostPage;