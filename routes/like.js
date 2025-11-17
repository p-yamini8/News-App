const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {likes,unlikes, getLikes, addLikeDislike, getComments, addComment } = require('../controllers/like');
// router.post('/like', authMiddleware.authenticate,likePost);

router.get('/likes/:postId', authMiddleware.authenticate, getLikes);
router.post('/like', authMiddleware.authenticate, addLikeDislike);
router.get('/comments/:postId',  authMiddleware.authenticate, getComments);
router.post('/comment',  authMiddleware.authenticate, addComment);
router.get('/user-unlikes',authMiddleware.authenticate,unlikes);
router.get('/user-likes', authMiddleware.authenticate,likes);
module.exports = router;
