const express = require('express');
const router = express.Router();
const {get_All_features, create_feature, delete_feature, updated_feature, get_single_feature, get_feature_by_Status} = require('../controllers/features');
const {sort_by_vote_High_To_Low, sort_by_vote_Low_To_High, sort_by_date_recent_To_previous, sort_by_date_previous_to_recent,sort_by_vote_high  } = require('../controllers/vote');


// All features API route handlers

router.get('/all', get_All_features);
router.get('/:featureId', get_single_feature)
router.post('/', create_feature);
router.patch('/:featureId', updated_feature);
router.delete('/:featureId', delete_feature)
router.get('/', get_feature_by_Status);

// vote sort
router.get('/vote/hightest', sort_by_vote_High_To_Low);
router.get('/vote/lowest', sort_by_vote_Low_To_High);
router.get('/vote/recent', sort_by_date_recent_To_previous);
router.get('/vote/older', sort_by_date_previous_to_recent);
router.get('/vote/hightest-comment',sort_by_vote_high);


module.exports = router;

