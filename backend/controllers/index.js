const axios = require("axios");

const API_URL = process.env.API_URL || "https://api.github.com";

const test = async (req, res) => {
  res.json({
    test: true,
  });
};

const searchRepo = async (req, res) => {
  try {
    const { name, sort, per_page, page } = req.query;
    const url = `${API_URL}/search/repositories?q=${name || undefined}&sort=${
      sort || undefined
    }&page=${page || undefined}&per_page=${per_page || undefined}`;
    console.log(url);
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getRepoDetails = async (req, res) => {
  try {
    const { owner, repo } = req.query;
    const repoURL = `${API_URL}/repos/${owner}/${repo}`;
    console.log(repoURL);
    let repoData = null;
    let ownerData = null;
    let content = null;
    const repoResponse = await axios.get(repoURL);
    repoData = repoResponse.data;
    if (repoData?.owner?.url) {
      const ownerInfoURL = `${repoData.owner.url}`;
      const ownerInfoResponse = await axios.get(ownerInfoURL);
      ownerData = ownerInfoResponse.data;
    }
    if (repoData?.contents_url) {
      const contentResponse = await axios.get(
        `${API_URL}/repos/${owner}/${repo}/contents`
      );
      content = contentResponse.data;
    }

    res.status(200).json({
      repoData,
      ownerData,
      content,
    });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = { searchRepo, getRepoDetails, test };
