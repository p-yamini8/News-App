const User = require('../models/user');
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
    res.status(500).json({ message: 'Internal server error' });
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