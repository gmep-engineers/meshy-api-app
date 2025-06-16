const express = require("express");
const textApi = require("../api/text");
const router = express.Router();
const callPublicEndpoint = require("../lib/callPublicEndpoint");

router.post("/", async function (req, res) {
  await callPublicEndpoint(req, res, textApi, "post");
});

module.exports = router;
