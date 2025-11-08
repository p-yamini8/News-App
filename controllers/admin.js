const Post = require('../models/post');

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

    const imagePath = image.path; // or image.filename

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
