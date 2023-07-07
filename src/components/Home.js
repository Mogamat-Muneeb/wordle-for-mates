import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-between w-10/12 h-full max-w-md  mx-auto text-center pt-[20%]">
      <p className=" p-4 md:text-2xl text-[20px] font-bold text-center text-[#212529]">
        Get 6 chances to guess <br /> a 5-letter word.
      </p>
      <div className="flex flex-col w-full gap-4 md:flex-row">
        <Link
          to="/wordle-single"
          className="w-full p-4 text-lg font-bold text-center text-white rounded outline-none hover:bg-[#5ac85a] bg-[#212529] cursor-pointer"
        >
          Wordle
        </Link>
        <Link
          to="/with-a-friend"
          className="w-full p-4 text-lg font-bold text-center text-white rounded outline-none hover:bg-[#5ac85a] bg-[#212529] cursor-pointer"
        >
          Wordle with a friend
        </Link>
      </div>
    </div>
  );
};

export default Home;
