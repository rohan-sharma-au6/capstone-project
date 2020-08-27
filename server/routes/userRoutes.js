const express = require("express");
const userRoutes = require("../controllers/userControllers")
const router = express.Router();
const authenticate = require("../middlewares/authenticate")

router.post("/register",userRoutes.register);
router.post("/login",userRoutes.login);
router.post("/logout",authenticate,userRoutes.logout);
router.get("/current",authenticate,userRoutes.getUser)
router.post("/update/:id",userRoutes.updateUser)
router.post("/reset",userRoutes.resetPassword)
router.post("/new",userRoutes.newPassword)
router.post("/change",userRoutes.changePassword)
module.exports = router;
