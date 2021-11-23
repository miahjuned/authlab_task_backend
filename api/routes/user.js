const express = require('express');
const router = express.Router();

const { userRegister, userLogin, updated_user,  all_user, single_user, user_deleted } = require('../controllers/user');

// user create
router.post('/register-user', 
    async (req, res) => {
        await userRegister(req.body, 'user', res)
    }
);

// admin create
router.post('/register-admin', 
    async (req, res) => {
        await userRegister(req.body, 'admin', res)
    }
);

// login
router.post('/login', async (req, res) => {
    await userLogin(req.body,  res)
})


router.get('/all', all_user)
router.get('/:userId', single_user)
router.patch('/:userId', updated_user);
router.delete('/:userId', user_deleted);


module.exports = router;