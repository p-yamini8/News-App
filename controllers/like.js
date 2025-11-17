const  Like = require('../models/like');
const  Comment= require('../models/comment');
const  User = require('../models/user');
const { Op } = require('sequelize');
const Post = require('../models/post');


// // Get likes/dislikes count
exports.getLikes = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user ? req.user.id : null;
    const likes = await Like.count({ where: { postId, type: 'like' } });
    const dislikes = await Like.count({ where: { postId, type: 'dislike' } });

   let userReaction = null;
    if (userId) {
      const reaction = await Like.findOne({ where: { userId, postId } });
      if (reaction) userReaction = reaction.type; // 'like' or 'dislike'
    }

    return res.json({ likes, dislikes, userReaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching like/dislike counts' });
  }
};

// Add like or dislike
exports.addLikeDislike = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId, type } = req.body;

    // Check if user already liked/disliked
    const existing = await Like.findOne({ where: { userId, postId } });

    if (existing) {
      // Update type
      existing.type = type;
      await existing.save();
    } else {
      await Like.create({ userId, postId, type });
    }

    res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get comments for a post
exports.getComments = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.findAll({
      where: { postId },
      include: { model: User, attributes: ['name'], as: 'user' },
      order: [['createdAt', 'ASC']]
    });

    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add comment
exports.addComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId, comment } = req.body;

    await Comment.create({ userId, postId, comment });

    res.status(201).json({ message: 'Comment added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.likes= async (req, res) => {
  try {
    const likes = await Like.findAll({
      where: { userId: req.user.id, type: 'like' },
      include: [{ model: Post, as: 'post' }]

    });

    res.json({ likes: likes.map(l => l.post)});
  } catch (err) {
    res.status(500).json({ message: "Error fetching likes" });
  }
};
exports.unlikes= async (req, res) => {
  try {
    const unlikes = await Like.findAll({
      where: { userId: req.user.id, type: 'dislike' },
      include: [{ model: Post, as: 'post' }]

    });

    res.json({ unlikes: unlikes.map(u => u.post) });
  } catch (err) {
    res.status(500).json({ message: "Error fetching unlikes" });
  }
};
