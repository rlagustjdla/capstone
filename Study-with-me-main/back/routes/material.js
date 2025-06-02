const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

// 자료 업로드
router.post('/', materialController.uploadMaterial);

// 자료 삭제
router.delete('/:id', materialController.deleteMaterial);

// 🔍 자료 검색 (제목 기준)
router.get('/search', materialController.searchMaterials);

module.exports = router;
