const path = require('path');
const auth=require('../middleware/auth')
const express=require('express');

const multer=require('multer');
const adminController=require('../controllers/admin');
const router=express.Router();

module.exports=router;