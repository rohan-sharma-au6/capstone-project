const express = require("express");
const storyRoutes = require("../controllers/storiesControllers");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();


router.post("/story",authenticate,storyRoutes.addStory);
router.get("/allstories",authenticate,storyRoutes.allStories)
module.exports= router