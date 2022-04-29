// require router
const router = require('express').Router();

const {
    getUsers,
    getUserById,
    newUser,
    editUser,
    delUser,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller')

// /api/users
router.route('/').get(getUsers).post(newUser);

// api/users/:userId
router.route('/:userId').get(getUserById).put(editUser).delete(delUser);

// api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;