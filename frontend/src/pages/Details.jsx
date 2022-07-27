import React, { useEffect, useState } from "react";
import { GoRepo } from "react-icons/go";
import { AiFillStar, AiFillEye, AiOutlineFork } from "react-icons/ai";
import Search from "../components/Search";
import ReactMarkdown from "react-markdown";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import NotFound from "../components/NotFound";

const Details = () => {
  const markdownn = `
  # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts
  `;

  const [markdown, setMarkdown] = useState();
  let [searchParams, setSearchParams] = useSearchParams();

  const repo = searchParams.get("repo");
  const owner = searchParams.get("owner");

  const [repoData, setRepoData] = useState({});
  const [userData, setUserData] = useState({});

  const [markdownURL, setMarkdownURL] = useState("");

  useEffect(() => {
    async function fetchRepo() {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}details`, {
        params: {
          owner: owner,
          repo: repo,
        },
      });
      console.log(res?.data);

      setRepoData(res?.data.repoData);
      setUserData(res?.data.ownerData);

      if (res?.data?.content) {
        res?.data?.content.forEach((element) => {
          if (element.name === "README.md") {
            setMarkdownURL(element.download_url);
          }
        });
      }
    }
    fetchRepo();
  }, []);

  async function getMarkdown() {
    const res = await axios.get(markdownURL);
    setMarkdown(res?.data);
  }
  if (markdownURL !== "") {
    getMarkdown();
  }

  console.log("url", markdownURL);
  const lastUpdated = moment(repoData?.updated_at).format("YYYY-MM-DD");

  if (!repoData || !userData) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col  rounded-lg sm:px-10 sm:py-8 text-gray-800 text-lg">
      <div className="flex items-center justify-between w-full flex-wrap ">
        <div className="flex flex-col text-lg">
          <div className="text-3xl font-medium  h-fit flex items-center gap-2 hover:underline">
            <GoRepo className="text-2xl" />
            <a href={repoData?.html_url || "#"}>{repoData?.name}</a>
          </div>
          <div className="h-fit flex items-center gap-2 hover:underline">
            <a href={repoData?.owner?.html_url || "#"}>
              Author: {userData?.name}
            </a>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex gap-4">
            <div className="flex gap-1 items-center">
              <AiFillStar /> {repoData?.stargazers_count}
            </div>
            <div className="flex gap-1 items-center">
              <AiFillEye /> {repoData?.watchers_count}
            </div>
            <div className="flex gap-1 items-center">
              <AiOutlineFork /> {repoData?.forks_count}
            </div>
          </div>
          <p className="text-base font-medium text-gray-500 text-right mt-2">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </div>
      <div className="mt-2 text-lg">
        <p>
          <span className="font-semibold">Default Branch:</span>{" "}
          {repoData?.default_branch}
        </p>
        <p>
          <span className="font-semibold">Open Issues Count:</span>{" "}
          {repoData?.open_issues}
        </p>

        <p className="font-semibold mt-2">Description:</p>
        <p className="text-base font-medium text-gray-600 ">
          {repoData?.description}
        </p>
      </div>
      <p className="font-semibold mt-2">README:</p>

      <div className="border px-4 py-2 bg-gray-200">
        <div className="prose font-roboto  ">
          <ReactMarkdown children={markdown} />
        </div>
      </div>
    </div>
  );
};

export default Details;
