const express = require("express");
const router = express.Router();
const apicache = require("apicache");

const { searchRepo, getRepoDetails, test } = require("../controllers/index");

//initialize cache
const cache = apicache.middleware;

router.get("/", (req, res) => {
  res.send("Hello Worldddd");
});

router.get("/search", cache("5 minutes"), searchRepo);
router.get("/details", cache("5 minutes"), getRepoDetails);
router.get("/test", cache("5 minutes"), test);

module.exports = router;
