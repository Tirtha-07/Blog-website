const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { verifyToken } = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

router.post('/post', verifyToken, uploadMiddleware.single('file'), postController.createPost);
router.put('/post', verifyToken, uploadMiddleware.single('file'), postController.updatePost);
router.get('/post', postController.getPosts);
router.get('/post/:id', postController.getPostById);

module.exports = router;
