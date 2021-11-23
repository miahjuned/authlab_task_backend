const express = require('express');
const router = express.Router();
const {create_vote ,get_All_vote, delete_vote, updated_vote, sort_by_vote_high } = require('../controllers/vote');


router.get('/', get_All_vote)
router.post('/', create_vote)
router.patch('/:voteId', updated_vote);
router.delete('/:voteId', delete_vote)
router.get('/vote', sort_by_vote_high);

module.exports = router