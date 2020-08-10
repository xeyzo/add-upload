const express = require("express");
const router = express.Router();

const UploadController = require("../controllers/UploadController");

router.post("/", UploadController.uploadImgCloud);

module.exports = router;