const express = require("express");
const followRoutes = require("../controllers/followControllers")
const router = express.Router();
const authenticate = require("../middlewares/authenticate")

router.put('/follow',authenticate,followRoutes.follow);
router.put('/unfollow',authenticate,followRoutes.unFollow)
router.get('/followingpost',authenticate,followRoutes.followingPost)
router.get('/followers/:id',followRoutes.followersDetails)
router.get('/followings/:id',followRoutes.followingDetails)

module.exports = router;