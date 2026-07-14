import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import postService from "../../services/postService";

import "../../styles/post.css";

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [comments, setComments] = useState(post.comments?.length || 0);
  const [text, setText] = useState("");

  const handleLike = async () => {
    try {
      const data = await postService.toggleLike(post._id);

      setLikes(data.totalLikes);

      toast.success(data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Like failed"
      );
    }
  };

  const handleComment = async () => {
    if (!text.trim()) {
      return toast.error("Enter a comment");
    }

    try {
      const data = await postService.addComment(
        post._id,
        text
      );

      setComments(data.totalComments);

      setText("");

      toast.success(data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Comment failed"
      );
    }
  };

  return (
    <div className="post-card">

      <div className="post-header">

        <img
          src={post.author.avatar.url}
          alt={post.author.name}
          className="post-avatar"
        />

        <div>

          <Link to={`/profile/${post.author._id}`}>
            <h3>{post.author.name}</h3>
          </Link>

          <small>@{post.author.username}</small>

        </div>

      </div>

      <p className="post-caption">
        {post.caption}
      </p>

      {post.image?.url && (
        <img
          src={post.image.url}
          alt="Post"
          className="post-image"
        />
      )}

      <div className="post-footer">

        <button onClick={handleLike}>
          ❤️ {likes}
        </button>

        <Link to={`/posts/${post._id}`}>
          💬 {comments}
        </Link>

      </div>

      <div className="comment-box">

        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
        />

        <button onClick={handleComment}>
          Post
        </button>

      </div>

    </div>
  );
};

export default PostCard;