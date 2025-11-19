const Post = require("../models/post");
const User = require("../models/user");
const { Op } = require("sequelize");

exports.addPost = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!req.file || !title || !description || !category) {
      return res.status(400).json({ message: "Enter all details" });
    }
console.log("FILE =", req.file);

    const imageUrl = req.file.location;
    const userId = req.user?.id || req.body.userId || 1;

    const newPost = await Post.create({
      image: imageUrl,
      title,
      description,
      category,
      userId,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });

  } catch (err) {
    console.error("ERROR in addPost:", err);
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
exports.getMyPosts=async(req,res)=>{
  try{
    const userId=req.user.id
     const posts = await Post.findAll({
      where: { userId: userId },   // filter by user
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

 return res.status(200).json({posts});
  }
  catch(err)
  {
    console.log(err)
     return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
}
exports.editPost=async(req,res)=>{
  try{

const {postId}=req.params;
console.log('postId',postId);
const post=await Post.findOne({where:{id:postId, userId: req.user.id }});
if(!post)
{
  return res.status(404).json({message:'post not found'})
}
return res.status(200).json({message:'edit post success',post})
  }
  catch(err)
  {
    console.log(err);
    return res.status(500).json({message:'server error'});
  }
}
// PUT /post/update/:postId
exports.updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, description, category } = req.body;

    const post = await Post.findOne({
      where: { id: postId, userId: req.user.id }
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    let newImage = post.image;  // keep old image if not uploaded

    if (req.file) {
    newImage = req.file.location;  

    }

    await post.update({
      title,
      description,
      category,
      image: newImage
    });

    return res.status(200).json({
      message: "Post updated successfully",
      post
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.deletePost=async(req,res)=>{
  try{
const {postId}=req.params;
const post=await Post.findOne({where:{id:postId,userId:req.user.id}});
if(!post)
{
  return res.status(404).json({message:'Post not found'});

}
await post.destroy();
post.save();
return res.satus(200).json({message:'post deleted successfully'})
  }
  catch(err)
  {
    console.log(err);
    return res.status(500).json({message:'server error'})
  }
}