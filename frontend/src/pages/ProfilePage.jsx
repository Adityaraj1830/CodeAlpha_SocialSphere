import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../components/layout/MainLayout";
import userService from "../services/userService";
import postService from "../services/postService";
import PostCard from "../components/post/PostCard";

import "../styles/profile.css";

const ProfilePage = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const userData = await userService.getUser(id);
      setUser(userData.user);

      const postData = await postService.getPosts();

      const filteredPosts = postData.posts.filter(
        (post) => post.author._id === id
      );

      setPosts(filteredPosts);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const handleFollow = async () => {
    try {
      const data = await userService.followUser(id);

      toast.success(data.message);

      fetchProfile();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Follow failed"
      );
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <h2>Loading...</h2>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <div className="profile-card">

        <div className="profile-header">

          <img
            src={user.avatar.url}
            alt={user.name}
            className="profile-avatar"
          />

          <div>

            <h1>{user.name}</h1>

            <h3>@{user.username}</h3>

            <p>{user.bio}</p>

            <div className="profile-stats">

              <span>
                Followers: {user.followers.length}
              </span>

              <span>
                Following: {user.following.length}
              </span>

              <span>
                Posts: {posts.length}
              </span>

            </div>

            <button
              className="follow-btn"
              onClick={handleFollow}
            >
              Follow / Unfollow
            </button>

          </div>

        </div>

      </div>

      <div className="profile-posts">

        <h2>Posts</h2>

        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
            />
          ))
        )}

      </div>

    </MainLayout>
  );
};

export default ProfilePage;