const express = require("express");
const router = express.Router();
const apicache = require("apicache");

const { searchRepo, getRepoDetails, test } = require("../controllers/index");

router.get("/", (req, res) => {
  res.send("Hello Worldddd");
});

router.get("/search", searchRepo);
router.get("/details", getRepoDetails);
router.get("/test", test);

module.exports = router;
