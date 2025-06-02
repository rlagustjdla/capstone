const Material = require('../models/Material');
const path = require('path');

// 🔍 제목 검색
exports.searchMaterials = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) return res.status(400).json({ message: "검색어가 없습니다." });

    const regex = new RegExp(keyword, 'i');  // 대소문자 무시, 부분 매칭
    const results = await Material.find({ title: regex });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "검색 중 오류 발생", error });
  }
};

// 📁 파일 업로드
exports.uploadMaterial = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }

    const material = new Material({
      title: req.body.title,
      fileUrl: req.body.fileUrl,
      uploadedBy: req.session.user._id  // 세션에서 user id 사용
    });

    await material.save();
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 자료 삭제
exports.deleteMaterial = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }

    const material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ message: '자료를 찾을 수 없습니다.' });

    if (material.uploadedBy.toString() !== req.session.user._id.toString()) {
      return res.status(403).json({ message: '삭제 권한이 없습니다.' });
    }

    await material.deleteOne();
    res.json({ message: '자료 삭제 성공' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
