const path = require('path');

const express=require('express');
console.log('123')
const multer=require('multer');
const adminController=require('../controllers/admin');
const router=express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
router.post('/addPost', upload.single('image'), adminController.addPost);

module.exports=router;