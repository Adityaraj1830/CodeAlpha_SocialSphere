import Post from "../models/Post.js";

// =======================
// Create Post
// =======================
export const createPost = async (req, res, next) => {
  try {
    const { caption, image } = req.body;

    const post = await Post.create({
      caption,
      image,
      author: req.user._id,
    });

    const populatedPost = await Post.findById(post._id).populate(
      "author",
      "name username avatar"
    );

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: populatedPost,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// Get All Posts
// =======================
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", "name username avatar")
      .populate("comments.user", "name username avatar")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// Get Single Post
// =======================
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name username avatar")
      .populate("likes", "name username avatar")
      .populate("comments.user", "name username avatar");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// Like / Unlike Post
// =======================
export const toggleLikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === req.user._id.toString()
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );

      await post.save();

      return res.json({
        success: true,
        message: "Post unliked successfully",
        totalLikes: post.likes.length,
      });
    }

    post.likes.push(req.user._id);

    await post.save();

    res.json({
      success: true,
      message: "Post liked successfully",
      totalLikes: post.likes.length,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// Add Comment
// =======================
export const addComment = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    post.comments.push({
      user: req.user._id,
      text,
    });

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("author", "name username avatar")
      .populate("comments.user", "name username avatar");

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      totalComments: updatedPost.comments.length,
      post: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// Delete Own Comment
// =======================
export const deleteComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can delete only your own comment",
      });
    }

    comment.deleteOne();

    await post.save();

    res.json({
      success: true,
      message: "Comment deleted successfully",
      totalComments: post.comments.length,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// Delete Own Post
// =======================
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can delete only your own posts",
      });
    }

    await post.deleteOne();

    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};