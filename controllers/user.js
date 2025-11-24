const User = require('../models/user');
const Post=require('../models/post');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
exports.userSignup = async (req, res) => {
  try {
    const {name, email, password } = req.body;
console.log(name,email,password)
    // 1️⃣ Check for missing fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already has an account! Please login.' });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5️⃣ Send success response
    res.status(201).json({ message: 'Signup successful!' });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Internal server error',err });
  }
};

//userLogin
exports.userLogin=async(req,res)=>{
  try{
    
    const {email,password}=req.body;
    console.log(email)
  if(!email||!password)
  {
    return res.status(400).json({message:'All fields are required'});

  }
  const user=await User.findOne({where:{email}})
  if(!user)
  {
    return res.status(404).json({message:'Invalid cradentials'});
  }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 4️⃣ Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT, // replace with environment variable in production
      { expiresIn: '1h' } // token validity
    );

  res.status(200).json({message:'Login success',token});
  }
  catch(error)
  {
    console.log(error);
    res.status(500).json({message:'server error'})
  }
}
exports.getProfile=async(req,res)=>{
  try{
    const user=await User.findByPk(req.user.id,{
      attributes:['name','email', 'profileImage']
    });
    if(!user)
    {
      return res.status(404).json({message:'user not found'})
    }
    return res.status(200).json(user);
  }
  catch(err){
    console.log(err)
    res.status(500).json({ message: 'Server error' });
  }
}

exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;

        // Delete user expenses before deleting the user (if required)
        await Post.destroy({ where: { userId } });

        // Delete user record
        await User.destroy({ where: { id: userId } });

        res.status(200).json({ message: "Account deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting account", error: err });
    }
};
exports.editProfile=async(req,res)=>{
  try{
    const {name,email}=req.body;
    const userId=req.user.id;
    console.log(name,email,userId);
    const user=await User.findOne({where:{id:userId}})
    if(!user)
    {
      return res.status(404).json({message:'User not found'});
    }
   await user.update({name,email});
   
   return res.status(200).json({message:'edit-profile successfully'});
  }
  catch(err)
  {
    return res.status(500).json({message:'server error',err});
  }
}

// GET USER PROFILE FOR EDITING
exports.getEditProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      name: user.name,
      email: user.email,
      profileImage: user.profileImage || null
    });

  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};
exports.uploadImage=async(req,res)=>{
   try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
      
    }
    console.log('userid',userId,req.file.location)

    const imageUrl = req.file.location; // AWS file link
const user=await User.findOne({where: { id: userId } });
await user.update({ profileImage: imageUrl });
  
    return res.status(200).json({
      message: "Profile Image Updated",
      imageUrl
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
