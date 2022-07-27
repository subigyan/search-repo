import React, { useEffect, useState } from "react";
import { FiGithub } from "react-icons/fi";
import Card from "../components/Card";
import Search from "../components/Search";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import NoResult from "../components/NoResult";

function Home() {
  const [search, setSearch] = useState("");
  const [repos, setRepos] = useState({});
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = React.useState("");
  const [perPage, setPerPage] = React.useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchRepo() {
      await fetchData();
    }
    fetchRepo();
  }, [sort, perPage, page]);

  async function fetchData() {
    if (search.trim() !== "") {
      setLoading(true);
      console.log("fetch, ", page);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/search`,
        {
          params: {
            name: search.trim(),
            sort: sort || undefined,
            per_page: perPage || undefined,
            page: page || undefined,
          },
        }
      );
      setRepos(response.data);
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetchData();
  };

  const handleChange = async (event) => {
    await setSort(event.target.value);
  };

  const handlePerPageChange = (event) => {
    setPerPage(event.target.value);
  };

  const handlePageChange = async (event, page) => {
    await setPage(page);
    console.log("page", page);
  };

  return (
    <div className="flex items-center justify-center max-w-screen min-h-[70vh] flex-col pt-8 py-4">
      <div className="flex items-center  mb-6  text-indigo-900">
        <FiGithub className="text-4xl  w-1/12 px-2 min-w-[50px] " />
        <h1 className="text-[40px] font-Bebas tracking-wider  underline">
          Search Repository
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <Search search={search} setSearch={setSearch} loading={loading} />
      </form>

      <div className="flex flex-col my-6 gap-4 justify-center items-center">
        {repos.items && repos.total_count > 0 ? (
          <>
            <div className="lg:w-[1000px]  w-[80vw] flex justify-between items-center px-1 flex-wrap ">
              <p className="text-sm text-gray-600 font-medium">
                <span className="font-bold text-base">{repos.total_count}</span>{" "}
                repositories
              </p>
              <div className=" flex sm:items-center gap-4 sm:w-auto w-full justify-end ">
                <FormControl variant="standard" className="w-14 ">
                  <InputLabel id="demo-simple-select-standard-label">
                    Per Page
                  </InputLabel>
                  <Select
                    value={perPage}
                    onChange={handlePerPageChange}
                    label="Per Page"
                    color="secondary"
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard" size="small" className="w-28">
                  <InputLabel id="demo-select-small">Sort</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={sort}
                    label="Sort"
                    onChange={handleChange}
                    color="secondary"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"stars"}>Stars</MenuItem>
                    <MenuItem value={"forks"}>Forks</MenuItem>
                    <MenuItem value={"help-wanted-issues"}>Issues</MenuItem>
                    {/* github api: https://api.github.com/search/repositories?q=freecodecamp&sort=updated didnt accourately respond with recently updated repo so updated option neglected  */}
                    {/* <MenuItem value={"updated"}>Recently Updated</MenuItem> */}
                  </Select>
                </FormControl>
              </div>
            </div>
            {repos.items.map((repo) => (
              <Card key={repo.id} repo={repo} />
            ))}
            <div className="flex justify-end">
              <Stack spacing={2} clas>
                <Pagination
                  variant="outlined"
                  color="secondary"
                  shape="rounded"
                  count={Math.ceil(repos.total_count / perPage) || 1}
                  page={page}
                  onChange={handlePageChange}
                />
              </Stack>
            </div>
          </>
        ) : (
          repos.total_count === 0 && <NoResult />
        )}
      </div>
    </div>
  );
}

export default Home;
