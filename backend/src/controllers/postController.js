import Post from "../models/Post.js";

// Create Post
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

// Get All Posts
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", "name username avatar")
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

// Get Single Post
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name username avatar")
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

// Delete Own Post
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