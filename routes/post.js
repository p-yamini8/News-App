const path = require('path');
const auth=require('../middleware/auth');
const express=require('express');

const multer=require('multer');
const adminController=require('../controllers/admin');
const router=express.Router();
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
const upload = require('../middleware/uploadtos3'); 
// const upload = multer({ storage: storage });
router.put('/update/:postId',auth.authenticate,adminController.updatePost)
router.post('/addPost',auth.authenticate, upload.single('image'), adminController.addPost);
router.get('/getPost',adminController.getPost);
router.get('/my-posts',auth.authenticate,adminController.getMyPosts);
router.get('/edit/:postId',auth.authenticate,adminController.editPost);

router.delete('/delete/:postId',auth.authenticate,adminController.deletePost);
router.post('/save/:postId', auth.authenticate, adminController.savePost);
router.get('/save/:postId', auth.authenticate, adminController.getSaveStatus);
router.get('/saved', auth.authenticate, adminController.getSavedPosts);
module.exports=router;