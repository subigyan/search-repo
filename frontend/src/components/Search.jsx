import React, { useState } from "react";
import { VscGithub } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

const Search = ({ search, setSearch, loading }) => {
  return (
    <div className="flex items-center shadow-lg shadow-indigo-200 border border-indigo-50 rounded-lg  lg:w-[800px]  w-[80vw] p-0  h-14 transition-all">
      <VscGithub className="text-4xl text-purple-900 w-1/12 px-2 min-w-[50px]" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-full px-2 text-xl  outline-none w-10/12 font-semibold text-gray-700"
      />
      <button className="h-full w-1/12 bg-indigo-900 m-0 flex justify-center items-center rounded-r-lg min-w-[50px] px-2">
        {loading ? (
          <CgSpinner className="md:text-3xl text-xl  text-white animate-spin" />
        ) : (
          <BsSearch className="md:text-3xl text-xl  text-white " />
        )}
        {/* <BsSearch className="md:text-3xl text-xl  text-white" /> */}
      </button>
    </div>
  );
};

export default Search;
