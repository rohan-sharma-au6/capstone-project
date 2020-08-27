const express = require("express");
const userPostRoutes = require("../controllers/userPostControllers")
const router = express.Router();
const authenticate = require("../middlewares/authenticate")

router.get("/user/:id", userPostRoutes.searchUserWithPost)
router.post("/saved/:id",authenticate,userPostRoutes.savePost)
router.post("/unsaved/:id",authenticate,userPostRoutes.unsavePost)
router.get("/rendersaved",authenticate,userPostRoutes.renderSaved)
router.post("/searchuser",userPostRoutes.searchUser)
module.exports = router;