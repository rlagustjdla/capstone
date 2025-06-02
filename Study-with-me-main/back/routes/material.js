const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

// 자료 업로드
router.post('/', materialController.uploadMaterial);

// 자료 삭제
router.delete('/:id', materialController.deleteMaterial);

module.exports = router;
