const express = require("express");
const postRoutes = require("../controllers/postControllers")
const router = express.Router();
const authenticate = require("../middlewares/authenticate")

router.post("/createpost",authenticate,postRoutes.cretePost);
router.get("/allpost",authenticate,postRoutes.allPost)
router.get("/mypost",authenticate,postRoutes.myPosts)
router.post("/like",authenticate,postRoutes.like);
router.post("/unlike",authenticate,postRoutes.unLike);
router.put("/addcomment",authenticate,postRoutes.comment)
router.get("/post/:id",authenticate,postRoutes.singlePost)
router.delete("/delete/:id",authenticate,postRoutes.deletePost)

module.exports = router