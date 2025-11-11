
const Post = require('../models/post');
const User=require('../models/user')
exports.addPost = async (req, res) => {
  try {
    
    const { description, category } = req.body;
    const image = req.file;

    console.log('🟢 Received data:', { description, category, file: image });

    // Validation
    if (!image || !description || !category) {
      console.log('❌ Missing fields:', { image, description, category });
      return res.status(400).json({ message: 'Enter all details' });
    }

const imagePath = '/' + image.path.replace(/\\/g, '/');
console.log("🟢 Received data:",imagePath);

    await Post.create({
      image: imagePath,
      description,
      category,
    });
    console.log('✅ Post created successfully');
    return res.status(201).json({ message: 'Post created successfully' });
  } catch (err) {
    console.error('❌ ERROR in addPost:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
exports.getPost = async (req, res) => {
  try {
    const { category } = req.query;

    const whereClause = category ? { category } : {};

    const posts = await Post.findAll({
      where: whereClause,
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error('❌ ERROR in getPost:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


