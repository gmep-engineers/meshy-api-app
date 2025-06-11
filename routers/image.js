const express = require("express");
const imageApi = require("../api/image");
const router = express.Router();
const callPublicEndpoint = require("../lib/callPublicEndpoint");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

router.post("/", upload.array("image", 15), async function (req, res) {
  await callPublicEndpoint(req, res, imageApi, "post");
});

module.exports = router;
