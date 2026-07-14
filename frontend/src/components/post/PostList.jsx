import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import postService from "../../services/postService";
import PostCard from "./PostCard";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const data = await postService.getPosts();
      setPosts(data.posts);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load posts"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <h2>Loading posts...</h2>;
  }

  if (posts.length === 0) {
    return <h2>No posts available.</h2>;
  }

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </>
  );
};

export default PostList;