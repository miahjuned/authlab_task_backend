const express = require('express');
const router = express.Router();
const {get_All_features, create_feature, delete_feature, updated_feature, get_single_feature, get_feature_by_Status} = require('../controllers/features');


// All features API route handlers

router.get('/all', get_All_features);
router.get('/:featureId', get_single_feature)
router.post('/', create_feature);
router.patch('/:featureId', updated_feature);
router.delete('/:featureId', delete_feature)
router.get('/', get_feature_by_Status);

module.exports = router;

