const axios = require("axios");

const API_URL = process.env.API_URL || "https://api.github.com";

const test = async (req, res) => {
  res.json({
    test: true,
  });
};

const searchRepo = async (req, res) => {};

const getRepoDetails = async (req, res) => {};

module.exports = { searchRepo, getRepoDetails, test };
