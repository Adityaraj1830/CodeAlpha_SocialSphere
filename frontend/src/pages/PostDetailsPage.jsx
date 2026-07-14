import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../components/layout/MainLayout";
import postService from "../services/postService";
import PostCard from "../components/post/PostCard";

const PostDetailsPage = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    try {
      const data = await postService.getPost(id);
      setPost(data.post);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load post"
      );
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <MainLayout>
        <h2>Loading...</h2>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PostCard post={post} />
    </MainLayout>
  );
};

export default PostDetailsPage;