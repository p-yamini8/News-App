const express=require('express');
const userControllers=require('../controllers/user');
const auth=require('../middleware/auth');
const router=express.Router();
router.post('/signup',userControllers.userSignup);
router.post('/login',userControllers.userLogin);
router.get('/profile',auth.authenticate,userControllers.getProfile);
router.delete('/delete-account',auth.authenticate,userControllers.deleteAccount)
router.post('/edit-profile',auth.authenticate,userControllers.editProfile);
router.get('/edit-profile', auth.authenticate, userControllers.getEditProfile);
module.exports=router;