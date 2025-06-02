const Post = require('../models/Post');

// 게시글 등록
exports.createPost = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.session.user._id  // 작성자 ID 저장
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 게시글 삭제
exports.deletePost = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });

    if (post.author.toString() !== req.session.user._id.toString()) {
      return res.status(403).json({ message: '삭제 권한이 없습니다.' });
    }

    await post.deleteOne();
    res.json({ message: '게시글 삭제 성공' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
