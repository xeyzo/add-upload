const express = require("express");
const router = express.Router();

const PostController = require("../controllers/PostController");

router.get("/", PostController.getPost);
router.post("/", PostController.savePost);
router.patch("/:id", PostController.updatePost);
router.get("/:id", PostController.getPostId);
router.delete("/:id", PostController.deletePost);

module.exports = router;
