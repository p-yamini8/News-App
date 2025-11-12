const Post = require("../models/post");
const User = require("../models/user");
const { Op } = require("sequelize");

exports.addPost = async (req, res) => {
  try {
    console.log("🟢 ADD POST CALLED");
    const { title, description, category } = req.body;
    const image = req.file;
  const userId = req.user?.id || req.body.userId || 1; // fallback to test user


    console.log("📦 Data received =>", { title, description, category, image: image?.filename, userId });

    if (!image || !title || !description || !category) {
      console.log("❌ Missing fields");
      return res.status(400).json({ message: "Enter all details" });
    }

    const imagePath = "/" + image.path.replace(/\\/g, "/");

    const newPost = await Post.create({
      image: imagePath,
      title,
      description,
      category,
      userId,
    });

    console.log("✅ SAVED POST:", newPost.dataValues);

    return res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    console.error("❌ ERROR in addPost:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { category } = req.query;
    console.log("🟢 FETCH POSTS REQUEST RECEIVED, category =", category);

    const whereClause = category
      ? { category: { [Op.like]: `%${category}%` } }
      : {};

    console.log("🔍 Sequelize whereClause:", whereClause);

    const posts = await Post.findAll({
      where: whereClause,
      include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }],
    });

    console.log(`📦 ${posts.length} posts found`);
    if (posts.length > 0) console.log(posts.map((p) => p.dataValues));

    return res.status(200).json(posts);
  } catch (err) {
    console.error("❌ ERROR in getPost:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
