const express=require('express');
const userControllers=require('../controllers/user');
const auth=require('../middleware/auth');
const upload = require('../middleware/uploadtos3'); 
const router=express.Router();
router.post('/signup',userControllers.userSignup);
router.post('/login',userControllers.userLogin);
router.get('/profile',auth.authenticate,userControllers.getProfile);
router.delete('/delete-account',auth.authenticate,userControllers.deleteAccount)
router.post('/edit-profile',auth.authenticate,userControllers.editProfile);
router.get('/edit-profile', auth.authenticate, userControllers.getEditProfile);
router.put('/upload-profile',auth.authenticate,upload.single("image"),userControllers.uploadImage)
module.exports=router;