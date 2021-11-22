const express = require('express');
const router = express.Router();
const {get_all_features, create_feature} = '../controllers/features.js';

// All features API route handlers

router.get('/', get_all_features);
// router.get('/')
router.post('/', create_feature);
router.patch('/:featureId', );
router.delete('/:featureId', )

module.exports = router;