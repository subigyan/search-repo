import React from "react";
import { GoRepo } from "react-icons/go";
import { AiFillStar, AiFillEye, AiOutlineFork } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Card = ({ repo }) => {
  const today = moment(new Date());
  const lastUpdated = moment(repo.updated_at).format("YYYY-MM-DD");
  const duration = moment.duration(today.diff(lastUpdated));
  const days = Math.floor(duration.asDays());
  const navigate = useNavigate();

  return (
    <div className="flex flex-col  border border-gray-300 shadow-md rounded-lg  lg:w-[1000px]  w-[80vw] min-h-20 px-4 py-2 text-gray-800">
      <div className="flex items-center justify-between w-full flex-wrap">
        <div className="flex flex-col">
          <div
            className="text-xl font-medium  h-fit flex items-center gap-2 hover:underline cursor-pointer"
            // onClick={() => {
            //   navigate({
            //     pathname: `/details?repo=${repo.name}&owner=${repo.owner.login}`,
            //   });
            // }}
          >
            <GoRepo className="text-lg" />
            <Link to={`/details?repo=${repo.name}&owner=${repo.owner.login}`}>
              <h1>{repo.name}</h1>
            </Link>
          </div>
          <div className="h-fit flex items-center gap-2">
            <div className="flex items-center  gap-1">
              <BiUserCircle className="" />
              <span>{repo.owner.login}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-1 items-center">
            <AiFillStar /> {repo.stargazers_count}
          </div>
          <div className="flex gap-1 items-center">
            <AiFillEye /> {repo.watchers_count}
          </div>
          <div className="flex gap-1 items-center">
            <AiOutlineFork /> {repo.forks_count}
          </div>
        </div>
      </div>
      <div className="mt-2 text-lg">
        <p className="text-sm font-medium line-clamp-3 text-gray-600">
          {repo.description}
        </p>
      </div>
      <p className="text-sm font-medium text-gray-500 text-right mt-2">
        Last Updated: {days > 0 ? `${days} Days Ago` : "Today"}
      </p>
    </div>
  );
};

export default Card;
