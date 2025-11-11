const path = require('path');
const auth=require('../middleware/auth')
const express=require('express');

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
router.post('/addPost',auth.authenticate, upload.single('image'), adminController.addPost);
router.get('/getPost',auth.authenticate,adminController.getPost);
module.exports=router;