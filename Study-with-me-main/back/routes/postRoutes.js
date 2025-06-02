const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// 게시글 작성
router.post('/', postController.createPost);

// 게시글 삭제
router.delete('/:id', postController.deletePost);

module.exports = router;
